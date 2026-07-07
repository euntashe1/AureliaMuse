/* =========================================================
   브랜드 스토리 스크롤 등장 효과
   - 화면 아래에 있던 콘텐츠가 보이는 위치로 들어오면 is-visible
     클래스를 붙여 부드럽게 위로 나타나도록 합니다.
   - IntersectionObserver를 지원하지 않는 오래된 브라우저에서는
     모든 내용을 바로 보여주어 글이 숨겨지지 않게 처리합니다.
========================================================= */
const brandFadeItems = document.querySelectorAll(".fade-up, .reveal-text, .reveal-photo, .reveal-number");

if ("IntersectionObserver" in window) {
  const brandFadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px"
    }
  );

  brandFadeItems.forEach((item) => brandFadeObserver.observe(item));
} else {
  brandFadeItems.forEach((item) => item.classList.add("is-visible"));
}
