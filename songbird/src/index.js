import { Article } from './js/Article';
import birdsData from './js/birds';
import soundfileError from './audio/export_ofoct.com.mp3';
import soundfilSuccess from './audio/export_ofoct.com (1).mp3';
import defaultImage from './img/bird.06a46938.jpg';

// import './js/canvas';
// import './sass/style.scss';
// console.log(birdsData);
window.addEventListener('load', getLocalStorage);

console.log('Усть косяки: \n нет проигрывателя в описании\n клик работает только по клику на элемент списка а не на текст или маркер \n нет промисов, поэтому наверное возможны косяки при проирывании \n если правильный ответ уже дан, возможность просматривать описания птиц при клике по вариантам ответов остаётся, цвет индикаторов при этом не изменяется: +10 - этого НЕТ\n ');


let set = 0; //global

const mediaSuccess = new Audio(soundfilSuccess);//global
const mediaError = new Audio(soundfileError);//global
let media;
let length = birdsData[set].length;
let current = Math.floor(Math.random() * length);
let isAudio;
let isScore;
let currentScore;
let totalScore;

createContent();

function createContent () {
  showCurrentQuestion(set);
  showAnswersList(set);
  audio_start();
  score_valid();
  currentScore = 5;
  showScore();
  media = new Audio;
  media.src = birdsData[set][current].audio;
  audioPlayer(media);
}

function cleanPage() {
  const answerList = document.querySelector('.answers__list');
  answerList.innerHTML = '';

  const descriptionMoto = document.querySelector('.description__moto');
    descriptionMoto.classList.remove('visually-hidden');
  const descriptionContainer = document.querySelector('.description__container');
  // console.dir(descriptionContainer);
    descriptionContainer.classList.add('visually-hidden');
  
  const currentImage = document.querySelector('.current__image');
    currentImage.src = defaultImage;
    currentImage.alt = '***';
  const currentTitle = document.querySelector('.current__title');
    currentTitle.innerText = '***';
  const next = document.querySelector('.next__link');
    next.classList.remove('next__link_valid');
    // next.addEventListener('click', update);
    next.removeEventListener('click', update);

};
function showScore () {
  const scoreText = document.querySelectorAll('.score__text');
  // console.log(scoreText)
  for (let item of scoreText) {
    item.innerText = totalScore;
  }
}
function decreaseScore () {
  if (!isScore) {
    return
  }
  currentScore--;
}
function updateScore () {
  if (!isScore) {
    return
  }
  totalScore = totalScore + currentScore;
};

function showCurrentQuestion (set) {
  
  // console.log(current);
  // media.src = birdsData[set][current].audio;
  // console.log(media);

  const items = document.querySelectorAll('.questions .navigation__item');
  for (let i=0; i<items.length; i++) {
    items[i].classList.remove('navigation__item_active');
    if (i===set) {
      items[i].classList.add('navigation__item_active');
    }
  }
};

function showAnswersList (set) {
  const answerList = document.querySelector('.answers__list');
  if (!answerList) {return}
  // console.log(answerList);
    for (let i=0; i<length; i++) {
    const li = document.createElement('li');
    li.className = 'list__item';
    // (function(k){
      li.dataset.number = i;
    // })(i);
    // li.setAttribute('orderState', i);
      const p = document.createElement('p');
      p.className = 'item__text';
        const span = document.createElement('span');
        span.className = 'marker';
        p.innerText = birdsData[set][i].name;
        p.prepend(span);
    li.append(p);
    li.addEventListener('click', checkAnswer)
      // console.log(li);
    answerList.append(li);
  }
  // addListClickHandler();
};

// function addListClickHandler () {
//   const answerLis = document.querySelectorAll('.list__item');
//   answerLis.forEach(element => {
//     element.addEventListener('click', (el)=>{
//       console.log(el);
//     })
//   });
//   // addEventListener('click', (el) => {
//   //   console.log(el);
//   //   if (el.target.classList.contains('list__item')) {
//   //     console.log('done');
//   //   }
//   // })
// }

function checkAnswer(el) {
  // console.log(el);
  // el.target.classList.add('list__item_correct');
  let name = el.target.innerText;
  let number = el.target.getAttribute('data-number');
  // console.log(name);
  // console.dir(el.target.getAttribute('data-number'));
  // console.dir(number);

  if (name === birdsData[set][current].name) {
    // console.log('Uiiii!!!');
    mediaSuccess.play();
    
    el.target.classList.add('list__item_correct');
    updateScore();
    score_invalid();
    showScore();
    showCorrectAnswer();
    showAnswer(number);
  } else {
    mediaError.play();
    el.target.classList.add('list__item_incorrect');
    decreaseScore();
    showAnswer(number);

  };
};

