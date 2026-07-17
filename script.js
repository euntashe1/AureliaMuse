/* =========================================================
  Aurelia Muse 공통 저장소 이름
  - CART_KEY는 장바구니 상품을 localStorage에 저장할 때 쓰는 이름입니다.
  - FAVORITES_KEY는 찜한 상품 ID 목록을 저장할 때 쓰는 이름입니다.
  - localStorage는 브라우저 안에 데이터를 남겨 두는 저장 공간이라,
    새로고침을 해도 장바구니와 찜 상태가 유지됩니다.
========================================================= */
const CART_KEY = "aureliaCart";
const FAVORITES_KEY = "aureliaWish";
const OLD_FAVORITES_KEY = "aureliaMuseFavorites";

/* =========================================================
  localStorage 읽기 함수
  - key 이름에 해당하는 데이터를 배열로 읽어옵니다.
  - 저장된 값이 없으면 빈 배열([])을 돌려줍니다.
  - JSON.parse는 문자로 저장된 데이터를 다시 배열/객체로 바꾸는 역할입니다.
========================================================= */
function readStorage(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

/* =========================================================
  localStorage 저장 함수
  - 배열이나 객체를 브라우저 저장 공간에 저장합니다.
  - localStorage는 문자만 저장할 수 있어서 JSON.stringify로 문자화합니다.
========================================================= */
function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* =========================================================
  기존 찜 데이터 이어받기
  - 예전 코드에서 aureliaMuseFavorites라는 이름을 사용한 적이 있어,
    기존 사용자가 저장해 둔 찜 데이터를 새 이름 aureliaLikes로 옮깁니다.
  - 새 이름에 이미 데이터가 있으면 덮어쓰지 않습니다.
========================================================= */
if (!localStorage.getItem(FAVORITES_KEY) && localStorage.getItem(OLD_FAVORITES_KEY)) {
  writeStorage(FAVORITES_KEY, readStorage(OLD_FAVORITES_KEY));
}

/* =========================================================
  가격 표기 함수
  - 숫자 32300을 32,300원처럼 보기 좋은 한국 원화 형식으로 바꿉니다.
  - 장바구니 페이지의 상품 가격과 합계 표시에 사용됩니다.
========================================================= */
function formatPrice(price) {
  return `${Number(price).toLocaleString("ko-KR")}원`;
}

/* =========================================================
  장바구니 개수 표시
  - localStorage에 저장된 장바구니 상품 수량을 모두 더합니다.
  - 헤더의 cart-count 배지와 장바구니 페이지의 개수 표시를 함께 갱신합니다.
========================================================= */
function updateCartCount() {
  const count = readStorage(CART_KEY).reduce((sum, item) => sum + Number(item.qty || item.quantity || 0), 0);
  document.querySelectorAll(".cart-count").forEach((badge) => {
    const hasItems = count > 0;
    badge.textContent = hasItems ? String(count) : "";
    badge.hidden = !hasItems;
    badge.setAttribute("aria-hidden", String(!hasItems));
    badge.setAttribute("data-count-ready", "");
  });
}

/* =========================================================
  헤더 찜하기 상태 표시
  - 찜한 상품이 1개 이상이면 헤더 하트가 활성화되고 숫자 배지가 보입니다.
  - 찜한 상품이 없으면 헤더 하트는 기본 상태로 돌아가고 배지는 숨겨집니다.
========================================================= */
function updateWishlistHeader() {
  const favorites = [...readStorage(FAVORITES_KEY), ...readStorage("aureliaWishlist"), ...readStorage(OLD_FAVORITES_KEY)]
    .filter((item, index, list) => item?.id && list.findIndex((candidate) => candidate?.id === item.id) === index);
  writeStorage(FAVORITES_KEY, favorites);
  localStorage.removeItem("aureliaWishlist");
  const headerWish = document.querySelector(".header-wishlist-link");
  const headerWishIcon = document.querySelector(".header-wishlist-icon");
  const count = favorites.length;

  document.querySelectorAll(".wishlist-count").forEach((badge) => {
    const hasItems = count > 0;
    badge.hidden = !hasItems;
    badge.textContent = hasItems ? String(count) : "";
    badge.setAttribute("aria-hidden", String(!hasItems));
    badge.setAttribute("data-count-ready", "");
  });

  if (!headerWish || !headerWishIcon) return;
  headerWish.classList.toggle("is-active", count > 0);
  headerWishIcon.textContent = count > 0 ? "♥" : "♡";
}

/* =========================================================
  토스트 알림
  - 찜하기 또는 장바구니 버튼을 눌렀을 때 화면 아래에 잠깐 뜨는 문구입니다.
  - 같은 토스트 요소를 재사용하며, 2초 뒤 자연스럽게 사라집니다.
========================================================= */
function showToast(message) {
  const toast = document.querySelector(".cart-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2000);
}

/* =========================================================
  CURATED FOR YOU 섹션 슬라이더
  - Swiper 라이브러리를 사용해 상품이 좌우로 움직입니다.
  - HTML의 .curated-swiper 구조와 이전/다음 버튼 클래스가 유지되어야 합니다.
========================================================= */
if (document.querySelector(".curated-swiper") && window.Swiper) {
  new Swiper(".curated-swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 650,
    loop: false,
    rewind: true,
    watchOverflow: true,
    navigation: {
      prevEl: ".curated-section__prev",
      nextEl: ".curated-section__next"
    },
    breakpoints: {
      769: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20
      }
    }
  });
}

