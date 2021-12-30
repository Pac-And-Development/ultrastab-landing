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
    this.body = document.getElementsByTagName("body")[0];
    this.background = document.querySelector(".background");
    this.currentPageNumber = currentPageNumber;
    this.totalPageNumber = totalPageNumber;
    this.pages = pages;
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
      this.background.classList.add(
        this.checkBackground(this.currentPageNumber)
      );
      if (this.background.classList.length >= 2) {
        this.background.classList.remove(this.background.classList[1]);
      }
      console.log(this.body);
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
      if (this.background.classList.length >= 2) {
        this.background.classList.remove(this.background.classList[1]);
      }
      console.log(this.body);
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
    document.addEventListener("touchmove", (event) => {
      event.preventDefault();
    });
    window.addEventListener("resize", handleResize);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var s = new ScrollPages(1, 5, document.getElementById("all-pages"));
  s.init();
});
