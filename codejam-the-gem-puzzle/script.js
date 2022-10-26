const moveAudio = new Audio('zvuk41.mp3');
let div = document.createElement('div');
  div.className = 'wrapper';
const titel = document.createElement('h1');
  titel.className = 'title';
  titel.innerHTML = 'Пятнашки';
document.body.append(div);
div.append(titel);

const gameField = document.createElement('div');
  gameField.className = 'game-field';
div.append(gameField);

const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
gameField.after(buttonContainer);

const buttonShuffle = document.createElement('button');
  buttonShuffle.className = 'shuffle';
  buttonShuffle.textContent = 'Перемешать';

const sizeDiv = document.createElement('div');
  sizeDiv.className = 'size';
  sizeDiv.textContent = 'size: ';
  const selectContainer = document.createElement('select');
    selectContainer.classList = 'dropDown';
    selectContainer.addEventListener("change", function () {
      gameField.innerHTML = '';
      // console.log('selectContainer');
      gridNumber = Number(selectContainer.value);
      // console.log(gridNumber);
      createGrid(gridNumber);
      shuffle();
      setTimer();
      moves = 0;
      movesEl.textContent = `moves: ${moves}`;
      // console.log(items);
      // matrix = getMatrix(items.map((items) => Number(items.textContent)));
      // console.log(matrix);
      // setPositionItems(matrix);
    });

    sizeDiv.append(selectContainer);

    // const option0 = document.createElement('option');
    //   option0.value = 4;
    //   option0.textContent = '2x2';

    //   selectContainer.append(option0);
    
    const option1 = document.createElement('option');
      option1.value = 9;
      option1.textContent = '3x3';

      selectContainer.append(option1);

    const option2 = document.createElement('option');
      option2.value = 16;
      option2.textContent = '4x4';
      option2.selected = true;
    
    selectContainer.append(option2);

    const option3 = document.createElement('option');
      option3.value = 25;
      option3.textContent = '5x5';
    
      selectContainer.append(option3); 
    
      const option4 = document.createElement('option');
      option4.value = 36;
      option4.textContent = '6x6';
    
      selectContainer.append(option4); 
    
      const option5 = document.createElement('option');
      option5.value = 49;
      option5.textContent = '7x7';
    
      selectContainer.append(option5); 
    
      const option6 = document.createElement('option');
      option6.value = 64;
      option6.textContent = '8x8';
    
      selectContainer.append(option6); 

const buttonAudio = document.createElement('button');
  buttonAudio.className = 'audio';
  buttonAudio.textContent = 'Audio';
  buttonAudio.addEventListener('click', ()=>{
    buttonAudio.classList.toggle('active');
  });
  

buttonContainer.append(buttonShuffle);
buttonContainer.append(sizeDiv);
buttonContainer.append(buttonAudio);

const infoContainer = document.createElement('div');
  infoContainer.className = 'info-container';
buttonContainer.after(infoContainer);

const movesEl = document.createElement('div');
  movesEl.className = 'moves';
  movesEl.textContent = 'moves: '
infoContainer.append(movesEl);

const timeEl = document.createElement('div');
  timeEl.className = 'time';
  timeEl.textContent = '00 : 00 have passed'
infoContainer.append(timeEl);

const modal = document.createElement('div');
 modal.className = 'modal';

document.body.append(modal);

const backgroundBlack = document.createElement('div');
backgroundBlack.className = 'background-black background-hidden';

document.body.append(backgroundBlack);

let gridNumber = 16; /* число элементов */
let gridRows;
let gridCols;
let values;
let items = [];
let matrix;
let blankNumber;
let winFlatArray;
let moves;

function createGrid(number) {
  gridRows = Math.sqrt(number);
  gridCols = gridRows;

  values = new Array(number)
      .fill(0)
      .map((el, index) => index+1);

  items = [];
  for (let i=0; i<=number-1; i++) {
    let el = document.createElement('button');
        el.className = 'item';
        el.textContent = `${i+1}`;
        el.value = i+1;
        el.style.width = 100 / gridRows + '%';
        el.style.height = el.style.width;
    items.push(el);

    gameField.append(el);
  }
  // console.log(items);

  // position
  items[number-1].style.display = 'none';
  matrix = getMatrix(items.map((items) => Number(items.textContent)));
  setPositionItems(matrix);
  blankNumber = gridNumber;
  winFlatArray = new Array(gridNumber)
    .fill(0)
    .map((el, index) => index+1);
  // console.log(winFlatArray, gridNumber);
  moves = 0;
  movesEl.textContent = `moves: ${moves}`;
};
createGrid(gridNumber);
shuffle();




// console.log(matrix)

// shuffle

