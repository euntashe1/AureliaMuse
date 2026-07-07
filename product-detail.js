// ========================================
// 상품 상세 페이지 데이터 모음
// 상품 이미지, 옵션별 가격, 리뷰 3개, 상세 정보를 한 곳에서 관리합니다.
// 초보자가 수정할 때는 productData 안의 각 상품 값만 바꾸면 됩니다.
// ========================================
const productData = {
  "cream-bowl": {
    name: "크림 플루티드 볼",
    enName: "Cream Fluted Bowl",
    category: "DAILY CERAMIC",
    price: 33150,
    originalPrice: 39000,
    discount: 15,
    point: 990,
    delivery: 3000,
    freeDeliveryLimit: 70000,
    composition: "볼 1P",
    description: "부드러운 크림 컬러와 섬세한 플루티드 라인이 어우러진 데일리 세라믹 볼입니다.",
    image: "./img/cream-bowl-main.jpg",
    thumbs: [
      "./img/cream-bowl-main.jpg",
      "./img/cream-bowl-detail1.jpg",
      "./img/cream-bowl-detail2.jpg",
      "./img/cream-bowl-detail3.jpg"
    ],
    options: [],
    detail: "크림 플루티드 볼은 부드러운 크림 컬러와 잔잔한 세로 결이 돋보이는 데일리 테이블웨어입니다. 과하지 않은 곡선과 은은한 광택이 어우러져 디저트, 샐러드, 스프 등 다양한 메뉴를 담기 좋습니다.",
    specs: [
      ["제품명", "크림 플루티드 볼"],
      ["구성", "볼 1P"],
      ["소재", "세라믹"],
      ["색상", "Cream / Pink / Sage Green"],
      ["사이즈", "지름 14cm × 높이 6cm"],
      ["제조국", "Korea"],
      ["주의사항", "전자레인지 사용 가능, 식기세척기 사용 가능, 오븐 사용 불가"]
    ],
    reviews: defaultReviews("크림 컬러가 은은해서 어떤 테이블에도 잘 어울려요."),
    qna: defaultQna()
  },

  // ========================================
  // Royal Blue Ribbon Tea Cup 상품 데이터
  // image: 상세 페이지 상단의 큰 대표 이미지입니다.
  // thumbs: 썸네일 또는 디테일 컷 3칸에 표시되는 이미지 목록입니다.
  // 첫 번째 칸에는 대표 이미지를 한 번 더 넣어 사용자가 쉽게 확인할 수 있게 처리했습니다.
  // ========================================
  "royal-blue-ribbon-cup": {
    name: "로열 블루 리본 티 찻잔",
    enName: "Royal Blue Ribbon Tea Cup",
    category: "BEST SELLERS",
    price: 42000,
    originalPrice: 52000,
    discount: 19,
    point: 1260,
    delivery: 3000,
    freeDeliveryLimit: 70000,
    composition: "Cup 1P / Cup & Saucer Set",
    description: "블루 리본 패턴이 은은하게 담긴 클래식 티 컵입니다.",
    image: "./img/royal-blue-ribbon-tea-cup-main.jpg",
    imageFit: "contain",
    thumbs: [
      "./img/royal-blue-ribbon-tea-cup-main.jpg",
      "./img/royal-blue-ribbon-tea-cup-detail-01.jpg",
      "./img/royal-blue-ribbon-tea-cup-detail-02.jpg"
    ],
    // ========================================
    // Royal Blue Ribbon Tea Cup 옵션별 가격
    // 옵션마다 가격이 다르므로 options 배열에서 price를 각각 관리합니다.
    // 나중에 가격을 바꾸려면 아래 price 값만 수정하면 됩니다.
    // image 값은 오른쪽 옵션 카드와 장바구니/주문 페이지 썸네일에 함께 사용됩니다.
    // ========================================
    options: [
      { id: "cup-1p", name: "Cup 1P", price: 42000, image: "./img/royal-blue-ribbon-tea-cup-main.jpg" },
      { id: "cup-saucer-set", name: "Cup & Saucer Set", price: 58000, image: "./img/royal-blue-ribbon-tea-cup-detail-01.jpg" }
    ],
    // Royal Blue Ribbon은 긴 상세 컷 나열 대신 상품명 아래 메인 사진 1장만 보여줍니다.
    mainDetailImage: "./img/royal-blue-ribbon-tea-cup-main.jpg",
    detailCuts: [],
    detail: "로열 블루 리본 티 찻잔은 맑은 아이보리 포슬린 위에 블루 리본 패턴을 담아낸 클래식 티웨어입니다. 단정한 곡선과 은은한 색감이 어우러져 매일의 티타임을 더 우아하게 만들어줍니다.",
    specs: [
      ["제품명", "로열 블루 리본 티 찻잔"],
      ["구성", "Cup 1P / Cup & Saucer Set"],
      ["소재", "포슬린"],
      ["색상", "Ivory / Royal Blue"],
      ["제조국", "Korea"],
      ["주의사항", "전자레인지 사용 가능, 오븐 사용 불가"]
    ],
    // ========================================
    // 리뷰 데이터 3개 설정
    // 모든 상품 상세 페이지의 리뷰는 3개로 통일합니다.
    // ========================================
    reviews: [
      {
        writer: "muse***",
        date: "2026.06.12",
        rating: 5,
        content: "실물이 더 고급스럽고 블루 리본 패턴이 정말 섬세해요."
      },
      {
        writer: "aurelia***",
        date: "2026.06.15",
        rating: 5,
        content: "포장도 예쁘고 선물용으로도 만족스러워요."
      },
      {
        writer: "tea***",
        date: "2026.06.18",
        rating: 5,
        content: "잔의 곡선과 패턴이 섬세해서 매일 사용하고 싶어요."
      }
    ]
  },

  "botanical-clover-plate": {
    name: "보태니컬 클로버 브런치 접시",
    enName: "Botanical Clover Brunch Plate",
    category: "BEST SELLERS",
    price: 29000,
    originalPrice: 36000,
    discount: 19,
    point: 870,
    delivery: 3000,
    freeDeliveryLimit: 70000,
    composition: "Plate 1P / Plate 2P Set",
    description: "싱그러운 클로버 패턴으로 브런치 테이블을 완성하는 접시입니다.",
    image: "./img/botanical-clover-brunch-plate-main.jpeg",
    imageFit: "contain",
    thumbs: [
      "./img/botanical-clover-brunch-plate-main.jpeg",
      "./img/botanical-clover-brunch-plate-detail-01.jpeg",
      "./img/botanical-clover-brunch-plate-detail-02.jpeg",
      "./img/botanical-clover-brunch-plate-main.jpeg"
    ],
    detailCuts: [
      "./img/botanical-clover-brunch-plate-main.jpeg"
    ],
    options: [
      { id: "plate-1p", name: "Plate 1P", price: 29000, image: "./img/botanical-clover-brunch-plate-main.jpeg" }
    ],
    detail: "보태니컬 클로버 브런치 접시는 여린 그린 패턴과 부드러운 형태가 조화로운 데일리 플레이트입니다. 브런치, 디저트, 과일 접시로 사용하기 좋습니다.",
    specs: [
      ["제품명", "보태니컬 클로버 브런치 접시"],
      ["구성", "Plate 1P / Plate 2P Set"],
      ["소재", "세라믹"],
      ["색상", "Ivory / Clover Green"],
      ["제조국", "Korea"],
      ["주의사항", "식기세척기 사용 가능, 오븐 사용 불가"]
    ],
    reviews: [
      { writer: "kim***", date: "2026.06.02", rating: 5, content: "패턴이 섬세하고 접시 크기도 좋아요." },
      { writer: "yun***", date: "2026.06.08", rating: 5, content: "브런치용으로 구매했는데 테이블 분위기가 다 좋아져요." },
      { writer: "park***", date: "2026.06.14", rating: 5, content: "가볍고 예뻐서 자주 사용하게 됩니다." }
    ],
    qna: [
      {
        question: "식기세척기 사용 가능한가요?",
        answer: "네, 식기세척기 사용이 가능합니다. 더 오래 사용하시려면 부드러운 세척을 권장드립니다.",
        status: "답변 완료"
      },
      {
        question: "선물 포장 가능한 상품인가요?",
        answer: "네, 선물 포장 옵션 선택 시 포장 후 발송합니다.",
        status: "답변 완료"
      }
    ]
  },

  "ivy-green": {
    name: "클래식 아이비 그린 포슬린",
    enName: "Classic Ivy Green Porcelain",
    category: "BEST SELLERS",
    price: 89000,
    originalPrice: 112000,
    discount: 20,
    point: 2670,
    delivery: 3000,
    freeDeliveryLimit: 70000,
    composition: "Tea Set / Plate Set / Full Table Set",
    description: "아이비 그린 패턴이 우아하게 담긴 포슬린 테이블웨어입니다.",
    image: "./img/classic-ivy-green-porcelain-main.jpeg",
    imageFit: "contain",
    thumbs: [
      "./img/classic-ivy-green-porcelain-main.jpeg",
      "./img/classic-ivy-green-porcelain-detail-01.jpeg",
      "./img/classic-ivy-green-porcelain-detail-02.jpeg",
      "./img/classic-ivy-green-porcelain-detail-03.jpeg",
      "./img/classic-ivy-green-porcelain-main.jpeg"
    ],
    options: [
      { id: "ivy-brunch-plate-1p", name: "아이비 그린 브런치 접시 1P", price: 89000, image: "./img/classic-ivy-green-porcelain-detail-02.jpeg" },
      { id: "ivy-porcelain-bowl-1p", name: "아이비 그린 포슬린 볼 1P", price: 69000, image: "./img/classic-ivy-green-porcelain-detail-03.jpeg" },
      { id: "ivy-plate-bowl-set", name: "아이비 그린 접시 & 볼 세트", price: 128000, image: "./img/classic-ivy-green-porcelain-main.jpeg" }
    ],
    detailCuts: [
      "./img/classic-ivy-green-porcelain-main.jpeg",
      "./img/classic-ivy-green-porcelain-detail-01.jpeg",
      "./img/classic-ivy-green-porcelain-detail-02.jpeg",
      "./img/classic-ivy-green-porcelain-detail-03.jpeg",
      "./img/classic-ivy-green-porcelain-main.jpeg"
    ],
    detail: "클래식 아이비 그린 포슬린은 시간이 지나도 변치 않는 우아함을 담은 테이블웨어입니다. 아이비 패턴과 깊은 그린 톤이 차분하고 고급스러운 테이블을 완성합니다.",
    specs: [
      ["제품명", "클래식 아이비 그린 포슬린"],
      ["구성", "Tea Set / Plate Set / Full Table Set"],
      ["소재", "포슬린"],
      ["색상", "Ivory / Ivy Green"],
      ["제조국", "Korea"],
      ["주의사항", "전자레인지 사용 가능, 오븐 사용 불가"]
    ],
    reviews: defaultReviews("아이비 그린 컬러가 차분하고 고급스러워요."),
    qna: defaultQna()
  },

  "french-ribbon-hamper": {
    name: "프렌치 리본 애프터눈 티 햄퍼",
    enName: "French Ribbon Afternoon Tea Hamper",
    category: "BEST SELLERS",
    price: 128000,
    originalPrice: 158000,
    discount: 19,
    point: 3840,
    delivery: 3000,
    freeDeliveryLimit: 70000,
    composition: "Gift Hamper Basic / Premium",
    description: "리본 장식과 티웨어 구성이 함께 담긴 프리미엄 기프트 햄퍼입니다.",
    image: "./img/french-ribbon-afternoon-tea-hamper-main.jpeg",
    imageFit: "contain",
    thumbs: [
      "./img/french-ribbon-afternoon-tea-hamper-main.jpeg",
      "./img/french-ribbon-afternoon-tea-hamper-detail-01.jpeg",
      "./img/french-ribbon-afternoon-tea-hamper-detail-02.jpeg",
      "./img/french-ribbon-afternoon-tea-hamper-detail-03.jpeg"
    ],
    detailCuts: [
      "./img/french-ribbon-afternoon-tea-hamper-main.jpeg"
    ],
    options: [
      { id: "gift-hamper-basic", name: "Gift Hamper Basic", price: 128000, image: "./img/french-ribbon-afternoon-tea-hamper-main.jpeg" },
      { id: "gift-hamper-premium", name: "Gift Hamper Premium", price: 158000, image: "./img/french-ribbon-afternoon-tea-hamper-detail-03.jpeg" }
    ],
    detail: "프렌치 리본 애프터눈 티 햄퍼는 티웨어와 리본 패키지가 함께 구성된 프리미엄 선물 세트입니다. 소중한 사람에게 전하는 특별한 오후를 완성합니다.",
    specs: [
      ["제품명", "프렌치 리본 애프터눈 티 햄퍼"],
      ["구성", "Gift Hamper Basic / Gift Hamper Premium"],
      ["소재", "세라믹, 패브릭, 패키지 구성품"],
      ["색상", "Pink / Ivory"],
      ["제조국", "Korea"],
      ["주의사항", "구성품은 시즌에 따라 일부 변경될 수 있습니다."]
    ],
    reviews: defaultReviews("선물 박스가 예쁘고 구성도 알차서 만족스러워요."),
    qna: defaultQna()
  },

  "rose-heart-teacup": {
    name: "로즈 하트 티컵 세트",
    enName: "Rose Heart Teacup Set",
    category: "RECOMMEND",
    price: 37800,
    originalPrice: 42000,
    discount: 10,
    point: 1134,
    delivery: 3000,
    freeDeliveryLimit: 70000,
    composition: "티컵 세트 1P",
    description: "부드러운 핑크 톤과 하트 라인이 돋보이는 티컵 세트입니다.",
    image: "./img/set4.jpg",
    thumbs: ["./img/set4.jpg", "./img/productsub1.jpg", "./img/set1.jpg"],
    options: [{ id: "teacup-set", name: "Teacup Set", price: 37800 }],
    detail: "로즈 하트 티컵 세트는 사랑스러운 하트 디테일과 핑크 톤이 어우러진 선물용 티웨어입니다.",
    specs: [["제품명", "로즈 하트 티컵 세트"], ["구성", "티컵 세트 1P"], ["소재", "세라믹"], ["제조국", "Korea"]],
    reviews: defaultReviews("하트 디테일이 사랑스럽고 사진보다 실물이 더 예뻐요.")
  },

  "heart-cake-stand": {
    name: "하트 글라스 미니 케이크 스탠드",
    enName: "Heart Glass Mini Cake Stand",
    category: "RECOMMEND",
    price: 28800,
    originalPrice: 32000,
    discount: 10,
    point: 864,
    delivery: 3000,
    freeDeliveryLimit: 70000,
    composition: "케이크 스탠드 1P",
    description: "하트 장식의 유리 돔과 핑크 받침대가 어우러진 미니 디저트 스탠드입니다.",
    image: "./img/productsub4.jpg",
    thumbs: ["./img/productsub4.jpg", "./img/set3.jpg", "./img/productsub3.jpg"],
    options: [{ id: "mini-stand-1p", name: "Mini Stand 1P", price: 28800 }],
    detail: "작은 디저트도 특별하게 보여주는 로맨틱 미니 케이크 스탠드입니다.",
    specs: [["제품명", "하트 글라스 미니 케이크 스탠드"], ["구성", "스탠드 1P"], ["소재", "글라스, 세라믹"], ["제조국", "Korea"]],
    reviews: defaultReviews("디저트를 올려두면 테이블 분위기가 바로 달라져요.")
  },

  "pink-heart-teapot": {
    name: "핑크 하트 티포트",
    enName: "Pink Heart Teapot",
    category: "RECOMMEND",
    price: 61200,
    originalPrice: 72000,
    discount: 15,
    point: 1836,
    delivery: 3000,
    freeDeliveryLimit: 70000,
    composition: "티포트 1P",
    description: "하트 패턴과 핑크 라인이 사랑스럽게 어우러진 프리미엄 티포트입니다.",
    image: "./img/set2.jpg",
    thumbs: ["./img/set2.jpg", "./img/newmainbig.png", "./img/set1.jpg"],
    options: [{ id: "teapot-1p", name: "Teapot 1P", price: 61200 }],
    detail: "핑크 하트 티포트는 여린 오후의 차 시간을 로맨틱한 장면으로 완성하는 시그니처 아이템입니다.",
    specs: [["제품명", "핑크 하트 티포트"], ["구성", "티포트 1P"], ["소재", "세라믹"], ["제조국", "Korea"]],
    reviews: defaultReviews("색감이 부드럽고 티타임에 포인트가 되어줘요.")
  }
};

