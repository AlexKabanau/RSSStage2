console.log('проверка');

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

(function () {
  const feedbackList = document.querySelector('.feedback-list');
  const feedbacks = document.querySelectorAll('.feedback-wrapper');
  const backgroundHidden  = document.querySelector('.background-hidden');
  for (let element of feedbacks) {
    element.addEventListener('click', () => {
      const feedbackClose = element.querySelector('.feedback-close');
      feedbackList.classList.add('feedback-list-relative');
      // console.log(feedbackClose);
      element.classList.add('feedback-active');
      feedbackClose.classList.add('feedback-close-active');
      backgroundHidden.classList.remove('background-hidden');

      window.addEventListener("keydown", (event) => { /*закрытие попам по кнопке ESC*/
        if (event.keyCode === 27) {
          feedbackList.classList.remove('feedback-list-relative');
          element.classList.remove('feedback-active');
          feedbackClose.classList.remove('feedback-close-active');
          backgroundHidden.classList.add('background-hidden');
        }
      });

      backgroundHidden.addEventListener('click', (event) => { /*закрытие бургем меню по клику вне поля*/
        // console.log(event);
        // console.log(event);
        if (event.target.classList.contains('background-black')) {
          // console.log(event.target);
          feedbackList.classList.remove('feedback-list-relative');
          element.classList.remove('feedback-active');
          feedbackClose.classList.remove('feedback-close-active');
          backgroundHidden.classList.add('background-hidden');
        }
      });

      element.addEventListener('click', () => {
        console.log('клик по элементу');
        feedbackList.classList.remove('feedback-list-relative');
        element.classList.remove('feedback-active');
        feedbackClose.classList.remove('feedback-close-active');
        backgroundHidden.classList.add('background-hidden');
      });

    });
  };



} ());

(function () {/*карусель*/
  let numberOfItems = 6;
  
  let innerWidth = window.innerWidth;
  if (innerWidth<=640) {
    numberOfItems = 4;
  }
  

  let items = document.querySelectorAll('.animal-card');

  for (let i=0; i<numberOfItems; i++) {
    items[i].classList.add('active');
  }

  let currentItem = 0;
  let isEnabled = true;

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  };

  // function hideItems (direction) {
  //   isEnabled = false;
  //   for (let i=0; i<numberOfItems; i++) {
  //     let j=(i + currentItem + items.length) % items.length;
  //     items[j].classList.add(direction);
  //   }
  //   for (let i=0; i<items.length; i++) {
  //     items[i].addEventListener('animationend', function () {
  //       this.classList.remove('active', direction);
  //     })
  //   }
  // };

  function hideItems (direction) {
    isEnabled = false;
    for (let i=0; i<numberOfItems; i++) {
      let j=(i + currentItem + items.length) % items.length;
      items[j].classList.add(direction);
      items[j].addEventListener('animationend', function () {
        console.log(i, j, 'анимация закончена, удаление классов');
        this.classList.remove('active', direction);
      })
    }
  };

  function showItems (direction) {
    for (let i=0; i<numberOfItems; i++) {
      let j = (i + currentItem + items.length) % items.length;
      // if (j>=numberOfItems) {
        items[j].style.order = String(i+numberOfItems);
      // };
      items[j].classList.add('next', direction);
      items[j].addEventListener('animationend', function () {
        console.log(i, j, 'анимация закончена, добавление классов');
        this.classList.remove('next', direction);
        this.classList.add('active');
      })
    };
    isEnabled = true;
  };

  function previousItem (n) {
    hideItems('to-right');
    changeCurrentItem(n - numberOfItems);
    showItems('from-left')
  };

  function nextItem (n) {
    hideItems('to-left');
    changeCurrentItem(n + numberOfItems);
    showItems('from-right');
  };

  document.querySelector('.button-prev').addEventListener('click', function() {
    if (isEnabled) {
      previousItem(currentItem);
    }
  });

  document.querySelector('.button-next').addEventListener('click', function() {
    if (isEnabled) {
      nextItem(currentItem);
    }
  });

} ())