/* =========================================================
  NEW 섹션 슬라이더
  - NEW 영역 오른쪽 상품 슬라이드를 움직이게 하는 코드입니다.
  - 오른쪽 화살표 버튼을 누르면 다음 상품 세트로 넘어갑니다.
  - Swiper 라이브러리를 사용하므로 HTML 구조에서
    .swiper, .swiper-wrapper, .swiper-slide가 유지되어야 합니다.
  - NEW 섹션 안의 Swiper는 .new-product-slider 하나만 사용합니다.
    중복 초기화를 막기 위해 다른 NEW용 Swiper 클래스는 만들지 않습니다.
========================================================= */
let newProductSlider = null;
if (document.querySelector(".new-product-slider") && window.Swiper) {
  newProductSlider = new Swiper(".new-product-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 700,
    loop: true,
    navigation: {
      prevEl: ".new-slider-prev",
      nextEl: ".new-slider-next"
    }
  });
}

/* =========================================================
  BEST SELLERS 영상 재생/정지 버튼
  - 각 영상 카드의 playbt.png 버튼을 누르면 해당 영상만 멈추거나 다시 재생됩니다.
  - 한 카드의 버튼을 눌러도 다른 영상에는 영향을 주지 않습니다.
========================================================= */
document.querySelectorAll(".video-box").forEach((videoBox) => {
  const video = videoBox.querySelector("video");
  const toggleButton = videoBox.querySelector(".video-toggle");
  if (!video || !toggleButton) return;

  toggleButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      toggleButton.classList.remove("is-paused");
      toggleButton.setAttribute("aria-label", "영상 일시정지");
    } else {
      video.pause();
      toggleButton.classList.add("is-paused");
      toggleButton.setAttribute("aria-label", "영상 재생");
    }
  });
});

/* =========================================================
  햄버거 메뉴 열기/닫기 기능
  - 왼쪽 상단 햄버거 버튼을 누르면 사이드 메뉴가 열립니다.
  - X 버튼, 어두운 배경, 메뉴 링크, ESC 키로 메뉴를 닫을 수 있습니다.
  - 메뉴가 열려 있을 때는 body에 menu-open 클래스를 붙여 배경 스크롤을 막습니다.
========================================================= */
const menuButton = document.querySelector(".menu-icon");
const sideMenu = document.querySelector(".side-menu");
const menuOverlay = document.querySelector(".side-menu-overlay");
const menuCloseButton = document.querySelector(".side-menu__close");
const sideMenuToggleButtons = document.querySelectorAll(".menu-icon, [data-side-menu-toggle]");

function setSideMenu(open) {
  if (!sideMenu || !menuOverlay) return;
  sideMenu.classList.toggle("is-open", open);
  menuOverlay.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  sideMenu.setAttribute("aria-hidden", String(!open));
  menuOverlay.setAttribute("aria-hidden", String(!open));
  sideMenuToggleButtons.forEach((button) => button.setAttribute("aria-expanded", String(open)));
}