// ========================================
// Daily Ceramic 상품 데이터
// daily-ceramic.html의 16개 새 상품을 상세 페이지와 연결합니다.
// 옵션이 없는 데일리 상품은 options: []로 두고, TOTAL은 기본 판매가 1개 기준으로 계산합니다.
// ========================================
const dailySaleOverrides = {
  "daily-dog-blue-double-tray": { originalPrice: 24000, discount: 10 },
  "daily-apple-stripe-bowl-set": { originalPrice: 48000, discount: 10 },
  "daily-blueberry-stripe-bowl-set": { originalPrice: 48000, discount: 10 },
  "daily-flower-object-lamp-set": { originalPrice: 62000, discount: 10 },
  "heart-argyle-daily-mug": { originalPrice: 32000, discount: 10 }
};

[
  ["daily-dog-blue-double-tray", "핑크 도그 더블 소스볼", "Pink Dog Double Sauce Bowl", 21600, "./img/daily-pink-dog-double-sauce-bowl.png", "볼/종지"],
  ["daily-dog-blue-double-tray-front", "스카이 도그 더블 디저트 트레이", "Sky Dog Double Dessert Tray", 26000, "./img/daily-dog-blue-double-tray-front.jpeg", "볼/종지"],
  ["daily-purple-stripe-dog-plate", "퍼플 스트라이프 도그 플레이트", "Purple Stripe Dog Plate", 31000, "./img/daily-purple-stripe-dog-plate.jpeg", "접시"],
  ["daily-apple-stripe-bowl-set", "애플 스트라이프 시리얼 볼 세트", "Apple Stripe Cereal Bowl Set", 43200, "./img/daily-apple-stripe-cereal-bowl-set.png", "볼/종지"],
  ["daily-navy-dog-mug", "네이비 도그 데일리 머그", "Navy Dog Daily Mug", 28000, "./img/daily-navy-dog-mug.jpeg", "컵/머그"],
  ["daily-forest-dog-plate", "포레스트 도그 플레이트", "Forest Dog Plate", 29000, "./img/daily-forest-dog-plate.jpeg", "접시"],
  ["daily-cherry-blue-line-plate", "체리 블루 라인 플레이트", "Cherry Blue Line Plate", 32000, "./img/daily-cherry-blue-line-plate.jpeg", "접시"],
  ["daily-lucky-clover-pasta-plate", "럭키 클로버 파스타 플레이트", "Lucky Clover Pasta Plate", 33000, "./img/daily-lucky-clover-pasta-plate.jpeg", "접시"],
  ["daily-orange-stripe-dog-plate", "오렌지 스트라이프 도그 플레이트", "Orange Stripe Dog Plate", 31000, "./img/daily-orange-stripe-dog-plate.jpeg", "접시"],
  ["daily-blue-ribbon-deep-plate", "블루 리본 딥 플레이트", "Blue Ribbon Deep Plate", 27000, "./img/daily-blue-ribbon-deep-plate.jpeg", "접시"],
  ["daily-pink-dog-mug", "핑크 도그 데일리 머그", "Pink Dog Daily Mug", 28000, "./img/daily-pink-dog-mug.jpeg", "컵/머그"],
  ["daily-blueberry-stripe-bowl-set", "블루베리 스트라이프 볼 세트", "Blueberry Stripe Bowl Set", 43200, "./img/daily-blueberry-stripe-bowl-set-new.png", "볼/종지"],
  ["daily-blue-flower-ribbon-teapot", "블루 플라워 리본 티포트", "Blue Flower Ribbon Teapot", 61200, "./img/daily-blue-flower-ribbon-teapot.jpeg", "티포트"],
  ["daily-blue-ribbon-teacup-set", "블루 리본 티컵 세트", "Blue Ribbon Teacup Set", 37800, "./img/daily-blue-ribbon-teacup-set.jpeg", "컵/머그"],
  ["daily-flower-object-lamp-set", "플라워 오브제 미니 램프 세트", "Flower Object Mini Lamp Set", 55800, "./img/daily-flower-object-mini-lamp-set.png", "오브제"],
  ["heart-argyle-daily-mug", "하트 아가일 데일리 머그", "Heart Argyle Daily Mug", 28800, "./img/heart-argyle-daily-mug-main.jpeg", "컵/머그"]
].forEach(([id, name, enName, price, image, composition]) => {
  const saleOverride = dailySaleOverrides[id] || {};
  productData[id] = {
    id,
    name,
    enName,
    category: "DAILY CERAMIC",
    price,
    originalPrice: saleOverride.originalPrice || price,
    discount: saleOverride.discount || 0,
    point: Math.floor(price * 0.03),
    delivery: 3000,
    freeDeliveryLimit: 70000,
    description: `${name}은 일상 테이블에 산뜻한 포인트를 더하는 Aurelia Muse 데일리 세라믹입니다.`,
    image,
    imageFit: "contain",
    thumbs: [image],
    detailCuts: [image],
    options: [],
    composition: "1P",
    detail: `${name}은 부드러운 색감과 사랑스러운 패턴이 어우러져 매일의 식탁을 조금 더 특별하게 완성합니다.`,
    specs: [
      ["제품명", name],
      ["구성", "1P"],
      ["제품군", composition],
      ["소재", "세라믹"],
      ["제조국", "Korea"],
      ["주의사항", "전자레인지 사용 가능, 식기세척기 사용 가능, 오븐 사용 불가"]
    ],
    reviews: defaultReviews("색감과 패턴이 사랑스러워서 매일 쓰기 좋아요."),
    qna: defaultQna()
  };
});

