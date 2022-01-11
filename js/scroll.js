const helper = {
  getDelta(event) {
    if (event.wheelDelta) {
      return event.wheelDelta;
    } else {
      return -event.detail;
    }
  },
  throttle(method, delay, context) {
    let inThrottle = false;
    return function () {
      if (!inThrottle) {
        inThrottle = true;
        method.apply(context, arguments);
        setTimeout(() => {
          inThrottle = false;
        }, delay);
      }
    };
  },
  debounce(method, delay, context) {
    let inDebounce;
    return function () {
      clearTimeout(method.inDebounce);
      inDebounce = setTimeout(() => {
        method.apply(context, arguments);
      }, delay);
    };
  },
};
class ScrollPages {
  constructor(currentPageNumber, totalPageNumber, pages) {
    this.pageNumber = document.querySelector(".pageNumber");
    this.blockRefs = Array.prototype.slice
      .call(document.querySelector(".blockRefs").childNodes)
      .filter((el) => el.tagName === "A");
    this.feature = document.querySelector(".feature");
    this.lineLeftBlock = document.querySelector(".lineLeftBlock");
    this.body = document.getElementsByTagName("body")[0];
    this.background = document.querySelector(".background");
    this.rashBtn = document.querySelector(".paymentRequest");
    this.currentPageNumber = currentPageNumber;
    this.totalPageNumber = totalPageNumber;
    this.pages = pages;
    this.slidePages = document.querySelectorAll(".Page");
    this.viewHeight = document.documentElement.clientHeight;
    this.dopeHeights = document.querySelector(".Page").clientHeight;
  }
  mouseScroll(event) {
    let delta = helper.getDelta(event);
    if (delta < 0) {
      this.scrollDown();
    } else {
      this.scrollUp();
    }
  }
  checkBackground(number) {
    switch (number) {
      case 1: {
        return "first";
      }
      case 2: {
        return "second";
      }
      case 3: {
        return "three";
      }
      case 4: {
        return "four";
      }
      case 5: {
        return "five";
      }
      default: {
        return "first";
      }
    }
  }
  checkPageName(number) {
    switch (number) {
      case 1: {
        return "Применение";
      }
      case 2: {
        return "Преимущества";
      }
      case 3: {
        return "О компании";
      }
      case 4: {
        return "Контакты";
      }
      case 5: {
        return "На главную";
      }
      default: {
        return "Применение";
      }
    }
  }
  checkClassName(name) {
    switch (name) {
      case 1: {
        return "White";
      }
      case 2: {
        return "Purple";
      }
      case 3: {
        return "White";
      }
      case 4: {
        return "Red";
      }
      case 5: {
        return "White";
      }
      default: {
        return "White";
      }
    }
  }

