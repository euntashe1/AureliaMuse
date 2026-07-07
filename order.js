document.addEventListener("DOMContentLoaded", () => {
  const ORDER_KEY = "aureliaOrder";
  const CART_KEY = "aureliaCart";
  const FREE_LIMIT = 70000;
  const DELIVERY_FEE = 3000;

  const formatWon = (value) => `${Number(value || 0).toLocaleString("ko-KR")}원`;
  const orderData = JSON.parse(localStorage.getItem(ORDER_KEY) || '{"items":[]}');
  const items = Array.isArray(orderData) ? orderData : (orderData.items || []);

  const orderItems = document.querySelector("#orderItems");
  const productTotalEl = document.querySelector("#orderProductTotal");
  const deliveryEl = document.querySelector("#orderDelivery");
  const discountEl = document.querySelector("#orderDiscount");
  const finalTotalEl = document.querySelector("#orderFinalTotal");
  const modal = document.querySelector("#orderModal");
  const modalMessage = document.querySelector("#orderModalMessage");
  const orderComplete = document.querySelector("#orderComplete");
  const paymentMethods = document.querySelectorAll(".payment-method");
  const paymentDetailBox = document.querySelector("#paymentDetailBox");

  const paymentMessages = {
    naverpay: "네이버페이로 빠르고 안전하게 결제할 수 있습니다.",
    card: "카드사를 선택한 뒤 결제를 진행합니다.",
    transfer: "은행 계좌를 통해 실시간 이체로 결제합니다.",
    bank: "입금자명과 입금 은행을 확인한 뒤 주문이 접수됩니다.",
    mobile: "휴대폰 번호 인증 후 결제가 진행됩니다.",
    easy: "등록된 간편결제 수단으로 빠르게 결제합니다."
  };

  function getTotals() {
    const productTotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
    const delivery = productTotal === 0 || productTotal >= FREE_LIMIT ? 0 : DELIVERY_FEE;
    const discount = 0;
    return { productTotal, delivery, discount, finalTotal: productTotal + delivery - discount };
  }

  function renderItems() {
    if (!items.length) {
      orderItems.innerHTML = `<div class="order-empty">주문할 상품이 없습니다. 상품을 먼저 선택해 주세요.</div>`;
    } else {
      orderItems.innerHTML = items.map((item) => `
        <article class="order-item">
          <div class="order-item-img"><img src="${item.image}" alt="${item.name}"></div>
          <div>
            <h3>${item.name}</h3>
            <p>${item.option ? `옵션: ${item.option} · ` : ""}수량 ${item.qty || 1}개</p>
          </div>
          <strong>${formatWon(Number(item.price || 0) * Number(item.qty || 1))}</strong>
        </article>
      `).join("");
    }

    const totals = getTotals();
    productTotalEl.textContent = formatWon(totals.productTotal);
    deliveryEl.textContent = totals.delivery === 0 ? "무료" : formatWon(totals.delivery);
    discountEl.textContent = formatWon(totals.discount);
    finalTotalEl.textContent = formatWon(totals.finalTotal);
  }

  function openModal(message) {
    modalMessage.innerHTML = message;
    modal.hidden = false;
    document.body.classList.add("is-modal-open");
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("is-modal-open");
  }

  function validateRequired() {
    if (!items.length) {
      openModal("주문할 상품이 없습니다.");
      return false;
    }

    const requiredFields = [
      ["#orderName", "주문자 이름을 입력해 주세요."],
      ["#orderPhone", "주문자 휴대폰 번호를 입력해 주세요."],
      ["#orderEmail", "이메일을 입력해 주세요."],
      ["#receiverName", "받는 사람 이름을 입력해 주세요."],
      ["#receiverPhone", "받는 사람 연락처를 입력해 주세요."],
      ["#postcode", "우편번호를 입력해 주세요."],
      ["#address", "주소를 입력해 주세요."],
      ["#addressDetail", "상세 주소를 입력해 주세요."]
    ];

    for (const [selector, message] of requiredFields) {
      const field = document.querySelector(selector);
      if (!field.value.trim()) {
        field.focus();
        openModal(message);
        return false;
      }
    }

    if (!document.querySelector("input[name='payment']:checked")) {
      openModal("결제수단을 선택해 주세요.");
      return false;
    }

    return true;
  }

  paymentMethods.forEach((method) => {
    method.addEventListener("click", () => {
      paymentMethods.forEach((item) => item.classList.remove("active"));
      method.classList.add("active");
      method.querySelector("input").checked = true;

      const value = method.querySelector("input").value;
      paymentDetailBox.innerHTML = `<p>${paymentMessages[value]}</p>`;
    });
  });

  const requestedPay = new URLSearchParams(window.location.search).get("pay");
  if (requestedPay === "naver") {
    document.querySelector(".payment-method input[value='naverpay']")?.closest(".payment-method")?.click();
  }

  document.querySelector("#orderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateRequired()) return;

    openModal("포트폴리오용 주문/결제 UI입니다.<br>실제 결제는 진행되지 않습니다.");
  });

  document.querySelector("#showOrderComplete").addEventListener("click", () => {
    closeModal();
    localStorage.removeItem(CART_KEY);
    window.AureliaCart?.updateCounts();
    if (orderComplete) {
      orderComplete.hidden = false;
      orderComplete.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  document.querySelectorAll("[data-order-close]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  renderItems();
});