function showAnswer(n) { // в поле description
  const descriptionMoto = document.querySelector('.description__moto');
    descriptionMoto.classList.add('visually-hidden');
  const descriptionContainer = document.querySelector('.description__container');
  // console.dir(descriptionContainer);
    descriptionContainer.classList.remove('visually-hidden');
  const descriptionImage = descriptionContainer.querySelector('.description__image');
    descriptionImage.src = birdsData[set][n].image;
    descriptionImage.alt = birdsData[set][n].name;
  const descriptionTitle = descriptionContainer.querySelector('.description__title');
    descriptionTitle.innerText = birdsData[set][n].name;
  const descriptionSubtitle = descriptionContainer.querySelector('.description__subtitle');
    descriptionSubtitle.innerText = birdsData[set][n].species;
  const descriptionText = descriptionContainer.querySelector('.description__text');
  descriptionText.innerText = birdsData[set][n].description;
};

function showCorrectAnswer() {
  //в  поле current
  const currentImage = document.querySelector('.current__image');
    currentImage.src = birdsData[set][current].image;
    currentImage.alt = birdsData[set][current].name;
  const currentTitle = document.querySelector('.current__title');
    currentTitle.innerText = birdsData[set][current].name;
  const playAudio = document.querySelector('.playAudio');
    playAudio.classList.remove('pause');
    media.pause();
    media.paused === true;
    media.currentTime = 0;
  if (set == 5) {
    const scoreLink = document.querySelector('.next__link_score');
    scoreLink.classList.add('next__link_valid');
    scoreLink.classList.remove('visually-hidden');
    const next = document.querySelector('.next__link');
    next.classList.add('visually-hidden');
  
    // next.addEventListener('click', update);
  
  }
  const next = document.querySelector('.next__link');
  next.classList.add('next__link_valid');
  next.addEventListener('click', update);

  
};

function update() {
  set++;
  current = Math.floor(Math.random() * length);
  audio_stop();
  media.src = '';
  cleanPage();
  createContent();
}
function score_valid () {
  isScore = true;
};
function score_invalid () {
  isScore = false;
}

function audio_stop () {
  isAudio = false;
};
function audio_start () {
  isAudio = true;
};
function audioPlayer(media) {
  if (!isAudio) {
    return
  }
const playAudio = document.querySelector('.playAudio');
const percentage = document.querySelector('.percentage');
const currentTime = document.querySelector('.currentTime');
const seekObj = document.querySelector('.seekObj');

function togglePlay() {
  // console.log(media.paused);
  if (media.paused === false) {
    // console.log('toggle');
    media.pause();
    playAudio.classList.remove('pause');
    // console.dir(media);

  } else {
    // console.log('toggle2');

    media.play();
    playAudio.classList.add('pause');
  }
}

function calculatePercentPlayed() {
  let percent = (media.currentTime / media.duration).toFixed(2) * 100;
  // console.log(media);
  percentage.style.width = `${percent}%`;
}

function calculateCurrentValue(curTime) {
  const currentMinute = parseInt(curTime / 60) % 60;
  const currentSecondsLong = curTime % 60;
  const currentSeconds = currentSecondsLong.toFixed();
  const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
  currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  }`;
  
  return currentTimeFormatted;
}

function initProgressBar() {
  // console.log(media);
  const curTime = calculateCurrentValue(media.currentTime);
  // console.log(currentTime);
  currentTime.innerHTML = curTime;
  seekObj.addEventListener('click', seek);

  media.onended = () => {
    playAudio.classList.remove('pause');
    percentage.style.width = 0;
    currentTime.innerHTML = '00:00';
  };

  function seek(e) {
    const percent = e.offsetX / this.offsetWidth;
    media.currentTime = percent * media.duration;
  }
  
  calculatePercentPlayed();
}
media.volume = 0.75;
const volumeSlider = document.querySelector('.volume-slider');
if (!volumeSlider) {return}
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  media.volume = newVolume;
  document.querySelector('.volume-percentage').style.width = newVolume * 100 + '%';
}, false)
playAudio.addEventListener('click', togglePlay);
// playAudio.addEventListener('timeupdate', initProgressBar);
media.addEventListener('timeupdate', (event) => {
  // console.log('Time update');
  initProgressBar();
});

};

function setLocalStorage() {
  if (window.location.pathname.includes('winner.html')) {
    localStorage.clear();
  } else {
    localStorage.setItem('total-score', totalScore);
    }
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (window.location.pathname.includes('page.html') || window.location.pathname.includes('index.html')) {
    totalScore = 0;
  } else {
    if(localStorage.getItem('total-score')) {
    // console.log(localStorage.getItem('total-score'));
    totalScore = Number(localStorage.getItem('total-score'));
    // console.log(totalScore);
  }
  }

  
  showScore();
}