if (sideMenuToggleButtons.length && sideMenu && menuOverlay && menuCloseButton) {
  sideMenuToggleButtons.forEach((button) => {
    button.addEventListener("click", () => setSideMenu(true));
  });
  menuCloseButton.addEventListener("click", () => setSideMenu(false));
  menuOverlay.addEventListener("click", () => setSideMenu(false));
  sideMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setSideMenu(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSideMenu(false);
  });
}

/* =========================================================
  PRODUCTS 섹션 진입 시 헤더 배경 변경
  - 사용자가 PRODUCTS 섹션 근처로 스크롤하면 헤더에 반투명 배경을 붙입니다.
  - PRODUCTS보다 위쪽에서는 기존처럼 투명한 헤더로 보입니다.
  - CSS의 .site-header.is-products-active 스타일과 함께 작동합니다.
========================================================= */
/* 브랜드 스토리 페이지에서도 같은 헤더 전환 효과를 사용합니다.
   메인 페이지에는 #products가 있고 브랜드 페이지에는 #brand-intro가 있으므로,
   현재 페이지에서 찾을 수 있는 첫 번째 기준 섹션을 선택합니다. */
const siteHeader = document.querySelector(".site-header");
const productsSection = document.querySelector("#products");
const brandIntroSection = document.querySelector("#brand-intro");
const customGiftProcessSection = document.querySelector(".custom-gift-process");
const eventBoardSection = document.querySelector(".event-board");
const headerBackgroundTrigger = productsSection || brandIntroSection || customGiftProcessSection || eventBoardSection;

function updateHeaderForProducts() {
  if (!siteHeader || !headerBackgroundTrigger) return;
  const sectionTop = headerBackgroundTrigger.getBoundingClientRect().top + window.scrollY;
  const triggerOffset = customGiftProcessSection || eventBoardSection ? 8 : 40;
  const triggerLine = sectionTop - siteHeader.offsetHeight - triggerOffset;
  siteHeader.classList.toggle("is-products-active", window.scrollY >= triggerLine);
}

window.addEventListener("scroll", updateHeaderForProducts);
window.addEventListener("resize", updateHeaderForProducts);
updateHeaderForProducts();

/* =========================================================
  찜하기 기능
  - NEW 등 상품 카드의 하트 버튼을 누르면 찜 상태가 켜집니다.
  - 다시 누르면 찜 상태가 해제됩니다.
  - 찜한 상품은 localStorage의 aureliaLikes에 상품 정보 객체로 저장됩니다.
  - 저장 예시: { id, name, price, image }
  - wishlist.html은 이 정보를 다시 읽어서 찜한 상품 목록을 보여줍니다.
  - 새로고침해도 찜 상태가 유지되도록 페이지 로드 시 저장값을 다시 읽습니다.
  - 헤더 오른쪽 하트 숫자 배지도 같은 aureliaLikes 목록을 기준으로 업데이트됩니다.
========================================================= */
function setFavoriteButton(button, liked) {
  const heartIcon = button?.querySelector(".heart-icon");
  button.classList.toggle("is-favorite", liked);
  button.classList.toggle("is-active", liked);
  if (heartIcon) {
    heartIcon.textContent = liked ? "♥" : "♡";
  } else if (button) {
    button.textContent = liked ? "♥" : "♡";
  }
}

function normalizeLikes() {
  const rawLikes = readStorage(FAVORITES_KEY);
  const normalized = rawLikes
    .map((item) => {
      if (typeof item === "string") {
        const card = document.querySelector(`.product-item[data-id="${item}"]`);
        if (!card) return null;
        return {
          id: card.dataset.id,
          name: card.dataset.name,
          price: Number(card.dataset.price),
          image: card.dataset.image
        };
      }
      if (!item || !item.id) return null;
      return {
        id: item.id,
        name: item.name || "",
        price: Number(item.price || 0),
        image: item.image || ""
      };
    })
    .filter(Boolean);

  const uniqueLikes = [];
  normalized.forEach((item) => {
    if (!uniqueLikes.some((saved) => saved.id === item.id)) uniqueLikes.push(item);
  });
  writeStorage(FAVORITES_KEY, uniqueLikes);
  return uniqueLikes;
}

