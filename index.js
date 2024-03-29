const navbar = document.getElementById("nav-icon4");
const radioBtn1 = document.getElementById('option-one');
const radioBtn2 = document.getElementById('option-two');
const address1 = document.querySelector('.address-one');
const address2 = document.querySelector('.address-two');

navbar.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

// const inputOne = getElementById("option-one");
// const inputTwo = getElementById("option-two");

const mapEl = document.querySelector(".mapEl");
const typecards = Array.prototype.slice.call(
  document.querySelectorAll(".typecard")
);
const childs = Array.prototype.slice
  .call(mapEl.childNodes)
  .filter((el) => el.tagName === "DIV");

typecards.map((el, i) => {
  el.addEventListener("click", async () => {
    if (i === 0) {
      childs[1].style.opacity = 1;
      childs[0].style.opacity = 0;
    } else {
      childs[1].style.opacity = 0;
      childs[0].style.opacity = 1;
    }
  });
});

const changeHandler = e => {
  if (e.target.value.length) {
    e.target.nextElementSibling.classList.add('shrink-label')
  } else {
    e.target.nextElementSibling.classList.remove('shrink-label')
  }
}

const formInputs = Array.from(document.querySelectorAll('.inputLabel input'))
formInputs.forEach(input => input.addEventListener('change', changeHandler))

address2.style.display = 'none'

radioBtn1.addEventListener('change', () => {
  if (radioBtn1.checked) {
    address2.style.display = 'none'
    address1.style.display = 'block'
  }
})

radioBtn2.addEventListener('change', () => {
  if (radioBtn2.checked) {
    address1.style.display = 'none'
    address2.style.display = 'block'
  }
})