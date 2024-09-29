const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
let intervalId;

const flowers = [
  'amor-perfeito',
  'flor-de-lotus',
  'girassol',
  'hibisco',
  'hortensia',
  'iris',
  'jacinto',
  'jasmim',
  'lavanda',
  'lilas',
  'lirio',
  'magnolia',
  'margarida',
  'narciso',
  'orquidea',
  'peonia',
  'tulipa',
  'violeta',
];

let firstCard = '';
let secondCard = '';
let startTime;

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  const allCards = document.querySelectorAll('.card');

  if (disabledCards.length === allCards.length) {
    clearInterval(intervalId);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-flower');
  const secondCharacter = secondCard.getAttribute('data-flower');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    firstCard = '';
    secondCard = '';
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
}

const createCard = (flower) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${flower}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-flower', flower)

  return card;
}

const loadGame = () => {
  const duplicateFlowers = [...flowers, ...flowers];
  const shuffledArray = duplicateFlowers.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((flower) => {
    const card = createCard(flower);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  startTime = new Date().getTime();

  intervalId = setInterval(() => {
    const currentTime = new Date().getTime() - startTime;
    const seconds = Math.floor(currentTime / 1000);
    timer.innerHTML = seconds;
  }, 1000);
}

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

function restartGame() {
  grid.innerHTML = '';

  firstCard = '';
  secondCard = '';
  startTime = null;

  clearInterval(intervalId);
  timer.innerHTML = '00';

  loadGame();
  startTimer();
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}