buttonShuffle.addEventListener('click', shuffle);
function shuffle() {
  // const flatMatrix = matrix.flat();
  let shuffledArr = shuffleArray(matrix.flat());
  let isValidArray = validArray(shuffledArr);
  // console.log(isValidArray);
  while (!isValidArray) {
    // console.log('перемешали еще раз');
    shuffledArr = shuffleArray(matrix.flat());
    isValidArray = validArray(shuffledArr);
    // console.log(isValidArray);

  }
  // console.log(shuffledArr);
  matrix = getMatrix(shuffledArr);
  setPositionItems(matrix);
  // clearTimeout(timer);
  setTimer();
  // ввести проверку на собираемость
  moves = 0;
  movesEl.textContent = `moves: ${moves}`;
}


// change position by click

gameField.addEventListener('click', (event) => {
  const elButton = event.target.closest('button');
  // console.log(elButton);
  if (!elButton) {
    return;
  }
  const buttonNumber = Number(elButton.value);
  const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
  const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
  // console.log(buttonCoords);
  const isValid = isValidForSwap(buttonCoords, blankCoords);
  // console.log(isValid);
  moves++;
  movesEl.textContent = `moves: ${moves}`;
  if (isValid) {
    swap(blankCoords, buttonCoords, matrix);
    setPositionItems(matrix);
  }
  if (buttonAudio.classList.contains('active')) {
    moveAudio.play();
  }
  

})

//change position by DraggNDropp
// gameField.addEventListener('mousedown', function(event) { // (1) отследить нажатие
//   console.log(event);
//   const elButton = event.target.closest('button');
//   console.dir(elButton);
//   if (!elButton) return;

//   event.preventDefault();

//   elButton.ondragstart = function() {
//       return false;
//   };

//   // const elButton = event.target.closest('button');
//   // console.log(elButton);
//   // if (!elButton) {
//   //   return;
//   // }

//   // event.preventDefault();

//   // elButton.ondragstart = function() {
//   //     return false;
//   // };

//   // (2) подготовить к перемещению:
//   // разместить поверх остального содержимого и в абсолютных координатах
//   let shiftX = event.clientX - elButton.getBoundingClientRect().left - gameField.pageX;
  
//   let shiftY = event.clientY - elButton.getBoundingClientRect().top - gameField.pageX;
//   console.log(shiftX, shiftY);


//   elButton.style.position = 'absolute';
//   elButton.style.zIndex = 1000;
//   // переместим в body, чтобы мяч был точно не внутри position:relative
//   gameField.append(elButton);
//   // и установим абсолютно спозиционированный мяч под курсор

//   moveAt(event.pageX, event.pageY);

//   // передвинуть мяч под координаты курсора
//   // и сдвинуть на половину ширины/высоты для центрирования
//   function moveAt(pageX, pageY) {
//     console.log(pageX, pageY)
//     // const shift= 100;/*100% от ширины/высоты*/
//     elButton.style.transform = `translate3D(0, 0, 0)`
//     elButton.style.left = pageX - shiftX + 'px';
//     elButton.style.top = pageY - shiftY + 'px';

//     // elButton.style.left = pageX - elButton.offsetWidth / 2 + 'px';
//     // elButton.style.top = pageY - elButton.offsetHeight / 2 + 'px';
//   }

//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   }

//   // (3) перемещать по экрану
//   gameField.addEventListener('mousemove', onMouseMove);

//   // (4) положить мяч, удалить более ненужные обработчики событий
//   elButton.onmouseup = function() {
//     gameField.removeEventListener('mousemove', onMouseMove);
//     elButton.onmouseup = null;
//   };

// });


// change position by swipe


// time and steps


// buttons


// score


// functions

function getMatrix(arr) {
  const matrix = Array(gridRows);
  for (let i=0; i<matrix.length; i++) {
    matrix[i] = Array(gridCols);
  }
  let x = 0;
  let y = 0;

  for (let i=0; i<arr.length; i++) {
    if (x>=gridCols) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }

  return matrix;
};

function setPositionItems(matrix) {
 for (let i=0; i<matrix.length; i++) {
  for (let j=0; j<matrix[i].length; j++) {
    const value = matrix[j][i];
    const node = items[value - 1];
    SetNodeStyle(node, i, j);
  }
 }
};

function SetNodeStyle(node, x, y) {
  const shift= 100;/*100% от ширины/высоты*/
  node.style.transform = `translate3D(${x * shift}%, ${y * shift}%, 0)`
};

function shuffleArray(arr) {
  return arr
      .map(value => ({value, sort: Math.random() }))
      .sort((a,b) => a.sort - b.sort)
      .map(({ value }) => value);
};

// function validArray(arr) {
//   let matrix = getMatrix(arr);
//   console.log(matrix);
//   let ki = 0;
//   let row;
//   let sum;
//   for (let i = 0; i<matrix.length; i++) {
//     for (let j=0; j<matrix[i].length; j++) {
//       if (matrix[i][j] == arr.length) {
//         continue
//       } else if (matrix[i][j+1] == arr.length) {
//         if ((matrix[i][j+2] < matrix[i][j])) {
//           ki++
//         }
//       } else if ((matrix[i][j+1] < matrix[i][j])) {
//         ki++
//       }
//       // if ((matrix[i][j+1] < matrix[i][j])) {
//       //   ki++
//       // }
//     }
//   }
//   console.log('ki '+ki);
//   for (let i = 0; i<matrix.length; i++) {
//     for (let j=0; j<matrix[i].length; j++) {
//       if (matrix[i][j] == arr.length) {
//         row = i+1;
//       }
//     }
//   }
//   // for (let i = 0; i<arr.length; i++) {
//   //   console.log(arr[i]);
//   //   console.log(arr[arr.length-1]);

