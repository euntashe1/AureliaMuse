(function () {
  const CART_KEY = "aureliaCart";
  const WISH_KEY = "aureliaWish";
  const WISH_COMPAT_KEY = "aureliaWishlist";
  const ORDER_KEY = "aureliaOrder";
  const STALE_COUNT_KEYS = ["aureliaCartCount", "cartCount", "cart_count"];
  const STALE_WISH_COUNT_KEYS = ["aureliaWishCount", "wishCount", "wishlistCount", "aureliaWishlistCount"];
  const FREE_LIMIT = 70000;
  const DELIVERY_FEE = 3000;

  const formatWon = (value) => `${Number(value || 0).toLocaleString("ko-KR")}원`;
  const read = (key) => {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  function clearStaleCartCountKeys() {
    STALE_COUNT_KEYS.forEach((key) => localStorage.removeItem(key));
    STALE_WISH_COUNT_KEYS.forEach((key) => localStorage.removeItem(key));
  }

  function cleanCart(cart) {
    return (Array.isArray(cart) ? cart : [])
      .map(normalizeCartItem)
      .filter((item) => item.id && item.name && item.qty > 0);
  }

  function getCart() {
    const rawCart = read(CART_KEY);
    const cart = cleanCart(rawCart);
    if (JSON.stringify(rawCart) !== JSON.stringify(cart)) write(CART_KEY, cart);
    return cart;
  }

  function getWishlist() {
    const merged = [...read(WISH_KEY), ...read(WISH_COMPAT_KEY)];
    const unique = [];
    const seen = new Set();

    merged.forEach((item) => {
      if (!item || !item.id || seen.has(item.id)) return;
      seen.add(item.id);
      unique.push(item);
    });

    if (JSON.stringify(read(WISH_KEY)) !== JSON.stringify(unique)) write(WISH_KEY, unique);
    if (localStorage.getItem(WISH_COMPAT_KEY)) localStorage.removeItem(WISH_COMPAT_KEY);
    return unique;
  }

  function normalizeCartItem(item = {}) {
    const qty = Number(item.qty || item.quantity);
    return {
      id: item.id,
      name: item.name,
      option: item.option || "",
      optionId: item.optionId || "",
      price: Number(item.price || 0),
      salePrice: Number(item.salePrice || item.price || 0),
      originalPrice: Number(item.originalPrice || item.price || 0),
      category: item.category || "",
      qty: Number.isFinite(qty) && qty > 0 ? qty : 0,
      image: item.image || "./img/favicon.png"
    };
  }

  function setCart(cart) {
    write(CART_KEY, cleanCart(cart));
    renderCartDrawer();
    renderCartPage();
    updateCounts();
  }

  function addItem(item) {
    const nextItem = normalizeCartItem(item);
    if (!nextItem.id || !nextItem.name || nextItem.qty <= 0) return;
    const cart = getCart();
    const same = cart.find((cartItem) => (
      cartItem.id === nextItem.id
      && (cartItem.optionId || "") === (nextItem.optionId || "")
      && (cartItem.option || "") === nextItem.option
    ));

    if (same) {
      same.qty = Number(same.qty || 1) + nextItem.qty;
    } else {
      cart.push(nextItem);
    }

    setCart(cart);
    showToast("장바구니에 담았습니다.");
  }

  function getTotals(cart = getCart()) {
    const productTotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
    const delivery = productTotal === 0 || productTotal >= FREE_LIMIT ? 0 : DELIVERY_FEE;
    return { productTotal, delivery, finalTotal: productTotal + delivery };
  }

  function updateCounts() {
    clearStaleCartCountKeys();
    const cartCount = getCart().reduce((sum, item) => sum + Number(item.qty || 0), 0);
    const wishCount = getWishlist().length;

    document.querySelectorAll(".cart-count, [data-cart-count]").forEach((badge) => {
      const hasItems = cartCount > 0;
      badge.textContent = hasItems ? String(cartCount) : "";
      badge.hidden = !hasItems;
      badge.setAttribute("aria-hidden", String(!hasItems));
      badge.setAttribute("data-count-ready", "");
    });

    document.querySelectorAll(".wishlist-count, .wish-count, [data-wish-count]").forEach((badge) => {
      const hasItems = wishCount > 0;
      badge.textContent = hasItems ? String(wishCount) : "";
      badge.hidden = !hasItems;
      badge.setAttribute("aria-hidden", String(!hasItems));
      badge.setAttribute("data-count-ready", "");
    });
  }

  function showToast(message) {
    const toast = document.querySelector(".cart-toast");
    if (!toast) {
      window.setTimeout(() => {}, 0);
      return;
    }

    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  function ensureDrawer() {
    if (document.querySelector("#cartDrawer")) return;

    document.body.insertAdjacentHTML("beforeend", `
      <div class="cart-overlay" id="cartOverlay" hidden></div>
      <aside class="cart-drawer" id="cartDrawer" aria-hidden="true">
        <div class="cart-drawer-head">
          <h2>CART</h2>
          <button type="button" class="cart-close" aria-label="장바구니 닫기">×</button>
        </div>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-summary">
          <p><span>총 상품금액</span><strong id="cartProductTotal">0원</strong></p>
          <p><span>총 배송비</span><strong id="cartDelivery">0원</strong></p>
          <p class="cart-final"><span>결제예정금액</span><strong id="cartFinalTotal">0원</strong></p>
        </div>
        <div class="cart-actions">
          <button type="button" class="cart-order-btn">주문하기</button>
          <button type="button" class="cart-view-btn">장바구니 보기</button>
          <button type="button" class="cart-naver-pay">N Pay 간편구매</button>
        </div>
      </aside>
    `);

    document.querySelector("#cartOverlay").addEventListener("click", closeDrawer);
    document.querySelector(".cart-close").addEventListener("click", closeDrawer);
    document.querySelector(".cart-order-btn").addEventListener("click", goOrderFromCart);
    document.querySelector(".cart-view-btn").addEventListener("click", () => {
      window.location.href = "./cart.html";
    });
    document.querySelector(".cart-naver-pay").addEventListener("click", () => {
      const cart = getCart();
      if (!cart.length) {
        alert("장바구니에 담긴 상품이 없습니다.");
        return;
      }

      localStorage.setItem(ORDER_KEY, JSON.stringify({ items: cart, source: "naverpay-cart" }));
      window.location.href = "./order.html?pay=naver";
    });
  }

  function openDrawer() {
    ensureDrawer();
    renderCartDrawer();
    const overlay = document.querySelector("#cartOverlay");
    const drawer = document.querySelector("#cartDrawer");
    overlay.hidden = false;
    overlay.classList.add("is-open", "is-active");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-cart-open", "drawer-open", "cart-open");
  }

  function closeDrawer() {
    const overlay = document.querySelector("#cartOverlay");
    const drawer = document.querySelector("#cartDrawer");
    if (!overlay || !drawer) return;

    overlay.classList.remove("is-open", "is-active");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-cart-open", "drawer-open", "cart-open");
    overlay.hidden = true;
  }

  function cartItemMarkup(item, index, mode = "drawer") {
    const total = Number(item.price || 0) * Number(item.qty || 1);
    const className = mode === "page" ? "cart-page-item" : "cart-item";
    const imageClass = mode === "page" ? "cart-page-item__image" : "cart-item-img";
    const infoClass = mode === "page" ? "cart-page-item__info" : "cart-item-info";
    const controlClass = mode === "page" ? "cart-page-item__control" : "cart-item-control";

    return `
      <article class="${className}" data-index="${index}">
        <div class="${imageClass}"><img src="${item.image}" alt="${item.name}"></div>
        <div class="${infoClass}">
          <h3>${item.name}</h3>
          ${item.option ? `<p>${item.option}</p>` : ""}
          <strong>${formatWon(mode === "page" ? total : item.price)}</strong>
          <div class="${controlClass}">
            <button type="button" data-cart-action="minus" aria-label="수량 줄이기">−</button>
            <span>${item.qty}</span>
            <button type="button" data-cart-action="plus" aria-label="수량 늘리기">+</button>
            <button type="button" data-cart-action="remove" class="cart-remove">삭제</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderCartDrawer() {
    if (!document.querySelector("#cartDrawer")) return;
    const cart = getCart();
    const items = document.querySelector("#cartItems");
    const totals = getTotals(cart);

    items.innerHTML = cart.length
      ? cart.map((item, index) => cartItemMarkup(item, index, "drawer")).join("")
      : `<div class="cart-empty">장바구니가 비어 있습니다.</div>`;

    document.querySelector("#cartProductTotal").textContent = formatWon(totals.productTotal);
    document.querySelector("#cartDelivery").textContent = totals.delivery === 0 ? "무료" : formatWon(totals.delivery);
    document.querySelector("#cartFinalTotal").textContent = formatWon(totals.finalTotal);
  }

  function renderCartPage() {
    const list = document.querySelector("#cartPageItems");
    if (!list) return;

    const cart = getCart();
    const totals = getTotals(cart);
    const empty = document.querySelector("#cartPageEmpty");
    const summary = document.querySelector("#cartPageSummary");

    list.innerHTML = cart.length
      ? cart.map((item, index) => cartItemMarkup(item, index, "page")).join("")
      : "";

    updateCartPageState(cart);

    document.querySelector("#cartPageProductTotal").textContent = formatWon(totals.productTotal);
    document.querySelector("#cartPageDelivery").textContent = totals.delivery === 0 ? "무료" : formatWon(totals.delivery);
    document.querySelector("#cartPageFinalTotal").textContent = formatWon(totals.finalTotal);
  }

  function updateCartPageState(cart = getCart()) {
    const hasItems = Array.isArray(cart) && cart.length > 0;
    const empty = document.querySelector("#cartPageEmpty");
    const list = document.querySelector("#cartPageItems");
    const summary = document.querySelector("#cartPageSummary");

    if (empty) empty.hidden = hasItems;
    if (list) list.hidden = !hasItems;
    if (summary) summary.hidden = !hasItems;
  }

  function changeCartItem(index, action) {
    const cart = getCart();
    if (!cart[index]) return;

    if (action === "plus") cart[index].qty = Number(cart[index].qty || 1) + 1;
    if (action === "minus") cart[index].qty = Math.max(1, Number(cart[index].qty || 1) - 1);
    if (action === "remove") cart.splice(index, 1);

    setCart(cart);
  }

  function goOrderFromCart() {
    const cart = getCart();
    if (!cart.length) {
      alert("장바구니에 담긴 상품이 없습니다.");
      return;
    }

    localStorage.setItem(ORDER_KEY, JSON.stringify({ items: cart, source: "cart" }));
    window.location.href = "./order.html";
  }

  function addNewSectionItem(button) {
    const card = button.closest(".product-item, .new-product-card");
    if (!card) return;

    addItem({
      id: button.dataset.id || card.dataset.id,
      name: button.dataset.name || card.dataset.name || card.querySelector("h3")?.textContent?.trim(),
      price: button.dataset.price || card.dataset.price,
      image: button.dataset.image || card.dataset.image || card.querySelector("img")?.getAttribute("src"),
      option: button.dataset.option || "기본",
      qty: 1
    });
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".cart-close, .cart-drawer-close")) {
      event.preventDefault();
      closeDrawer();
      return;
    }

    const newCartButton = event.target.closest(".new-cart-btn, .new-product-card .cart-button");
    if (newCartButton) {
      event.preventDefault();
      event.stopPropagation();
      addNewSectionItem(newCartButton);
      return;
    }

    const cartLink = event.target.closest(".header-cart-link, a[href$='cart.html'], [aria-label*='장바구니']");
    if (cartLink) {
      event.preventDefault();
      openDrawer();
      return;
    }

    const control = event.target.closest("[data-cart-action]");
    if (!control) return;

    const itemEl = control.closest(".cart-item, .cart-page-item");
    const index = Number(itemEl?.dataset.index);
    changeCartItem(index, control.dataset.cartAction);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });

  document.addEventListener("DOMContentLoaded", () => {
    ensureDrawer();
    clearStaleCartCountKeys();
    setCart(getCart());

    document.querySelector("#cartPageOrderBtn")?.addEventListener("click", goOrderFromCart);
  });

  window.addEventListener("storage", (event) => {
    if ([CART_KEY, WISH_KEY, WISH_COMPAT_KEY].includes(event.key)) updateCounts();
  });

  window.AureliaCart = {
    addItem,
    open: openDrawer,
    close: closeDrawer,
    getCart,
    getWishlist,
    setCart,
    getTotals,
    updateCounts,
    renderCartPage,
    updateCartPageState
  };
})();
