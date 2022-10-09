console.log('hello');

const form = document.forms['number-form'];
let prices = document.querySelectorAll('.price');
let dollars = document.querySelectorAll('.dollar');
// console.log(prices);
// console.log(dollars);
form.onchange = function () {
  // console.log('change');
  form.elements.number.value = form.elements['amount'].value
};


form.elements.number.oninput = function () {
  for (elem of form.elements['amount']) {
    if (elem.value == form.elements.number.value) {
      console.log('bingo');
      elem.checked = true;
    }
  }
};


(function () {


  /*бургер меню*/
    const burger = document.querySelector('.burger');
    const burger_menu = document.querySelector('.burger-menu');
    const backgroundHidden  = document.querySelector('.background-hidden');
  
    burger.addEventListener('click', () => { /*открытие бургер меню*/
      console.log('клик по иконке бургера');
      burger_menu.classList.add('burger-menu-active');
      backgroundHidden.classList.remove('background-hidden');
    });
  
  
    window.onscroll = () => {
      if (window.pageXOffset > 50) {
          burger_menu.classList.add('burger-menu-active');
      } else {
          burger_menu.classList.remove('burger-menu-active');
          backgroundHidden.classList.add('background-hidden');
      }
    }
    window.addEventListener("keydown", (event) => { /*закрытие попам по кнопке ESC*/
      // console.log(event);
  
      if (event.keyCode === 27) {
        backgroundHidden.classList.add('background-hidden');
        burger_menu.classList.remove('burger-menu-active');
      }
    });
  
    backgroundHidden.addEventListener('click', (event) => { /*закрытие бургем меню по клику вне поля*/
      // console.log(event);
      if (event.target.classList.contains('background-black')) {
        // console.log('yes');
        burger_menu.classList.remove('burger-menu-active');
        backgroundHidden.classList.add('background-hidden');
      }
    })
  
    const burger_nav_close = document.querySelector('.burger-nav-close'); /*закрытие бургер меню по кнопке*/
    burger_nav_close.addEventListener('click', () => {
      burger_menu.classList.remove('burger-menu-active');
      backgroundHidden.classList.add('background-hidden');
    });
  
    /*конец бургер меню*/
  
  
  
  
  } ());
// if (form.elements.number.value == 1000) {
//     console.log(1000);
// }
// document.forms['number-form'].elements.number.value = document.forms['number-form'].elements['amount'].value;