productData["daily-heart-argyle-mug"] = productData["heart-argyle-daily-mug"];

const artisanProducts = [
  {
    id: "french-classic-ribbon-tea-set",
    name: "프렌치 클래식 리본 티 세트",
    enName: "French Classic Ribbon Tea Set",
    composition: "티 세트",
    price: 128000,
    originalPrice: 158000,
    discount: 19,
    image: "./img/artisan-french-classic-ribbon-tea-set.jpeg",
    detailCuts: ["./img/artisan-french-classic-ribbon-tea-set.jpeg", "./img/artisan-ribbon-dessert-plate.jpeg"],
    recommendOrder: 1,
    newOrder: 9,
    salesCount: 92
  },
  {
    id: "gold-french-classic-ribbon-tea-set",
    name: "블루 리본 클래식 티포트",
    enName: "Blue Ribbon Classic Teapot",
    composition: "티포트",
    price: 62100,
    originalPrice: 69000,
    discount: 10,
    image: "./img/artisan-blue-ribbon-teapot.jpg",
    detailCuts: ["./img/artisan-blue-ribbon-teapot.jpg"],
    recommendOrder: 2,
    newOrder: 8,
    salesCount: 84
  },
  {
    id: "royal-blue-romantic-ribbon-tea-set",
    name: "블루 리본 티 타임 세트",
    enName: "Blue Ribbon Tea Time Set",
    composition: "티 세트",
    price: 116100,
    originalPrice: 129000,
    discount: 10,
    image: "./img/artisan-blue-ribbon-tea-set.jpg",
    detailCuts: ["./img/artisan-blue-ribbon-tea-set.jpg"],
    recommendOrder: 3,
    newOrder: 7,
    salesCount: 88
  },
  {
    id: "sweet-pink-romantic-ribbon-tea-set",
    name: "골드 리본 티타임 세트",
    enName: "골드 리본 티타임 세트",
    composition: "티팟, 컵 앤 소서, 플레이트",
    price: 108800,
    originalPrice: 128000,
    discount: 15,
    image: "./images/best-gold-ribbon-teatime-set.jpg",
    detailCuts: ["./images/best-gold-ribbon-teatime-set.jpg"],
    description: "부드러운 아이보리 톤 위에 골드 라인과 리본 장식이 더해진 티타임 세트입니다.",
    detail: "부드러운 아이보리 톤 위에 골드 라인과 리본 장식이 더해진 티타임 세트입니다. 티팟, 컵 앤 소서, 플레이트가 함께 어우러져 로맨틱한 테이블 분위기를 완성합니다.",
    recommendOrder: 4,
    newOrder: 6,
    salesCount: 86
  },
  {
    id: "royal-blue-ribbon-teapot",
    name: "로열 블루 리본 티팟",
    enName: "Royal Blue Ribbon Teapot",
    composition: "티팟",
    price: 69000,
    originalPrice: 86000,
    discount: 20,
    image: "./img/artisan-royal-blue-ribbon-teapot.jpeg",
    detailCuts: ["./img/artisan-royal-blue-ribbon-teapot.jpeg", "./img/artisan-royal-blue-ribbon-teapot-detail.jpeg"],
    recommendOrder: 5,
    newOrder: 5,
    salesCount: 74
  },
  {
    id: "sweet-pink-ribbon-teapot",
    name: "스윗 핑크 리본 티팟",
    enName: "Sweet Pink Ribbon Teapot",
    composition: "티팟",
    price: 69000,
    originalPrice: 86000,
    discount: 20,
    image: "./img/artisan-sweet-pink-ribbon-teapot.jpeg",
    detailCuts: ["./img/artisan-sweet-pink-ribbon-teapot.jpeg"],
    recommendOrder: 6,
    newOrder: 4,
    salesCount: 71
  },
  {
    id: "royal-blue-ribbon-cup-set",
    name: "로열 블루 리본 컵 세트",
    enName: "Royal Blue Ribbon Cup Set",
    composition: "컵 / 머그",
    price: 42000,
    originalPrice: 52000,
    discount: 19,
    image: "./img/artisan-royal-blue-ribbon-cup-set.jpeg",
    detailCuts: ["./img/artisan-royal-blue-ribbon-cup-set.jpeg"],
    recommendOrder: 7,
    newOrder: 3,
    salesCount: 95
  },
  {
    id: "sweet-pink-ribbon-cup-set",
    name: "스윗 핑크 리본 컵 세트",
    enName: "Sweet Pink Ribbon Cup Set",
    composition: "컵 / 머그",
    price: 42000,
    originalPrice: 52000,
    discount: 19,
    image: "./img/artisan-sweet-pink-ribbon-cup-set.jpeg",
    detailCuts: ["./img/artisan-sweet-pink-ribbon-cup-set.jpeg", "./img/artisan-sweet-pink-ribbon-cup-set-detail.jpeg"],
    recommendOrder: 8,
    newOrder: 2,
    salesCount: 90
  },
  {
    id: "ribbon-dessert-plate",
    name: "프렌치 리본 디저트 플레이트",
    enName: "French Ribbon Dessert Plate",
    composition: "접시",
    price: 36000,
    originalPrice: 45000,
    discount: 20,
    image: "./img/artisan-ribbon-dessert-plate.jpeg",
    detailCuts: ["./img/artisan-ribbon-dessert-plate.jpeg", "./img/artisan-royal-blue-ribbon-dessert-plate-detail.jpeg", "./img/artisan-sweet-pink-ribbon-dessert-plate-detail.jpeg"],
    recommendOrder: 9,
    newOrder: 1,
    salesCount: 78
  },
  {
    id: "pink-bunny-floral-cup-saucer",
    name: "핑크 버니 플로럴 컵앤소서",
    enName: "핑크 버니 플로럴 컵앤소서",
    composition: "컵앤소서",
    price: 43200,
    originalPrice: 48000,
    discount: 10,
    image: "./img/artisan-pink-bunny-floral-cup-saucer.jpg",
    detailCuts: ["./img/artisan-pink-bunny-floral-cup-saucer.jpg"],
    description: "핑크 플라워 패턴과 골드 포인트, 토끼 오브제 뚜껑이 어우러진 로맨틱 무드의 컵앤소서입니다.",
    detail: "핑크 플라워 패턴과 골드 포인트, 토끼 오브제 뚜껑이 어우러진 로맨틱 무드의 컵앤소서입니다.",
    recommendOrder: 16,
    newOrder: 11,
    salesCount: 64
  },
  {
    id: "gold-ribbon-teatime-set",
    name: "골드 리본 티타임 세트",
    enName: "골드 리본 티타임 세트",
    composition: "티타임 세트",
    price: 64600,
    originalPrice: 76000,
    discount: 15,
    image: "./img/artisan-gold-ribbon-teatime-set.jpg",
    detailCuts: ["./img/artisan-gold-ribbon-teatime-set.jpg"],
    description: "부드러운 아이보리 컬러와 골드 리본 장식이 돋보이는 클래식한 티타임 세트입니다.",
    detail: "부드러운 아이보리 컬러와 골드 리본 장식이 돋보이는 클래식한 티타임 세트입니다.",
    recommendOrder: 13,
    newOrder: 12,
    salesCount: 70
  },
  {
    id: "blue-ribbon-dessert-plate",
    name: "블루 리본 디저트 플레이트 세트",
    enName: "블루 리본 디저트 플레이트 세트",
    composition: "디저트 플레이트",
    price: 37800,
    originalPrice: 42000,
    discount: 10,
    image: "./img/artisan-blue-ribbon-dessert-plate-set.jpg",
    detailCuts: ["./img/artisan-blue-ribbon-dessert-plate-set.jpg"],
    description: "블루 리본 패턴과 골드 라인이 조화를 이루는 우아한 디저트 플레이트 세트입니다.",
    detail: "블루 리본 패턴과 골드 라인이 조화를 이루는 우아한 디저트 플레이트 세트입니다.",
    recommendOrder: 6,
    newOrder: 13,
    salesCount: 84
  },
  {
    id: "blue-ribbon-teacup-saucer",
    name: "블루 리본 티컵앤소서",
    enName: "블루 리본 티컵앤소서",
    composition: "컵앤소서",
    price: 35700,
    originalPrice: 42000,
    discount: 15,
    image: "./img/artisan-blue-ribbon-teacup-saucer.jpg",
    detailCuts: ["./img/artisan-blue-ribbon-teacup-saucer.jpg"],
    description: "은은한 아이보리 도자기에 블루 리본 패턴과 골드 라인이 더해진 로맨틱 티컵앤소서입니다.",
    detail: "은은한 아이보리 도자기에 블루 리본 패턴과 골드 라인이 더해진 로맨틱 티컵앤소서입니다.",
    recommendOrder: 6.5,
    newOrder: 14,
    salesCount: 85
  }
];

