(function () {
  const countrySelect = document.getElementById("visit-country-filter");
  const citySelect = document.getElementById("visit-city-filter");
  const marker = document.getElementById("visit-map-marker");
  const mapCard = document.getElementById("visit-map-card");
  const mapCardTitle = document.getElementById("visit-map-card-title");
  const mapCardAddress = document.getElementById("visit-map-card-address");
  const mapFrame = document.querySelector(".visit-map__iframe");
  const storeCards = Array.from(document.querySelectorAll(".visit-store-card[data-store]"));
  const currentLocationButton = document.querySelector(".visit-current-location");

  if (!countrySelect || !citySelect || !marker || !mapCard || !mapCardTitle || !mapCardAddress) return;

  const cityOptions = {
    "대한민국": ["부산", "서울", "경기", "대전"],
    "일본": ["도쿄", "오사카", "교토", "후쿠오카"],
    "중국": ["상하이", "베이징", "광저우", "선전"],
    "미국": ["뉴욕", "로스앤젤레스", "샌프란시스코", "시애틀"]
  };

  const cityMeta = {
    "부산": { address: "부산광역시 중구 감성로 24", marker: { left: "48%", top: "43%" } },
    "서울": { address: "서울특별시 용산구 한강대로 88", marker: { left: "53%", top: "39%" } },
    "경기": { address: "경기도 성남시 분당구 뮤즈로 24", marker: { left: "45%", top: "47%" } },
    "대전": { address: "대전광역시 중구 테라코타로 24", marker: { left: "51%", top: "50%" } },
    "도쿄": { address: "Tokyo Shibuya 2-24 Aurelia Muse", marker: { left: "57%", top: "42%" } },
    "오사카": { address: "Osaka Chuo 1-24 Aurelia Muse", marker: { left: "49%", top: "46%" } },
    "교토": { address: "Kyoto Higashiyama 24 Aurelia Muse", marker: { left: "46%", top: "40%" } },
    "후쿠오카": { address: "Fukuoka Hakata 24 Aurelia Muse", marker: { left: "42%", top: "52%" } },
    "상하이": { address: "Shanghai Jing'an 24 Aurelia Muse", marker: { left: "54%", top: "44%" } },
    "베이징": { address: "Beijing Chaoyang 24 Aurelia Muse", marker: { left: "47%", top: "37%" } },
    "광저우": { address: "Guangzhou Tianhe 24 Aurelia Muse", marker: { left: "58%", top: "52%" } },
    "선전": { address: "Shenzhen Nanshan 24 Aurelia Muse", marker: { left: "52%", top: "55%" } },
    "뉴욕": { address: "New York Soho 24 Aurelia Muse", marker: { left: "56%", top: "41%" } },
    "로스앤젤레스": { address: "Los Angeles Melrose 24 Aurelia Muse", marker: { left: "40%", top: "51%" } },
    "샌프란시스코": { address: "San Francisco Hayes 24 Aurelia Muse", marker: { left: "44%", top: "43%" } },
    "시애틀": { address: "Seattle Capitol Hill 24 Aurelia Muse", marker: { left: "50%", top: "36%" } }
  };

  const storeInfo = {
    flagship: {
      title: "Aurelia Muse Flagship Store",
      suffix: "Aurelia Muse 1F",
      offset: { left: 0, top: 0 }
    },
    workshop: {
      title: "Aurelia Muse Ceramic Workshop",
      suffix: "Aurelia Muse Studio B1F",
      offset: { left: 8, top: 7 }
    }
  };

  const getCurrentCity = () => citySelect.value || cityOptions[countrySelect.value][0];

  const buildAddress = (storeKey) => {
    const city = getCurrentCity();
    const base = cityMeta[city]?.address || cityMeta["부산"].address;
    return `${base}, ${storeInfo[storeKey].suffix}`;
  };

  const updateMapFrame = () => {
    if (!mapFrame) return;
    const city = getCurrentCity();
    const query = `${cityMeta[city]?.address || cityMeta["부산"].address} Aurelia Muse`;
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  };

  const setActiveCard = (storeKey) => {
    storeCards.forEach((card) => card.classList.toggle("is-active", card.dataset.store === storeKey));
  };

  const setMapStore = (storeKey, shouldActivateCard) => {
    const city = getCurrentCity();
    const meta = cityMeta[city] || cityMeta["부산"];
    const store = storeInfo[storeKey] || storeInfo.flagship;
    const left = `calc(${meta.marker.left} + ${store.offset.left}px)`;
    const top = `calc(${meta.marker.top} + ${store.offset.top}px)`;

    marker.style.left = left;
    marker.style.top = top;
    marker.classList.add("is-active");
    mapCard.style.left = `calc(${left} + 24px)`;
    mapCard.style.top = `calc(${top} + 18px)`;
    mapCardTitle.textContent = store.title;
    mapCardAddress.textContent = buildAddress(storeKey);

    if (shouldActivateCard) setActiveCard(storeKey);
  };

  const updateStoreAddresses = () => {
    storeCards.forEach((card) => {
      const address = card.querySelector("[data-store-address]");
      if (address) address.textContent = buildAddress(card.dataset.store);
    });
  };

  const populateCities = () => {
    const cities = cityOptions[countrySelect.value] || cityOptions["대한민국"];
    citySelect.innerHTML = "";
    cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  };

  const resetToFlagship = () => {
    updateStoreAddresses();
    updateMapFrame();
    setMapStore("flagship", true);
  };

  countrySelect.addEventListener("change", () => {
    populateCities();
    resetToFlagship();
  });

  citySelect.addEventListener("change", resetToFlagship);
  currentLocationButton?.addEventListener("click", resetToFlagship);

  storeCards.forEach((card) => {
    card.addEventListener("mouseenter", () => setMapStore(card.dataset.store, true));
    card.addEventListener("focusin", () => setMapStore(card.dataset.store, true));
    card.addEventListener("mouseleave", () => setMapStore("flagship", true));
    card.addEventListener("focusout", () => setMapStore("flagship", true));
  });

  populateCities();
  resetToFlagship();
})();