  scrollDown() {
    if (this.currentPageNumber !== this.totalPageNumber) {
      this.pages.style.top = -this.dopeHeights * this.currentPageNumber + "px";
      this.currentPageNumber++;
      this.pageNumber.innerHTML = "0" + this.currentPageNumber;
      this.feature.innerHTML = this.checkPageName(this.currentPageNumber);
      this.background.classList.add(
        this.checkBackground(this.currentPageNumber)
      );
      if (this.background.classList.length >= 2) {
        this.background.classList.remove(this.background.classList[1]);
      }
      this.lineLeftBlock.style.opacity = 1;
      this.lineLeftBlock.style.top =
        this.blockRefs[this.currentPageNumber - 2].getBoundingClientRect().y +
        "px";
      this.lineLeftBlock.style.height =
        this.blockRefs[this.currentPageNumber - 2].offsetWidth + "px";
      for (let i = 1; i <= this.slidePages.length; i++) {
        if (i !== this.currentPageNumber) {
          this.slidePages[i - 1].style.opacity = 0;
          this.slidePages[i - 1].style.transform = "scale(0.8)";
        } else {
          this.slidePages[i - 1].style.opacity = 1;
          this.slidePages[i - 1].style.transform = "scale(1)";
        }
      }
      if (this.currentPageNumber !== 1) {
        this.rashBtn.classList.remove("closed");
      }
      this.body.classList.remove(this.body.classList);
      this.body.classList.add(this.checkClassName(this.currentPageNumber));

      this.background.classList.add(
        this.checkBackground(this.currentPageNumber)
      );

      this.updateNav();
    }
  }
  scrollUp() {
    if (this.currentPageNumber !== 1) {
      this.pages.style.top =
        -this.dopeHeights * (this.currentPageNumber - 2) + "px";
      this.currentPageNumber--;
      this.pageNumber.innerHTML = "0" + this.currentPageNumber;
      this.feature.innerHTML = this.checkPageName(this.currentPageNumber);
      if (this.currentPageNumber === 1) {
        this.rashBtn.classList.add("closed");
      }
      if (this.currentPageNumber === 1) {
        this.lineLeftBlock.style.opacity = 0;
      } else {
        this.lineLeftBlock.style.opacity = 1;
        this.lineLeftBlock.style.top =
          this.blockRefs[this.currentPageNumber - 2].getBoundingClientRect().y +
          "px";
        this.lineLeftBlock.style.height =
          this.blockRefs[this.currentPageNumber - 2].offsetWidth + "px";
      }
      for (let i = 1; i <= this.slidePages.length; i++) {
        if (i !== this.currentPageNumber) {
          this.slidePages[i - 1].style.opacity = 0;
          this.slidePages[i - 1].style.transform = "scale(0.8)";
        } else {
          this.slidePages[i - 1].style.opacity = 1;
          this.slidePages[i - 1].style.transform = "scale(1)";
        }
      }
      if (this.background.classList.length >= 2) {
        this.background.classList.remove(this.background.classList[1]);
      }
      this.body.classList.remove(this.body.classList);
      this.body.classList.add(this.checkClassName(this.currentPageNumber));

      this.background.classList.add(
        this.checkBackground(this.currentPageNumber)
      );

      this.updateNav();
    }
  }
  scrollTo(targetPageNumber) {
    while (this.currentPageNumber !== targetPageNumber) {
      if (this.currentPageNumber > targetPageNumber) {
        this.scrollUp();
      } else {
        this.scrollDown();
      }
    }
  }
  createNav() {
    const pageNav = document.createElement("div");
    pageNav.className = "nav-dot-container";
    this.pages.appendChild(pageNav);
    for (let i = 0; i < this.totalPageNumber; i++) {
      pageNav.innerHTML += '<p class="nav-dot"><span></span></p>';
    }
    const navDots = document.getElementsByClassName("nav-dot");
    this.navDots = Array.prototype.slice.call(navDots);
    this.navDots[0].classList.add("dot-active");
    this.navDots.forEach((e, index) => {
      e.addEventListener("click", (event) => {
        this.scrollTo(index + 1);
        this.navDots.forEach((e) => {
          e.classList.remove("dot-active");
        });
        e.classList.add("dot-active");
      });
    });
  }

  updateNav() {
    this.navDots.forEach((e) => {
      e.classList.remove("dot-active");
    });
    this.navDots[this.currentPageNumber - 1].classList.add("dot-active");
  }
  resize() {
    this.viewHeight = document.documentElement.clientHeight;
    this.pages.style.height = this.viewHeight + "px";
    this.pages.style.top =
      -this.viewHeight * (this.currentPageNumber - 1) + "px";
  }

  init() {
    let handleMouseWheel = helper.throttle(this.mouseScroll, 500, this);
    let handleResize = helper.debounce(this.resize, 500, this);
    this.pages.style.height = this.viewHeight + "px";
    this.createNav();
    for (let i = 1; i <= this.slidePages.length; i++) {
      if (i !== this.currentPageNumber) {
        this.slidePages[i - 1].style.opacity = 0;
        this.slidePages[i - 1].style.transform = "scale(0.8)";
      } else {
        this.slidePages[i - 1].style.opacity = 1;
        this.slidePages[i - 1].style.transform = "scale(1)";
      }
    }
    const feat = document.querySelector(".feature");

    if (navigator.userAgent.toLowerCase().indexOf("firefox") === -1) {
      document.addEventListener("wheel", handleMouseWheel);
    } else {
      document.addEventListener("DOMMouseScroll", handleMouseWheel);
    }
    document.addEventListener("touchstart", (event) => {
      this.startY = event.touches[0].pageY;
    });
    document.addEventListener("touchend", (event) => {
      let endY = event.changedTouches[0].pageY;
      if (this.startY - endY < 0) {
        this.scrollUp();
      }
      if (this.startY - endY > 0) {
        this.scrollDown();
      }
    });
    /*
    document.addEventListener("touchmove", (event) => {
      event.preventDefault();
    });*/
    this.blockRefs.map((el, i) =>
      el.addEventListener("click", () => {
        this.scrollTo(i + 2);
      })
    );
    window.addEventListener("resize", handleResize);
    feat.addEventListener("click", () => {
      if (this.currentPageNumber === 5) {
        this.scrollTo(1);
      } else {
        this.scrollTo(this.currentPageNumber + 1);
      }
    });
  }
}

if (document.documentElement.clientWidth > 640) {
  document.addEventListener("DOMContentLoaded", function () {
    var s = new ScrollPages(1, 5, document.getElementById("all-pages"));
    s.init();
  });
}
