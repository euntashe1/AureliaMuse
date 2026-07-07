(function () {
  const productSelect = document.getElementById("bulk-product");
  const quantityRange = document.getElementById("bulk-quantity");
  const quantityNumber = document.getElementById("bulk-quantity-number");
  const quantityDisplay = document.getElementById("bulk-quantity-display");
  const logoCheckbox = document.getElementById("bulk-logo");
  const packageSelect = document.getElementById("bulk-package");
  const consultForm = document.getElementById("bulk-consult-form");
  const productImage = document.getElementById("bulk-product-image");
  const productType = document.getElementById("bulk-product-type");
  const productName = document.getElementById("bulk-product-name");
  const productDesc = document.getElementById("bulk-product-desc");
  const productPrice = document.getElementById("bulk-product-price");

  if (!productSelect || !quantityRange || !quantityNumber || !quantityDisplay || !logoCheckbox || !packageSelect) return;

  const formatWon = (value) => `${Math.round(value).toLocaleString("ko-KR")}원`;

  const getDiscountRate = (quantity) => {
    if (quantity >= 300) return 15;
    if (quantity >= 150) return 10;
    if (quantity >= 50) return 7;
    return 5;
  };

  const normalizeQuantity = (value) => {
    const number = Number(value) || 10;
    const stepped = Math.round(number / 10) * 10;
    return Math.min(500, Math.max(10, stepped));
  };

  const updateEstimate = () => {
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const unitPrice = Number(productSelect.value) || 0;
    const quantity = normalizeQuantity(quantityRange.value);
    const logoPrice = logoCheckbox.checked ? 1500 : 0;
    const packagePrice = Number(packageSelect.value) || 0;
    const optionUnitPrice = logoPrice + packagePrice;
    const normalTotal = (unitPrice + optionUnitPrice) * quantity;
    const discountRate = getDiscountRate(quantity);
    const discountAmount = Math.floor(normalTotal * (discountRate / 100));
    const finalTotal = normalTotal - discountAmount;

    quantityRange.value = String(quantity);
    quantityNumber.value = String(quantity);
    quantityDisplay.textContent = `${quantity}개`;

    if (productImage && selectedOption?.dataset.image) {
      productImage.src = selectedOption.dataset.image;
      productImage.alt = `${selectedOption.dataset.name || selectedOption.textContent.split(" /")[0]} 이미지`;
    }
    if (productType && selectedOption?.dataset.type) productType.textContent = selectedOption.dataset.type;
    if (productName && selectedOption?.dataset.name) productName.textContent = selectedOption.dataset.name;
    if (productDesc && selectedOption?.dataset.desc) productDesc.textContent = selectedOption.dataset.desc;
    if (productPrice) productPrice.textContent = formatWon(unitPrice);

    document.getElementById("result-unit-price").textContent = formatWon(unitPrice);
    document.getElementById("result-quantity").textContent = `${quantity}개`;
    document.getElementById("result-option-price").textContent = formatWon(optionUnitPrice * quantity);
    document.getElementById("result-normal-total").textContent = formatWon(normalTotal);
    document.getElementById("result-discount-rate").textContent = `${discountRate}%`;
    document.getElementById("result-discount-amount").textContent = `-${formatWon(discountAmount)}`;
    document.getElementById("result-final-total").textContent = formatWon(finalTotal);
  };

  productSelect.addEventListener("change", updateEstimate);
  quantityRange.addEventListener("input", () => {
    quantityNumber.value = quantityRange.value;
    updateEstimate();
  });
  quantityNumber.addEventListener("change", () => {
    quantityRange.value = String(normalizeQuantity(quantityNumber.value));
    updateEstimate();
  });
  logoCheckbox.addEventListener("change", updateEstimate);
  packageSelect.addEventListener("change", updateEstimate);

  const dateButton = document.getElementById("consult-date-display");
  const dateInput = document.getElementById("consult-date");
  const calendar = document.getElementById("bulk-calendar");
  const calendarTitle = document.getElementById("calendar-title");
  const calendarGrid = document.getElementById("calendar-grid");
  const calendarPrev = document.getElementById("calendar-prev");
  const calendarNext = document.getElementById("calendar-next");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selectedDate = null;

  const toDateValue = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderCalendar = () => {
    if (!calendarGrid || !calendarTitle) return;
    calendarGrid.innerHTML = "";
    calendarTitle.textContent = `${viewYear}. ${String(viewMonth + 1).padStart(2, "0")}`;

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i += 1) {
      const blank = document.createElement("span");
      blank.className = "bulk-calendar-blank";
      calendarGrid.appendChild(blank);
    }

    for (let day = 1; day <= lastDate; day += 1) {
      const date = new Date(viewYear, viewMonth, day);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "bulk-calendar-day";
      button.textContent = String(day);

      if (date.getTime() === today.getTime()) button.classList.add("today");
      if (selectedDate && date.getTime() === selectedDate.getTime()) button.classList.add("selected");

      button.addEventListener("click", () => {
        selectedDate = date;
        const value = toDateValue(date);
        dateInput.value = value;
        dateButton.textContent = value;
        calendar.hidden = true;
        dateButton.classList.remove("is-open");
        dateButton.setAttribute("aria-expanded", "false");
        renderCalendar();
      });

      calendarGrid.appendChild(button);
    }
  };

  if (dateButton && calendar && calendarGrid) {
    dateButton.addEventListener("click", () => {
      const willOpen = calendar.hidden;
      calendar.hidden = !willOpen;
      dateButton.classList.toggle("is-open", willOpen);
      dateButton.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) renderCalendar();
    });

    calendarPrev?.addEventListener("click", () => {
      viewMonth -= 1;
      if (viewMonth < 0) {
        viewMonth = 11;
        viewYear -= 1;
      }
      renderCalendar();
    });

    calendarNext?.addEventListener("click", () => {
      viewMonth += 1;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear += 1;
      }
      renderCalendar();
    });

    document.addEventListener("click", (event) => {
      if (calendar.hidden) return;
      if (calendar.contains(event.target) || dateButton.contains(event.target)) return;
      calendar.hidden = true;
      dateButton.classList.remove("is-open");
      dateButton.setAttribute("aria-expanded", "false");
    });

    renderCalendar();
  }

  consultForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = consultForm.querySelectorAll("input[required], textarea[required]");
    const hasEmpty = Array.from(requiredFields).some((field) => !field.value.trim());
    if (hasEmpty || !dateInput?.value) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }
    alert("대량 주문 상담이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.");
    consultForm.reset();
    if (dateButton) dateButton.textContent = "희망 납기일 선택";
    if (dateInput) dateInput.value = "";
    selectedDate = null;
    updateEstimate();
    renderCalendar();
  });

  updateEstimate();
})();
