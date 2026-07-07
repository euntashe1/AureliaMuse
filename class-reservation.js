(function () {
  const courseButtons = Array.from(document.querySelectorAll(".course-option"));
  const summaryCourse = document.getElementById("summary-course");
  const summaryPeople = document.getElementById("summary-people");
  const summaryPrice = document.getElementById("summary-price");
  const peopleMinus = document.getElementById("people-minus");
  const peoplePlus = document.getElementById("people-plus");
  const form = document.getElementById("class-reservation-form");
  const revealItems = Array.from(document.querySelectorAll(".reveal-soft"));

  let selectedCourse = courseButtons.find((button) => button.classList.contains("is-selected")) || courseButtons[0];
  let people = 1;

  if (revealItems.length) {
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("is-visible", entry.isIntersecting);
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -36px"
        }
      );

      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }
  }

  const formatWon = (value) => `${Math.round(value).toLocaleString("ko-KR")}원`;

  const updateSummary = () => {
    const courseName = selectedCourse?.dataset.name || "원데이 클래식 코스";
    const coursePrice = Number(selectedCourse?.dataset.price || 50000);
    if (summaryCourse) summaryCourse.textContent = courseName;
    if (summaryPeople) summaryPeople.textContent = `${people}명`;
    if (summaryPrice) summaryPrice.textContent = formatWon(coursePrice * people);
  };

  courseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      courseButtons.forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      selectedCourse = button;
      updateSummary();
    });
  });

  peopleMinus?.addEventListener("click", () => {
    people = Math.max(1, people - 1);
    updateSummary();
  });

  peoplePlus?.addEventListener("click", () => {
    people = Math.min(6, people + 1);
    updateSummary();
  });

  const dateButton = document.getElementById("class-date-trigger");
  const dateInput = document.getElementById("class-date");
  const calendar = document.getElementById("class-calendar");
  const calendarTitle = document.getElementById("class-calendar-title");
  const calendarGrid = document.getElementById("class-calendar-grid");
  const calendarPrev = document.getElementById("class-calendar-prev");
  const calendarNext = document.getElementById("class-calendar-next");

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
      blank.setAttribute("aria-hidden", "true");
      calendarGrid.appendChild(blank);
    }

    for (let day = 1; day <= lastDate; day += 1) {
      const date = new Date(viewYear, viewMonth, day);
      const button = document.createElement("button");
      button.type = "button";
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

  const followCard = document.querySelector(".class-follow-card");
  if (followCard) {
    followCard.addEventListener("mousemove", (event) => {
      if (window.matchMedia("(max-width: 980px)").matches) return;
      const rect = followCard.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const followX = Math.max(-8, Math.min(8, (x - centerX) / 28));
      const followY = Math.max(-10, Math.min(6, (y - centerY) / 30));
      followCard.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      followCard.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
      followCard.style.setProperty("--follow-x", `${followX}px`);
      followCard.style.setProperty("--follow-y", `${followY}px`);
      followCard.classList.add("is-following");
    });

    followCard.addEventListener("mouseleave", () => {
      followCard.style.setProperty("--follow-x", "0px");
      followCard.style.setProperty("--follow-y", "0px");
      followCard.classList.remove("is-following");
    });
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = form.querySelectorAll("input[required], select[required]");
    const hasEmpty = Array.from(requiredFields).some((field) => !field.value.trim());

    if (hasEmpty) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    alert("클래스 신청이 접수되었습니다. 담당자가 확인 후 안내드리겠습니다.");
    form.reset();
    if (dateButton) dateButton.textContent = "예약일 선택";
    if (dateInput) dateInput.value = "";
    selectedDate = null;
    people = 1;
    updateSummary();
    renderCalendar();
  });

  updateSummary();
})();