//   //   if (arr[i] == arr.length) {
//   //     row = Math.floor(i / Math.sqrt(arr.length)) + 1;
//   //   }
//   // }
//   console.log('row '+row);
//   console.log(ki+row);
//   console.log((ki+row)%2, ((ki+row)%2 == 1));
//   if ((ki+row)%2 == 1) {
//     return false
//   } else {
//     return true
//   }
// }
function validArray(arr) {
  gridNumber;
  let matrix = getMatrix(arr);
  let blanckNumber;
  let InversionCount = 0;
  for (let i = 0; i<matrix.length; i++) {
    for (let j=0; j<matrix[i].length; j++) {
      if (matrix[i][j] == arr.length) {
        blanckNumber = matrix.length - i;
      }
    }
  }
  for (let i=0; i<arr.length; i++) {
    if (arr[i] == arr.length) {
      continue
    };
    for (let j=i+1; j<arr.length; j++) {
      if (arr[i] > arr[j]) {
        InversionCount++;
      }
    }
  }
  console.log(arr);
  console.log(gridNumber, blanckNumber, InversionCount);
  if ((gridNumber%2 == 1) && (InversionCount%2 == 0)) {
    return true;
  } else if ((gridNumber%2 == 0) && (blanckNumber%2 == 0) && (InversionCount%2 == 1)) {
    return true
  } else if ((gridNumber%2 == 0) && (blanckNumber%2 == 1) && (InversionCount%2 == 0)) {
    return true
  } else {
    return false
  }
}

function findCoordinatesByNumber (number, matrix) {
  for (let i=0; i<matrix.length; i++) {
    for (let j=0; j<matrix[i].length; j++) {
      if (matrix[i][j] == number) {
        return {j, i}
      }
    }
   }
   return null;
};

function isValidForSwap(coords1, coords2) {
  const diffX = Math.abs(coords1.j - coords2.j);/*X координата*/
  // console.log(diffX);

  const diffY = Math.abs(coords1.i - coords2.i);/*Y координата*/
  // console.log(diffY);


  return (diffX === 1 || diffY  === 1) && (coords1.j === coords2.j || coords1.i === coords2.i)
}

function swap(coords1, coords2, matrix) {
  const swapElement = matrix[coords1.i][coords1.j];
  matrix[coords1.i][coords1.j] = matrix[coords2.i][coords2.j];
  matrix[coords2.i][coords2.j] = swapElement;

  // winner

  if (isWon(matrix)) {
    addWonClass();
    // shuffle();
  }
}


function isWon(matrix) {
  const flatMatrix = matrix.flat();
  for (let i=0; i<winFlatArray.length; i++) {
    if (flatMatrix[i] !== winFlatArray[i]) {
      return false
    }
  }
  return true
}
const wonClass = 'gameWin';
function addWonClass () {

  let first = 1;
  function foo(){
    let i = 0;
    function count() {
        // сделать часть крупной задачи (*)
        items[i].classList.toggle(wonClass);
        i++;
        // console.log(i);
      if (i < gridNumber) {
        setTimeout(count, 100);
      }
    }
    count();
    first++;
    if (first < 3) {
      setTimeout(foo, 200);
    }
    
  };
  foo();

  


  modal.classList.add('modal-show');
  backgroundBlack.classList.remove('background-hidden');
  
  modal.textContent = `Hooray! You solved the puzzle in ##:## and ${moves} moves!`;

  backgroundBlack.addEventListener('click', (event)=>{
    /*закрытие бургем меню по клику вне поля*/
    // console.log(event);
    if (event.target.classList.contains('background-black')) {
        // console.log('yes');
        // burger_menu.classList.remove('burger-menu-active');
        backgroundBlack.classList.add('background-hidden');
        modal.classList.remove('modal-show');
        shuffle();
        /*закрытие попап*/
    }
}
)

}

function setTimer() {
  
  // let spendTime = document.getElementById("spendTime");
  let seconds = 0;
  let minutes = 0;
  let timer = null;
  clearTimeout(timer);
  // timeEl.innerHTML = ``;
  timeEl.innerHTML = `00 : 00 have passed`;
  function updateSeconds() {
    seconds += 1;
    if (seconds > 59) {
      seconds = 0;
      minutes += 1
    }

    timeEl.innerHTML = `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} have passed`;
    setTimeout(updateSeconds, 1000);
  }
  // updateSeconds();

  timer = setTimeout(updateSeconds, 1000);
};