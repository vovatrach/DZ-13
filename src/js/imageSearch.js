import imageService from './apiService';
import cardTemplate from '../templates/card.hbs';

const PER_PAGE = 12;
let page = 1;
let queryString;
let currentQueryString;

const searchInputRef = document.querySelector('form#search-form');
const ulRef = document.querySelector('.gallery');
const btnRef = document.querySelector('button');
const load_moreRef = document.querySelector('.load_more');

const addCard = () => {
  if (queryString === '') {
    clear();
    return;
  }
  imageService(queryString, page, PER_PAGE).then(data => {
    const cardMarkup = cardTemplate(data.hits);
    const endLi = ulRef.lastElementChild;
    ulRef.insertAdjacentHTML('beforeend', cardMarkup);
    page++;
    if (endLi) {
      endLi.nextElementSibling.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
  currentQueryString = queryString;
  searchInputRef.query.value = '';
  load_moreRef.style = 'opacity: 1;';
};
const clear = () => {
  ulRef.innerHTML = '';
  load_moreRef.style = 'opacity: 0;';
};

const searchHendler = event => {
  event.preventDefault();
  queryString = event.currentTarget.elements.query.value;

  clear();
  addCard();
};
const clickHendler = () => {
  addCard();
};
searchInputRef.addEventListener('submit', searchHendler);
btnRef.addEventListener('click', clickHendler);
