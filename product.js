/* Aurelia Muse 상품 페이지 공통 필터 및 정렬 */
document.querySelectorAll(".product-sub").forEach((page) => {
  const grid = page.querySelector(".product-grid");
  if (!grid) return;

  function removeProductDetailLinks() {
    grid.querySelectorAll('a[href*="product.html"]').forEach((link) => {
      const fragment = document.createDocumentFragment();
      while (link.firstChild) fragment.appendChild(link.firstChild);
      link.replaceWith(fragment);
    });
  }

  const pageTitle = page.querySelector(".product-sub-title")?.textContent.trim();

  const cards = Array.from(grid.querySelectorAll(".product-card"));
  let emptyMessage = page.querySelector(".product-empty-message");
  if (!emptyMessage) {
    emptyMessage = document.createElement("p");
    emptyMessage.className = "product-empty-message";
    emptyMessage.hidden = true;
    emptyMessage.textContent = "조건에 맞는 상품이 없습니다.";
    grid.insertAdjacentElement("afterend", emptyMessage);
  }
  const legacyColorFilter = page.querySelector('[data-filter="color"]');
  if (legacyColorFilter) {
    legacyColorFilter.dataset.filter = "priceRange";
    legacyColorFilter.querySelector(".product-filter__toggle span").textContent = "금액별";
    legacyColorFilter.querySelector(".product-filter__menu").innerHTML = `
      <button class="product-filter__option is-selected" type="button" data-value="all">전체</button>
      <button class="product-filter__option" type="button" data-value="under30000">3만원 이하</button>
      <button class="product-filter__option" type="button" data-value="30000-50000">3만원 ~ 5만원</button>
      <button class="product-filter__option" type="button" data-value="50000-100000">5만원 ~ 10만원</button>
      <button class="product-filter__option" type="button" data-value="over100000">10만원 이상</button>
    `;
  }

  const filters = page.querySelector(".product-sub-filters");
  const typeFilter = page.querySelector('[data-filter="type"]');
  const priceFilter = page.querySelector('[data-filter="priceRange"]');
  const collectionFilter = page.querySelector('[data-filter="collection"]');
  if (filters && typeFilter && priceFilter) {
    if (collectionFilter) {
      filters.append(typeFilter, priceFilter, collectionFilter);
    } else {
      filters.append(typeFilter, priceFilter);
    }
  }

  const dropdowns = Array.from(page.querySelectorAll(".product-filter, .sort-dropdown"));
  const initialSort = pageTitle === "All Collection" ? "newest" : "recommend";
  const initialType = typeFilter?.querySelector(".product-filter__option.is-selected")?.dataset.value || "all";
  const state = { priceRange: "all", type: initialType, collection: "all", sort: initialSort };
  const paginationEnabled = ["All Collection", "DAILY CERAMIC", "ARTISAN EDITION", "COLLECTION", "GIFT SET"].includes(pageTitle);
  const itemsPerPage = 12;
  let currentPage = 1;
  let pagination = page.querySelector(".product-pagination");
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.className = "product-pagination";
    pagination.hidden = true;
    emptyMessage.insertAdjacentElement("afterend", pagination);
  }

  function getProductStorage(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function setProductStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function showProductToast(message) {
    if (typeof showToast === "function") {
      showToast(message);
      return;
    }
    const toast = document.querySelector(".cart-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showProductToast.timer);
    showProductToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  function getProductPayload(card) {
    const image = card.dataset.image || card.querySelector("img")?.getAttribute("src") || "";
    return {
      id: card.dataset.id,
      name: card.dataset.name || card.querySelector(".product-card__name")?.textContent.trim() || "",
      price: Number(card.dataset.price || 0),
      salePrice: Number(card.dataset.salePrice || card.dataset.price || 0),
      originalPrice: Number(card.dataset.originalPrice || card.dataset.price || 0),
      image,
      category: card.dataset.category || "",
      description: card.dataset.description || ""
    };
  }

  function updateInlineWishButtons(id, active) {
    page.querySelectorAll(`.product-card[data-id="${id}"] .product-inline-wish-btn`).forEach((button) => {
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", active ? "찜하기 취소" : "찜하기");
    });
  }

  function updateProductHeaderCounts() {
    const cartCount = getProductStorage("aureliaCart").reduce((sum, item) => sum + Number(item.quantity || item.qty || 0), 0);
    document.querySelectorAll(".cart-count").forEach((badge) => {
      const hasItems = cartCount > 0;
      badge.textContent = hasItems ? String(cartCount) : "";
      badge.hidden = !hasItems;
      badge.setAttribute("aria-hidden", String(!hasItems));
      badge.setAttribute("data-count-ready", "");
    });

    const wishCount = getProductStorage("aureliaWish").length;
    document.querySelectorAll(".wishlist-count").forEach((badge) => {
      const hasItems = wishCount > 0;
      badge.textContent = hasItems ? String(wishCount) : "";
      badge.hidden = !hasItems;
      badge.setAttribute("aria-hidden", String(!hasItems));
      badge.setAttribute("data-count-ready", "");
    });
    const headerWish = document.querySelector(".header-wishlist-link");
    const headerWishIcon = document.querySelector(".header-wishlist-icon");
    headerWish?.classList.toggle("is-active", wishCount > 0);
    if (headerWishIcon) headerWishIcon.textContent = wishCount > 0 ? "♥" : "♡";
  }

  function syncInlineWishState(card) {
    const id = card.dataset.id;
    if (!id) return;
    const active = getProductStorage("aureliaWish").some((item) => item?.id === id);
    updateInlineWishButtons(id, active);
  }

  function addInlineActions(card) {
    if (card.dataset.available === "false" || card.querySelector(".product-inline-actions")) return;
    const target = card.querySelector(".product-price") || card.querySelector(".product-card__price");
    if (!target) return;
    const actions = document.createElement("span");
    actions.className = "product-inline-actions";
    actions.innerHTML = `
      <button type="button" class="product-inline-wish-btn favorite-button" aria-label="찜하기" aria-pressed="false"><img src="img/aurelia-save-heart.svg" alt="" aria-hidden="true"></button>
      <button type="button" class="product-inline-cart-btn cart-button" aria-label="장바구니 담기"><img src="img/aurelia-shopping-bag.svg" alt="" aria-hidden="true"></button>
    `;
    target.appendChild(actions);
    syncInlineWishState(card);
  }
  const productData = {
    "All Collection": [
      ["pink", "set", 89000, 96, "2026-06-18"], ["pink", "plate", 32300, 84, "2026-06-10"],
      ["white", "object", 28800, 76, "2026-06-08"], ["pink", "object", 57800, 91, "2026-06-15"],
      ["cream", "cup", 33150, 72, "2026-05-29"], ["pink", "cup", 37800, 88, "2026-06-02"],
      ["pink", "object", 61200, 68, "2026-05-24"], ["pink", "set", 98000, 61, "2026-06-20"],
      ["white", "cup", 39000, 94, "2026-05-18"], ["cream", "plate", 29000, 82, "2026-05-12"],
      ["gray", "bowl", 89000, 57, "2026-04-28"], ["brown", "set", 999999999, 0, "2026-06-22"]
    ],
    "DAILY CERAMIC": [
      ["pink", "plate", 32300, 84, "2026-06-10"], ["white", "object", 28800, 76, "2026-06-08"],
      ["cream", "cup", 33150, 72, "2026-05-29"], ["pink", "cup", 37800, 88, "2026-06-02"],
      ["pink", "object", 61200, 68, "2026-05-24"], ["cream", "plate", 29000, 82, "2026-05-12"],
      ["gray", "bowl", 89000, 57, "2026-04-28"], ["cream", "plate", 999999999, 0, "2026-06-22"]
    ],
    "ARTISAN EDITION": [
      ["brown", "set", 108000, 63, "2026-06-12"], ["white", "set", 108000, 58, "2026-06-14"],
      ["pink", "set", 108000, 81, "2026-06-20"], ["brown", "cup", 129000, 46, "2026-05-26"],
      ["pink", "set", 118000, 75, "2026-06-04"], ["cream", "bowl", 124000, 52, "2026-05-30"],
      ["gray", "object", 148000, 39, "2026-06-16"], ["white", "object", 999999999, 0, "2026-06-22"]
    ],
    "COLLECTION": [
      ["pink", "set", 89000, 92, "2026-06-20"], ["cream", "cup", 57800, 86, "2026-06-18"],
      ["pink", "plate", 42000, 74, "2026-06-15"], ["white", "set", 98000, 69, "2026-06-12"],
      ["cream", "bowl", 46000, 63, "2026-06-08"], ["pink", "object", 61200, 58, "2026-06-04"],
      ["gray", "set", 108000, 47, "2026-05-30"], ["pink", "set", 999999999, 0, "2026-06-22"]
    ],
    "GIFT SET": [
      ["pink", "set", 78000, 72, "2026-06-19"], ["cream", "set", 92000, 65, "2026-06-17"],
      ["white", "set", 56000, 83, "2026-06-13"], ["pink", "set", 108000, 49, "2026-06-21"],
      ["brown", "cup", 48000, 76, "2026-06-09"], ["cream", "plate", 68000, 54, "2026-06-05"],
      ["gray", "object", 128000, 33, "2026-05-28"], ["pink", "set", 999999999, 0, "2026-06-22"]
    ]
  };
  const discountProducts = {
    "하트 글라스 미니 케이크 스탠드": { originalPrice: 32000, salePrice: 28800, discount: 10 },
    "로즈 하트 티컵 세트": { originalPrice: 42000, salePrice: 37800, discount: 10 }
  };

  const getPriceRange = (price) => (
    price <= 30000 ? "under30000" :
    price < 40000 ? "30000s" :
    price < 50000 ? "40000s" :
    price < 60000 ? "50000s" :
    price >= 100000 ? "over100000" : "over60000"
  );

  cards.forEach((card, index) => {
    const isManualCard = card.dataset.manual === "true";
    const fallbackData = productData[pageTitle]?.[index] || ["gray", "object", 999999999, 0, "1970-01-01"];
    const [color, type, price, sales, date] = fallbackData;
    const name = card.querySelector(".product-card__name")?.textContent.trim() || "";
    const discount = discountProducts[name];
    const currentPrice = card.querySelector(".product-card__price");
    const isComingSoon = currentPrice?.textContent.includes("Coming Soon");

    const resolvedPrice = Number(isManualCard ? card.dataset.price : (discount?.salePrice || price));
    card.dataset.color = isManualCard ? (card.dataset.color || "daily") : color;
    card.dataset.type = isManualCard ? (card.dataset.type || type) : type;
    card.dataset.category = card.dataset.category || card.dataset.type;
    card.dataset.new = card.dataset.new || (card.dataset.date || date).replaceAll("-", "");
    card.dataset.price = String(resolvedPrice);
    card.dataset.priceRange = card.dataset.priceRange || getPriceRange(resolvedPrice);
    const discountRate = Number(card.dataset.discount || discount?.discount || 0);
    const inferredOriginalPrice = discountRate > 0 && discountRate < 100
      ? Math.round((resolvedPrice / (1 - discountRate / 100)) / 100) * 100
      : resolvedPrice;
    card.dataset.originalPrice = String(card.dataset.originalPrice || discount?.originalPrice || inferredOriginalPrice);
    card.dataset.discount = String(discountRate);
    card.dataset.available = String(card.dataset.available || !isComingSoon);
    card.dataset.sales = String(card.dataset.sales || sales);
    card.dataset.date = card.dataset.date || date;
    card.dataset.recommend = String(card.dataset.recommend || index + 1);
    card.dataset.originalOrder = String(index);
    card.dataset.image = card.dataset.image || card.querySelector("img")?.getAttribute("src") || "";
    card.dataset.name = card.dataset.name || name;
    card.dataset.salePrice = card.dataset.salePrice || card.dataset.price;
    card.dataset.category = card.dataset.category || document.body.dataset.category || (document.body.classList.contains("daily-page") ? "daily-ceramic" : card.dataset.type);
    if (!card.dataset.id && document.body.classList.contains("daily-page")) {
      card.dataset.id = `daily-ceramic-${String(index + 1).padStart(2, "0")}`;
    }

    if (isComingSoon) {
      const imageArea = card.querySelector(".product-card__image");
      const infoArea = card.querySelector(".product-card__info");
      if (imageArea) {
        imageArea.classList.add("coming-soon-card");
        imageArea.setAttribute("aria-label", "상품 준비중입니다.");
        imageArea.innerHTML = '<span class="coming-soon-message">상품 준비중입니다.</span>';
      }
      infoArea?.remove();
    }

    if (currentPrice && !isComingSoon && !isManualCard) {
      const priceBox = document.createElement("div");
      priceBox.className = "product-price";
      if (discount) {
        priceBox.innerHTML = `
          <span class="price-original">${discount.originalPrice.toLocaleString("ko-KR")}원</span>
          <span class="price-sale">${discount.salePrice.toLocaleString("ko-KR")}원</span>
          <span class="price-discount">${discount.discount}%</span>
        `;
      } else {
        priceBox.innerHTML = `<span class="price-sale">${Number(price).toLocaleString("ko-KR")}원</span>`;
      }
      currentPrice.replaceWith(priceBox);
    }
  
    if (isManualCard && !isComingSoon) {
      const priceBox = card.querySelector(".product-price");
      const salePrice = priceBox?.querySelector(".price-sale");
      const originalPrice = Number(card.dataset.originalPrice || 0);
      const hasDiscount = discountRate > 0 && originalPrice > resolvedPrice;

      if (priceBox && salePrice && hasDiscount) {
        let originalPriceElement = priceBox.querySelector(".price-original");
        if (!originalPriceElement) {
          originalPriceElement = document.createElement("span");
          originalPriceElement.className = "price-original";
          priceBox.insertBefore(originalPriceElement, salePrice);
        }
        originalPriceElement.textContent = `${originalPrice.toLocaleString("ko-KR")}원`;
      } else if (priceBox && !hasDiscount) {
        priceBox.querySelector(".price-original")?.remove();
        priceBox.querySelector(".price-discount")?.remove();
      }
    }

    addInlineActions(card);
  });

  function closeDropdowns(except) {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove("is-open");
      dropdown.querySelector("[aria-expanded]")?.setAttribute("aria-expanded", "false");
    });
  }

  function renderPagination(totalItems) {
    if (!paginationEnabled || totalItems <= itemsPerPage) {
      pagination.hidden = true;
      pagination.innerHTML = "";
      return;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageButtons = Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;
      return `<button type="button" class="product-page-number${pageNumber === currentPage ? " active" : ""}" data-page="${pageNumber}" aria-current="${pageNumber === currentPage ? "page" : "false"}">${pageNumber}</button>`;
    }).join("");

    pagination.innerHTML = `
      <button type="button" class="product-page-prev" aria-label="이전 페이지" ${currentPage === 1 ? "disabled" : ""}>‹</button>
      ${pageButtons}
      <button type="button" class="product-page-next" aria-label="다음 페이지" ${currentPage === totalPages ? "disabled" : ""}>›</button>
    `;
    pagination.hidden = false;
  }

  function applyProducts(resetPage = true) {
    if (resetPage) currentPage = 1;

    const visibleCards = cards.filter((card) => {
      const price = Number(card.dataset.price);
      const priceMatch =
        state.priceRange === "all" ||
        (state.priceRange === "under30000" && price <= 30000) ||
        (state.priceRange === "30000-50000" && price > 30000 && price <= 50000) ||
        (state.priceRange === "30000s" && price > 30000 && price < 40000) ||
        (state.priceRange === "40000s" && price >= 40000 && price < 50000) ||
        (state.priceRange === "50000s" && price >= 50000 && price < 60000) ||
        (state.priceRange === "over60000" && price >= 60000 && card.dataset.available !== "false") ||
        (state.priceRange === "under50000" && price <= 50000) ||
        (state.priceRange === "50000-80000" && price > 50000 && price <= 80000) ||
        (state.priceRange === "80000-100000" && price > 80000 && price <= 100000) ||
        (state.priceRange === "50000-100000" && price > 50000 && price <= 100000) ||
        (state.priceRange === "over100000" && price >= 100000 && card.dataset.available !== "false");
      const typeMatch = state.type === "all" || card.dataset.type === state.type || card.dataset.category === state.type || card.dataset.mainCategory === state.type || (state.type === "premium-gift" && price >= 100000 && card.dataset.available !== "false");
      const collectionValues = String(card.dataset.collection || "").split(/\s+/);
      const collectionMatch = state.collection === "all" || collectionValues.includes(state.collection);
      const isVisible = priceMatch && typeMatch && collectionMatch;
      card.hidden = !isVisible;
      return isVisible;
    });

    const compareNumber = (key, direction = 1) => (a, b) =>
      (Number(a.dataset[key]) - Number(b.dataset[key])) * direction;

    const comparePrice = (direction) => (a, b) => {
      const aUnavailable = a.dataset.available === "false";
      const bUnavailable = b.dataset.available === "false";
      if (aUnavailable !== bUnavailable) return aUnavailable ? 1 : -1;
      return (Number(a.dataset.price) - Number(b.dataset.price)) * direction;
    };

    const sorters = {
      recommend: compareNumber("recommend"),
      newest: (a, b) => Number(b.dataset.new || 0) - Number(a.dataset.new || 0),
      sales: compareNumber("sales", -1),
      priceLow: comparePrice(1),
      priceHigh: comparePrice(-1),
      discount: compareNumber("discount", -1)
    };

    visibleCards.sort(sorters[state.sort] || sorters.recommend);
    visibleCards.forEach((card) => grid.appendChild(card));

    if (paginationEnabled) {
      const totalPages = Math.max(1, Math.ceil(visibleCards.length / itemsPerPage));
      currentPage = Math.min(Math.max(currentPage, 1), totalPages);
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      visibleCards.forEach((card, index) => {
        card.hidden = index < start || index >= end;
      });
      renderPagination(visibleCards.length);
    } else {
      pagination.hidden = true;
      pagination.innerHTML = "";
    }

    emptyMessage.hidden = visibleCards.length > 0;
  }

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector("[aria-expanded]");
    const options = dropdown.querySelectorAll("[data-value]");

    toggle?.addEventListener("click", () => {
      const willOpen = !dropdown.classList.contains("is-open");
      closeDropdowns(dropdown);
      dropdown.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const value = option.dataset.value;
        const filterName = dropdown.dataset.filter;

        if (filterName) {
          state[filterName] = value;
          const filterLabels = { priceRange: "금액별", type: "제품 보기", collection: "컬렉션별" };
          const baseLabel = filterLabels[filterName] || "필터";
          const selectedText = option.textContent.trim();
          toggle.querySelector("span").textContent =
            !value || value === "all" || selectedText === "전체" || selectedText === "---"
              ? baseLabel
              : selectedText;
        } else {
          state.sort = value;
          toggle.querySelector("span").textContent = option.textContent.trim();
        }

        options.forEach((item) => item.classList.toggle("is-selected", item === option));
        closeDropdowns();
        applyProducts(true);
      });
    });
  });

  if (collectionFilter) {
    const searchParams = new URLSearchParams(window.location.search);
    const filterAliases = {
      "heart-collection": "heart"
    };
    const requestedFilter = searchParams.get("filter");
    const collectionParam = filterAliases[requestedFilter] || searchParams.get("collection") || requestedFilter;
    const collectionOption = collectionParam
      ? Array.from(collectionFilter.querySelectorAll("[data-value]")).find((option) => option.dataset.value === collectionParam)
      : null;

    if (collectionOption) {
      state.collection = collectionParam;
      collectionFilter.querySelectorAll("[data-value]").forEach((item) => {
        item.classList.toggle("is-selected", item === collectionOption);
      });
      const toggleLabel = collectionFilter.querySelector(".product-filter__toggle span");
      if (toggleLabel) toggleLabel.textContent = collectionOption.textContent.trim();
    }
  }

  grid.addEventListener("click", (event) => {
    const wishButton = event.target.closest(".product-inline-wish-btn");
    const cartButton = event.target.closest(".product-inline-cart-btn");
    if (!wishButton && !cartButton) return;

    event.preventDefault();
    event.stopPropagation();

    const card = event.target.closest(".product-card, .product-item");
    if (!card?.dataset.id) return;
    const product = getProductPayload(card);

    if (wishButton) {
      const wishlist = getProductStorage("aureliaWish");
      const existingIndex = wishlist.findIndex((item) => item?.id === product.id);
      if (existingIndex === -1) {
        wishlist.push(product);
        setProductStorage("aureliaWish", wishlist);
        updateInlineWishButtons(product.id, true);
        showProductToast("찜하기가 완료되었습니다.");
      } else {
        wishlist.splice(existingIndex, 1);
        setProductStorage("aureliaWish", wishlist);
        updateInlineWishButtons(product.id, false);
        showProductToast("찜하기가 취소되었습니다.");
      }
      updateProductHeaderCounts();
      if (typeof updateWishlistHeader === "function") updateWishlistHeader();
      if (typeof renderWishlist === "function") renderWishlist();
      return;
    }

    if (cartButton) {
      if (window.AureliaCart) {
        window.AureliaCart.addItem({ ...product, qty: 1 });
        window.AureliaCart.open();
        return;
      }

      const cart = getProductStorage("aureliaCart");
      const existing = cart.find((item) => item?.id === product.id);
      if (existing) {
        existing.quantity = Number(existing.quantity || existing.qty || 0) + 1;
        existing.qty = Number(existing.qty || existing.quantity || 0);
      } else {
        cart.push({ ...product, quantity: 1, qty: 1 });
      }
      setProductStorage("aureliaCart", cart);
      updateProductHeaderCounts();
      showProductToast("장바구니에 담았습니다.");
    }
  });
  pagination.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.classList.contains("product-page-prev")) {
      currentPage -= 1;
    } else if (button.classList.contains("product-page-next")) {
      currentPage += 1;
    } else if (button.classList.contains("product-page-number")) {
      currentPage = Number(button.dataset.page);
    } else {
      return;
    }

    applyProducts(false);
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".product-filter, .sort-dropdown")) closeDropdowns();
  });

  applyProducts();
});