function updateLikeButtons(id, liked) {
  document.querySelectorAll(`.product-item[data-id="${id}"] .favorite-button`).forEach((button) => {
    setFavoriteButton(button, liked);
  });
}

function productFromCard(card) {
  return {
    id: card.dataset.id,
    name: card.dataset.name,
    price: Number(card.dataset.price),
    image: card.dataset.image
  };
}

function initLikeButtons() {
  const likes = normalizeLikes();
  document.querySelectorAll(".product-item[data-id]").forEach((card) => {
    const favoriteButton = card.querySelector(".favorite-button");
    const id = card.dataset.id;
    if (!favoriteButton) return;

    setFavoriteButton(favoriteButton, likes.some((item) => item.id === id));

    favoriteButton.addEventListener("click", () => {
      const currentLikes = normalizeLikes();
      const exists = currentLikes.some((item) => item.id === id);
      if (exists) {
        writeStorage(FAVORITES_KEY, currentLikes.filter((item) => item.id !== id));
        updateLikeButtons(id, false);
      } else {
        currentLikes.push(productFromCard(card));
        writeStorage(FAVORITES_KEY, currentLikes);
        updateLikeButtons(id, true);
        showToast("찜하기가 완료 되었습니다.");
      }
      updateWishlistHeader();
      renderWishlist();
    });
  });
}

document.querySelectorAll(".product-item[data-id]").forEach((card) => {
  const cartButton = card.querySelector(".cart-button");
  const id = card.dataset.id;
  if (!cartButton) return;

  /* =========================================================
    장바구니 담기 기능
    - 장바구니 버튼을 누르면 상품명, 이미지, 가격, 수량을 저장합니다.
    - 저장 위치는 localStorage의 aureliaMuseCart입니다.
    - 이미 담긴 상품이면 새 줄을 만들지 않고 수량만 1 증가합니다.
  ========================================================= */
  cartButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const product = {
      id,
      name: card.dataset.name,
      image: card.dataset.image,
      price: Number(card.dataset.price)
    };

    if (window.AureliaCart) {
      window.AureliaCart.addItem({ ...product, qty: 1 });
      window.AureliaCart.open();
      return;
    }

    const cart = readStorage(CART_KEY);
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.quantity = Number(existing.quantity || existing.qty || 0) + 1;
      existing.qty = Number(existing.qty || existing.quantity || 0);
    } else {
      cart.push({ ...product, quantity: 1, qty: 1 });
    }
    writeStorage(CART_KEY, cart);
    updateCartCount();
    showToast("장바구니에 담았습니다.");
  });
});