artisanProducts.forEach((product) => {
  productData[product.id] = {
    id: product.id,
    name: product.name,
    enName: product.enName,
    category: "ARTISAN EDITION",
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    recommendOrder: product.recommendOrder,
    newOrder: product.newOrder,
    salesCount: product.salesCount,
    point: Math.floor(product.price * 0.03),
    delivery: 3000,
    freeDeliveryLimit: 70000,
    composition: product.composition,
    description: product.description || `${product.name}는 섬세한 리본 드로잉과 은은한 골드 라인이 어우러진 아르티장 에디션입니다.`,
    image: product.image,
    imageFit: "contain",
    thumbs: [product.image, ...product.detailCuts.filter((src) => src !== product.image)],
    detailCuts: product.detailCuts,
    options: [{ id: "default", name: "기본 구성", price: product.price, image: product.image }],
    detail: product.detail || `${product.name}는 우아한 리본 모티프와 포슬린의 맑은 질감을 살려 특별한 티타임과 선물용 테이블에 잘 어울립니다.`,
    specs: [
      ["제품명", product.name],
      ["구성", product.composition],
      ["제품군", "Artisan Edition"],
      ["소재", "포슬린"],
      ["제조국", "Korea"],
      ["주의사항", "전자레인지 사용 가능, 식기세척기 사용 가능, 오븐 사용 불가"]
    ],
    reviews: defaultReviews("리본 디테일이 섬세하고 실제 색감이 고급스러워요."),
    qna: defaultQna()
  };
});

function defaultReviews(firstContent) {
  return [
    { writer: "muse***", date: "2026.06.12", rating: 5, content: firstContent },
    { writer: "aurelia***", date: "2026.06.15", rating: 5, content: "포장도 예쁘고 선물용으로도 만족스러워요." },
    { writer: "tea***", date: "2026.06.18", rating: 5, content: "마감이 깔끔하고 매일 사용하고 싶은 제품입니다." }
  ];
}

function defaultQna() {
  return [
    { question: "배송 기간이 얼마나 걸리나요?", answer: "", status: "답변 대기" },
    { question: "선물 포장 가능한가요?", answer: "", status: "답변 완료" }
  ];
}

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const formatWon = (value) => `${Number(value || 0).toLocaleString("ko-KR")}원`;
  const defaultId = "cream-bowl";

  let currentId = getCurrentId();
  let currentProduct = productData[currentId] || productData[defaultId];
  let currentSlideIndex = 0;
  let currentImages = [];

  // ========================================
  // 선택 옵션 배열
  // 옵션을 선택할 때마다 이 배열에 { id, name, price, qty } 형태로 저장합니다.
  // 같은 옵션을 다시 선택하면 새 줄을 만들지 않고 qty만 1 증가합니다.
  // ========================================
  let selectedOptions = [];

  const elements = {
    mainImage: $("#mainProductImage"),
    mainImageBox: $("#mainImageBox"),
    thumbs: $(".product-thumbs"),
    slideProgressBar: $(".product-slide-progress-bar"),
    category: $("#productCategory"),
    name: $("#productName"),
    enName: $("#productEnName"),
    description: $("#productDescription"),
    salePrice: $("#salePrice"),
    originalPrice: $("#originalPrice"),
    discountRate: $("#discountRate"),
    pointText: $("#pointText"),
    deliveryText: $("#deliveryText"),
    compositionText: $("#compositionText"),
    optionArea: $(".product-option-area"),
    option: $("#productOption"),
    optionProductList: $("#optionProductList"),
    selectedOptions: $("#selectedOptions"),
    legacySelectedProduct: $("#selectedProduct"),
    selectedProductName: $("#selectedProductName"),
    selectedOptionText: $("#selectedOptionText"),
    quantityInput: $("#productQuantity"),
    totalPrice: $("#totalPrice"),
    totalQuantity: $("#totalQuantity"),
    shippingMessage: $("#shippingMessage"),
    shippingPercent: $("#shippingPercent"),
    shippingBar: $("#shippingBar"),
    detailTitle: $("#detailTitle"),
    detailBody: $("#detailBody"),
    detailImageStack: $("#detailImageStack"),
    productSpec: $("#productSpec"),
    reviewTabCount: $(".detail-tabs [data-tab='review'] span"),
    reviewSummaryText: $(".review-summary p"),
    reviewList: $(".review-list"),
    qnaList: $(".qna-list"),
    modal: $("#productModal"),
    modalMessage: $("#productModalMessage")
  };

  function getCurrentId() {
    return (window.location.hash || `#${defaultId}`).replace("#", "") || defaultId;
  }

  function openModal(message) {
    elements.modalMessage.textContent = message;
    elements.modal.hidden = false;
    document.body.classList.add("is-modal-open");
  }

  function closeModal() {
    elements.modal.hidden = true;
    document.body.classList.remove("is-modal-open");
  }

  function normalizeOptions(options) {
    return (options || []).map((option, index) => {
      if (typeof option === "string") {
        return {
          id: option.toLowerCase().replace(/[^a-z0-9가-힣]+/gi, "-").replace(/^-|-$/g, "") || `option-${index + 1}`,
          name: option,
          price: Number(currentProduct.price || 0),
          image: currentProduct.image
        };
      }
      return {
        id: option.id,
        name: option.name,
        price: Number(option.price || currentProduct.price || 0),
        image: option.image || currentProduct.image
      };
    });
  }

  function imageFallback(img) {
    img.addEventListener("error", () => {
      img.hidden = true;
      img.parentElement.classList.add("is-placeholder");
    }, { once: true });
  }

  function renderProduct() {
    currentId = getCurrentId();
    currentProduct = productData[currentId] || productData[defaultId];
    selectedOptions = [];
    document.body.classList.toggle("is-daily-detail", currentProduct.category === "DAILY CERAMIC");

    document.title = `${currentProduct.name} | Aurelia Muse`;
    elements.category.textContent = currentProduct.category || "AURELIA MUSE";
    elements.name.textContent = currentProduct.name;
    elements.enName.textContent = currentProduct.enName;
    elements.description.textContent = currentProduct.description;
    elements.salePrice.textContent = formatWon(currentProduct.price);
    elements.originalPrice.textContent = formatWon(currentProduct.originalPrice);
    const discountRate = getDiscountRate(currentProduct.originalPrice, currentProduct.price);
    elements.discountRate.textContent = discountRate > 0 ? `${discountRate}% 할인` : "0%";
    elements.pointText.textContent = `${formatWon(currentProduct.point)} (3%)`;
    elements.deliveryText.textContent = `${formatWon(currentProduct.delivery)} / ${formatWon(currentProduct.freeDeliveryLimit)} 이상 구매 시 무료배송`;
    elements.compositionText.textContent = currentProduct.composition;
    elements.detailTitle.textContent = currentProduct.enName;
    elements.detailBody.textContent = currentProduct.detail;

    renderThumbs();
    renderOptionSelect();
    renderSelectedOptions();
    renderDetailContent();
    renderReviews();
    renderQna();
    updateTotalPrice();
    updateWishState();
  }

  function getDiscountRate(originalPrice, salePrice) {
    const original = Number(originalPrice || 0);
    const sale = Number(salePrice || 0);
    if (!original || !sale || original <= sale) return 0;
    return Math.round(((original - sale) / original) * 100);
  }

  function renderThumbs() {
    elements.thumbs.innerHTML = "";
    currentImages = Array.isArray(currentProduct.thumbs) && currentProduct.thumbs.length
      ? currentProduct.thumbs
      : [currentProduct.image];
    currentSlideIndex = 0;
    elements.mainImageBox.classList.toggle("is-contain", currentProduct.imageFit === "contain");

    currentImages.forEach((src, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = index === 0 ? "product-thumb is-active" : "product-thumb";
      button.dataset.index = String(index);
      button.setAttribute("aria-label", `${currentProduct.name} 이미지 ${index + 1} 보기`);
      button.innerHTML = `<img src="${src}" alt="">`;
      imageFallback(button.querySelector("img"));
      elements.thumbs.appendChild(button);
    });
    updateMainSlide(0);
  }

  // ========================================
  // 이미지 슬라이더
  // 왼쪽 썸네일, 이전/다음 버튼, 하단 진행바를 같은 인덱스로 연결합니다.
  // currentProduct.thumbs 배열만 바꾸면 갤러리 이미지가 자동으로 바뀝니다.
  // ========================================
  function updateMainSlide(index) {
    if (!currentImages.length) return;
    currentSlideIndex = (index + currentImages.length) % currentImages.length;

    elements.mainImage.hidden = false;
    elements.mainImageBox.classList.remove("is-placeholder");
    elements.mainImage.src = currentImages[currentSlideIndex];
    elements.mainImage.alt = `${currentProduct.name} 이미지 ${currentSlideIndex + 1}`;
    imageFallback(elements.mainImage);

    elements.thumbs.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === currentSlideIndex);
      button.classList.toggle("active", buttonIndex === currentSlideIndex);
    });

    if (elements.slideProgressBar) {
      const percent = ((currentSlideIndex + 1) / currentImages.length) * 100;
      elements.slideProgressBar.style.width = `${percent}%`;
    }
  }

  function renderOptionSelect() {
    const options = normalizeOptions(currentProduct.options);
    const hasOptions = options.length > 0;
    elements.optionArea.hidden = !hasOptions;

    if (!hasOptions) {
      selectedOptions = [{
        id: "default",
        name: "",
        price: Number(currentProduct.price || 0),
        qty: 1,
        image: currentProduct.image,
        isDefault: true
      }];
      elements.option.innerHTML = "";
      if (elements.optionProductList) elements.optionProductList.innerHTML = "";
      return;
    }

    elements.option.innerHTML = `<option value="">옵션을 선택해 주세요</option>`;
    options.forEach((option) => {
      const item = document.createElement("option");
      item.value = option.id;
      item.dataset.price = String(option.price);
      item.textContent = `${option.name} - ${formatWon(option.price)}`;
      elements.option.appendChild(item);
    });
    elements.option.value = "";

    if (elements.optionProductList) {
      elements.optionProductList.innerHTML = options.map((option) => `
        <article class="option-product-card" data-option-id="${option.id}">
          <div class="option-product-thumb">
            <img src="${option.image}" alt="${option.name}">
          </div>
          <div class="option-product-info">
            <strong>${option.name}</strong>
            <span>${formatWon(option.price)}</span>
          </div>
          <div class="option-qty-control" data-option-id="${option.id}" aria-label="${option.name} 수량 선택">
            <button type="button" class="option-card-minus" data-option-action="minus" aria-label="${option.name} 수량 줄이기">-</button>
            <input type="number" value="${getOptionQty(option.id)}" min="0" readonly aria-label="${option.name} 선택 수량">
            <button type="button" class="option-card-plus" data-option-action="plus" aria-label="${option.name} 수량 늘리기">+</button>
          </div>
        </article>
      `).join("");
      elements.optionProductList.querySelectorAll("img").forEach(imageFallback);
    }
  }

  function renderDetailContent() {
    document.querySelector(".product-main-detail-image")?.remove();

    if (currentProduct.mainDetailImage) {
      const mainDetail = document.createElement("div");
      mainDetail.className = "product-main-detail-image royal-blue-main-detail";
      mainDetail.innerHTML = `
        <img src="${currentProduct.mainDetailImage}" alt="${currentProduct.enName} main detail image">
      `;
      elements.detailBody.insertAdjacentElement("afterend", mainDetail);
      imageFallback(mainDetail.querySelector("img"));
    }

    const detailCutImages = Array.isArray(currentProduct.detailCuts)
      ? currentProduct.detailCuts
      : currentProduct.thumbs.slice(0, 3);

    elements.detailImageStack.innerHTML = detailCutImages.map((src, index) => (
      `<img src="${src}" alt="${currentProduct.name} 상세 이미지 ${index + 1}">`
    )).join("");
    elements.detailImageStack.hidden = detailCutImages.length === 0;
    elements.detailImageStack.querySelectorAll("img").forEach(imageFallback);

    elements.productSpec.innerHTML = currentProduct.specs.map(([term, desc]) => (
      `<div><dt>${term}</dt><dd>${desc}</dd></div>`
    )).join("");
  }

  // ========================================
  // 리뷰 렌더링
  // 각 상품의 reviews 배열 3개만 화면에 표시하고, 탭 숫자도 3으로 맞춥니다.
  // ========================================
  function renderReviews() {
    const reviews = currentProduct.reviews || [];
    elements.reviewTabCount.textContent = String(reviews.length);
    elements.reviewSummaryText.textContent = `${reviews.length}개의 리뷰`;
    elements.reviewList.innerHTML = reviews.map((review) => `
      <article>
        <div>
          <strong>${"★".repeat(review.rating || 5)}</strong>
          <span>${review.writer} · ${review.date}</span>
        </div>
        <p>${review.content}</p>
      </article>
    `).join("");
  }

  function renderQna() {
    const qna = currentProduct.qna || defaultQna();
    elements.qnaList.innerHTML = qna.map((item) => `
      <article>
        <span>${item.answer ? "답변" : "비밀글"}</span>
        <strong>
          Q. ${item.question}
          ${item.answer ? `<small>A. ${item.answer}</small>` : ""}
        </strong>
        <em class="${item.status === "답변 완료" ? "is-complete" : ""}">${item.status}</em>
      </article>
    `).join("");
  }

  // ========================================
  // 옵션 선택 기능
  // 다른 옵션을 선택하면 새 줄로 추가됩니다.
  // 이미 선택한 옵션을 다시 선택하면 새 줄을 만들지 않고 수량만 증가합니다.
  // ========================================
  function getOptionQty(optionId) {
    const selected = selectedOptions.find((item) => item.id === optionId);
    return selected ? Number(selected.qty || 0) : 0;
  }

  function syncOptionCardQty(optionId) {
    if (!elements.optionProductList) return;
    const control = elements.optionProductList.querySelector(`.option-qty-control[data-option-id="${optionId}"]`);
    const input = control?.querySelector("input");
    if (input) input.value = String(getOptionQty(optionId));
  }

  function addSelectedOption(optionId) {
    changeOptionQty(optionId, 1);
  }

  function renderSelectedOptions() {
    const hasOptions = normalizeOptions(currentProduct.options).length > 0;

    if (!hasOptions) {
      // 옵션이 없는 상품은 이름 없는 선택 상품 박스를 만들지 않습니다.
      // TOTAL은 selectedOptions의 기본 상품 데이터로만 계산합니다.
      elements.legacySelectedProduct.hidden = true;
      elements.selectedOptions.innerHTML = "";
      elements.selectedOptions.hidden = true;
      return;
    }

    elements.legacySelectedProduct.hidden = true;

    if (!selectedOptions.length) {
      elements.selectedOptions.innerHTML = "";
      elements.selectedOptions.hidden = true;
      return;
    }

    elements.selectedOptions.hidden = false;
    elements.selectedOptions.innerHTML = selectedOptions.map((option) => `
      <div class="selected-option-thumb" data-option-id="${option.id}" title="${option.name}">
        <img src="${option.image || currentProduct.image}" alt="${option.name}">
        <span class="selected-option-count">${option.qty}</span>
      </div>
    `).join("");
    elements.selectedOptions.querySelectorAll("img").forEach(imageFallback);
    return;

    elements.selectedOptions.hidden = false;
    elements.selectedOptions.innerHTML = selectedOptions.map((option) => `
      <div class="selected-option-row" data-option-id="${option.id}">
        <div class="selected-option-thumb">
          <img src="${option.image || currentProduct.image}" alt="${option.name}">
        </div>
        <div class="selected-option-qty">
          <button type="button" class="option-minus" aria-label="${option.name} 수량 줄이기">−</button>
          <input type="number" value="${option.qty}" min="1" readonly aria-label="${option.name} 수량">
          <button type="button" class="option-plus" aria-label="${option.name} 수량 늘리기">+</button>
        </div>
        <button type="button" class="option-remove delete-option-btn">삭제</button>
      </div>
    `).join("");
    elements.selectedOptions.querySelectorAll("img").forEach(imageFallback);
  }

  function changeOptionQty(optionId, diff) {
    const option = normalizeOptions(currentProduct.options).find((item) => item.id === optionId);
    if (!option) return;

    const nextQty = Math.max(0, getOptionQty(optionId) + diff);
    const same = selectedOptions.find((item) => item.id === option.id);

    if (nextQty === 0) {
      selectedOptions = selectedOptions.filter((item) => item.id !== optionId);
    } else if (same) {
      same.qty = nextQty;
    } else {
      selectedOptions.push({ ...option, qty: nextQty });
    }

    renderSelectedOptions();
    updateTotalPrice();
    syncOptionCardQty(optionId);
  }

  function changeDefaultQty(diff) {
    if (normalizeOptions(currentProduct.options).length > 0) return;
    const option = selectedOptions[0];
    if (!option) return;
    option.qty = Math.max(1, option.qty + diff);
    renderSelectedOptions();
    updateTotalPrice();
  }

  function removeSelectedOption(optionId) {
    selectedOptions = selectedOptions.filter((item) => item.id !== optionId);
    renderSelectedOptions();
    updateTotalPrice();
    syncOptionCardQty(optionId);
  }

  // ========================================
  // TOTAL 계산
  // 선택된 모든 옵션의 가격 * 수량을 더해서 총 금액을 표시합니다.
  // 무료배송 안내도 TOTAL 금액 기준으로 함께 업데이트합니다.
  // ========================================
  function getSelectedTotal() {
    return selectedOptions.reduce((sum, option) => sum + option.price * option.qty, 0);
  }

  function getSelectedQty() {
    return selectedOptions.reduce((sum, option) => sum + option.qty, 0);
  }

  function updateTotalPrice() {
    const total = getSelectedTotal();
    const qty = getSelectedQty();
    const freeLimit = currentProduct.freeDeliveryLimit;
    const remaining = Math.max(0, freeLimit - total);
    const percent = total > 0 ? Math.min(100, Math.round((total / freeLimit) * 100)) : 0;

    elements.totalPrice.textContent = formatWon(total);
    elements.totalQuantity.textContent = `(${qty}개)`;
    elements.shippingBar.style.width = `${percent}%`;
    elements.shippingPercent.textContent = `${percent}%`;
    elements.shippingMessage.textContent = total === 0
      ? "옵션을 선택하면 무료배송까지 남은 금액이 계산됩니다."
      : remaining > 0
        ? `${formatWon(remaining)} 더 구매하면 무료배송!`
        : "무료배송 조건을 달성했어요.";
  }

  function requireOption(callback) {
    const hasOptions = normalizeOptions(currentProduct.options).length > 0;
    if (hasOptions && getSelectedQty() === 0) {
      openModal("옵션 수량을 선택해 주세요.");
      return;
    }
    callback();
  }

  function buildOrderItems() {
    return selectedOptions.filter((option) => Number(option.qty || 0) > 0).map((option) => ({
      id: currentId,
      name: currentProduct.name,
      option: option.name,
      optionId: option.id,
      price: option.price,
      qty: option.qty,
      image: option.image || currentProduct.image
    }));
  }

  function buildWishItem() {
    return {
      id: currentId,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image
    };
  }

  function getWishItems() {
    const safeRead = (key) => {
      try {
        const parsed = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    };
    const merged = [...safeRead("aureliaWish"), ...safeRead("aureliaWishlist")];
    const seen = new Set();
    const unique = merged.filter((item) => {
      if (!item?.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
    localStorage.setItem("aureliaWish", JSON.stringify(unique));
    localStorage.removeItem("aureliaWishlist");
    return unique;
  }

  function updateWishState() {
    const wish = getWishItems();
    const active = wish.some((item) => item.id === currentId);
    const button = $(".btn-wish");
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
    button.textContent = active ? "♥" : "♡";
  }

  elements.thumbs.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    updateMainSlide(Number(button.dataset.index || 0));
  });

  document.querySelector(".product-slide-prev")?.addEventListener("click", () => {
    updateMainSlide(currentSlideIndex - 1);
  });

  document.querySelector(".product-slide-next")?.addEventListener("click", () => {
    updateMainSlide(currentSlideIndex + 1);
  });

  elements.option.addEventListener("change", () => {
    if (!elements.option.value) return;
    addSelectedOption(elements.option.value);
    elements.option.value = "";
  });

  elements.optionProductList?.addEventListener("click", (event) => {
    const qtyButton = event.target.closest("[data-option-action]");
    if (!qtyButton) return;

    const control = qtyButton.closest(".option-qty-control");
    if (!control) return;

    changeOptionQty(control.dataset.optionId, qtyButton.dataset.optionAction === "plus" ? 1 : -1);
  });

  elements.selectedOptions.addEventListener("click", (event) => {
    const row = event.target.closest(".selected-option-row");
    if (!row) return;
    const optionId = row.dataset.optionId;

    if (event.target.closest(".option-minus")) changeOptionQty(optionId, -1);
    if (event.target.closest(".option-plus")) changeOptionQty(optionId, 1);
    if (event.target.closest(".option-remove")) removeSelectedOption(optionId);
  });

  $(".qty-minus").addEventListener("click", () => changeDefaultQty(-1));
  $(".qty-plus").addEventListener("click", () => changeDefaultQty(1));

  // ========================================
  // 장바구니 저장
  // 선택된 옵션이 여러 개이면 옵션별로 장바구니 줄상품을 각각 저장합니다.
  // cart.js는 같은 상품 + 같은 옵션이면 수량을 자동으로 합쳐줍니다.
  // ========================================
  $(".btn-cart")?.addEventListener("click", () => requireOption(() => {
    buildOrderItems().forEach((item) => window.AureliaCart?.addItem(item));
    openModal("장바구니에 담았습니다.");
  }));

  $(".btn-buy")?.addEventListener("click", () => requireOption(() => {
    localStorage.setItem("aureliaOrder", JSON.stringify({ items: buildOrderItems(), source: "direct" }));
    window.location.href = "./order.html";
  }));

  $(".btn-naver-pay")?.addEventListener("click", () => requireOption(() => {
    localStorage.setItem("aureliaOrder", JSON.stringify({
      items: buildOrderItems(),
      source: "naverpay"
    }));
    window.location.href = "./order.html?pay=naver";
  }));

  $(".btn-gift")?.addEventListener("click", () => requireOption(() => {
    openModal("선물하기는 포트폴리오용 UI입니다. 실제 주문은 진행되지 않습니다.");
  }));

  $(".btn-wish")?.addEventListener("click", () => {
    const wish = getWishItems();
    if (!wish.some((item) => item.id === currentId)) {
      wish.push(buildWishItem());
      localStorage.setItem("aureliaWish", JSON.stringify(wish));
      window.AureliaCart?.updateCounts();
      updateWishState();
      openModal("관심상품에 추가되었습니다.");
      return;
    }
    openModal("이미 관심상품에 담겨 있습니다.");
  });

  document.querySelectorAll("[data-modal-message]").forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.modalMessage));
  });

  document.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.modal.hidden) closeModal();
  });

  const tabs = [...document.querySelectorAll(".detail-tabs button")];
  const panels = [...document.querySelectorAll(".detail-tab-panel")];
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        const active = panel.dataset.panel === tab.dataset.tab;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });

  window.addEventListener("hashchange", renderProduct);
  renderProduct();
});