/* =========================================================
  장바구니 페이지 렌더링
  - cart.html에서만 실제 목록이 보입니다.
  - localStorage에 저장된 상품을 읽어서 이미지, 상품명, 가격, 수량, 합계를 화면에 그립니다.
  - index.html에는 cart-page__list가 없으므로 이 함수는 자동으로 아무 작업도 하지 않습니다.
========================================================= */
function renderCart() {
  const list = document.querySelector(".cart-page__list");
  const empty = document.querySelector(".cart-page__empty");
  const total = document.querySelector(".cart-page__total strong");
  if (!list || !empty || !total) return;

  const cart = readStorage(CART_KEY);
  list.innerHTML = "";
  empty.hidden = cart.length > 0;

  cart.forEach((item) => {
    const row = document.createElement("article");
    row.className = "cart-row";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-row__info"><h2>${item.name}</h2><p>${formatPrice(item.price)}</p></div>
      <div class="cart-row__quantity">
        <button type="button" data-action="minus" aria-label="수량 줄이기">−</button>
        <span>${item.quantity}</span>
        <button type="button" data-action="plus" aria-label="수량 늘리기">+</button>
      </div>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
      <button class="cart-row__remove" type="button">삭제</button>
    `;

    row.querySelector('[data-action="minus"]').addEventListener("click", () => changeQuantity(item.id, -1));
    row.querySelector('[data-action="plus"]').addEventListener("click", () => changeQuantity(item.id, 1));
    row.querySelector(".cart-row__remove").addEventListener("click", () => removeCartItem(item.id));
    list.appendChild(row);
  });

  total.textContent = formatPrice(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  updateCartCount();
}

/* =========================================================
  장바구니 수량 변경
  - + 버튼은 수량을 1 늘리고, - 버튼은 수량을 1 줄입니다.
  - 수량은 최소 1개 아래로 내려가지 않게 막아 둡니다.
========================================================= */
function changeQuantity(id, change) {
  const cart = readStorage(CART_KEY);
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + change);
  writeStorage(CART_KEY, cart);
  renderCart();
}

/* =========================================================
  장바구니 상품 삭제
  - 삭제 버튼을 누른 상품 ID만 제외하고 다시 저장합니다.
  - 저장 후 renderCart를 다시 실행해서 화면 목록을 새로 그립니다.
========================================================= */
function removeCartItem(id) {
  writeStorage(CART_KEY, readStorage(CART_KEY).filter((item) => item.id !== id));
  renderCart();
}

/* =========================================================
  찜하기 페이지 렌더링
  - wishlist.html에서만 실행되는 화면 그리기 코드입니다.
  - localStorage의 aureliaLikes에 저장된 상품 정보로 이미지, 상품명, 가격을 표시합니다.
  - 삭제 버튼은 찜 목록에서 상품을 제거하고, 장바구니 버튼은 기존 장바구니 저장 방식을 그대로 사용합니다.
========================================================= */
function renderWishlist() {
  const list = document.querySelector(".wishlist-page__list");
  const empty = document.querySelector(".wishlist-page__empty");
  if (!list || !empty) return;

  const likes = normalizeLikes();
  list.innerHTML = "";
  empty.hidden = likes.length > 0;

  likes.forEach((item) => {
    const row = document.createElement("article");
    row.className = "cart-row wishlist-row";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-row__info"><h2>${item.name}</h2><p>${formatPrice(item.price)}</p></div>
      <button class="wishlist-row__cart" type="button">장바구니 담기</button>
      <button class="cart-row__remove" type="button">삭제</button>
    `;

    row.querySelector(".wishlist-row__cart").addEventListener("click", () => addWishlistItemToCart(item));
    row.querySelector(".cart-row__remove").addEventListener("click", () => removeWishlistItem(item.id));
    list.appendChild(row);
  });
}

function addWishlistItemToCart(item) {
  if (window.AureliaCart) {
    window.AureliaCart.addItem({ ...item, qty: 1 });
    window.AureliaCart.open();
    return;
  }

  const cart = readStorage(CART_KEY);
  const existing = cart.find((entry) => entry.id === item.id);
  if (existing) {
    existing.quantity = Number(existing.quantity || existing.qty || 0) + 1;
  } else {
    cart.push({ ...item, quantity: 1, qty: 1 });
  }
  writeStorage(CART_KEY, cart);
  updateCartCount();
  showToast("장바구니에 담았습니다.");
}

function removeWishlistItem(id) {
  writeStorage(FAVORITES_KEY, normalizeLikes().filter((item) => item.id !== id));
  updateLikeButtons(id, false);
  updateWishlistHeader();
  renderWishlist();
}

/* =========================================================
  페이지 로드 후 초기 실행
  - 장바구니 개수, 찜하기 버튼 상태, 찜하기 개수, 장바구니/찜하기 페이지 목록을 처음 한 번 표시합니다.
========================================================= */
updateCartCount();
initLikeButtons();
updateWishlistHeader();
renderCart();
renderWishlist();

/* 모든 페이지의 메뉴 링크와 푸터를 메인 페이지 기준으로 통일합니다. */
document.querySelectorAll(".side-menu__group").forEach((group) => {
  const title = group.querySelector("h2")?.textContent.trim().toUpperCase();
  if (title === "PRODUCTS") {
    let eventLink = Array.from(group.querySelectorAll("a")).find((link) =>
      link.querySelector("strong")?.textContent.trim().toLowerCase() === "event & promotion"
    );
    if (!eventLink) {
      eventLink = document.createElement("a");
      eventLink.innerHTML = "<strong>Event &amp; Promotion</strong><span>이벤트</span>";
      group.appendChild(eventLink);
    }
    eventLink.href = "event-promotion.html";
  }
});

document.querySelectorAll(".site-footer").forEach((footer) => {
  footer.innerHTML = `
    <a class="site-footer__logo" href="#top">Aurelia Muse</a>
    <div class="site-footer__company">
      <p class="site-footer__menu-line"><a href="#">POLICY</a><a href="#">이용약관</a><a href="#">개인정보처리방침</a><a href="#">법적고지</a><a href="#">영상정보처리기기</a><a href="#">운영/관리</a><a href="#">방침</a></p>
      <p class="site-footer__menu-line"><a href="#">CS</a><a href="notice.html">공지사항</a><a href="faq.html">FAQ</a><a href="contact.html">1:1 문의</a><a href="custom-bulk-order.html">대량구매</a></p>
      <p>(주)오렐리아뮤즈코리아 | 대표이사 : 박영은 | 주소 : 04377 서울 용산구 한강대로23길 88 용산역 8층(한강로3가, 아이파크몰) | 사업자등록번호 : 211-86-75820</p>
      <p>통신판매업신고 : 제 2022-서울용산-1708호 | 개인정보보호책임자 : 박영은 | 대표번호 : 1577-1541 | 제휴/협찬/입점 : rmagml@cj.net</p>
    </div>
    <small>COPYRIGHT © BRANDWORKSKOREA ALL RIGHTS RESERVED.</small>
  `;
});

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : event.target.parentElement;
  const link = target?.closest(".site-footer a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (href === null || href.trim() === "" || href.trim() === "#") {
    event.preventDefault();
  }
});

/* =========================================================
  공통 로그인 모달
  - Login 링크는 페이지 이동 대신 모달을 엽니다.
  - 로그인 전 Cart 링크와 장바구니 버튼도 모달을 먼저 엽니다.
========================================================= */
const LOGIN_KEY = "aureliaMuseLoggedIn";

function createLoginModal() {
  if (document.querySelector(".login-modal")) return;
  const modal = document.createElement("div");
  modal.className = "login-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="login-modal__backdrop" data-login-close></div>
    <section class="login-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <button class="login-modal__close" type="button" aria-label="로그인 창 닫기" data-login-close>×</button>
      <h2 class="login-modal__logo" id="login-modal-title">Aurelia Muse</h2>
      <form class="login-modal__form">
        <label class="sr-only" for="aurelia-login-id">아이디</label>
        <input id="aurelia-login-id" name="userId" type="text" placeholder="아이디" autocomplete="username" required>
        <label class="sr-only" for="aurelia-login-password">비밀번호</label>
        <input id="aurelia-login-password" name="password" type="password" placeholder="비밀번호" autocomplete="current-password" required>
        <button class="login-modal__submit" type="submit">로그인</button>
      </form>
      <div class="login-modal__links"><a href="#">회원가입</a><a href="#">아이디/비밀번호 찾기</a></div>
    </section>
  `;
  document.body.appendChild(modal);

  modal.querySelectorAll("[data-login-close]").forEach((button) => {
    button.addEventListener("click", closeLoginModal);
  });
  modal.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem(LOGIN_KEY, "true");
    closeLoginModal();
    showToast("로그인되었습니다.");
  });
}

function openLoginModal() {
  createLoginModal();
  const modal = document.querySelector(".login-modal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("login-modal-open");
  window.setTimeout(() => modal.querySelector("input")?.focus(), 50);
}

function closeLoginModal() {
  const modal = document.querySelector(".login-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("login-modal-open");
}

document.addEventListener("click", (event) => {
  const loginLink = event.target.closest('a[href$="login.html"]');

  if (loginLink) {
    event.preventDefault();
    openLoginModal();
    return;
  }
}, true);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLoginModal();
});

document.querySelectorAll(".event-page").forEach((page) => {
  const tabButtons = page.querySelectorAll("[data-event-panel-target]");
  const panels = page.querySelectorAll("[data-event-panel]");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.eventPanelTarget;

      tabButtons.forEach((tab) => {
        const isActive = tab === button;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.dataset.eventPanel === target;
        panel.hidden = !isActive;
        panel.classList.toggle("is-active", isActive);
      });
    });
  });
});
/* Custom bulk order gift process reveal */
document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".gift-process-reveal");
  if (!revealItems.length) return;

  document.body.classList.add("gift-process-reveal-ready");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
});
