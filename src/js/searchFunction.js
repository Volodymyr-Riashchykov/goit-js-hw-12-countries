import cardCountr from '../templates/card.hbs';
import listCountr from '../templates/list.hbs';
import Search from './fetchCountries';
import { error } from './error';
const debounce = require('lodash.debounce');
const formCard = document.querySelector('.formCard');
const inputEl = document.querySelector('.search');

inputEl.addEventListener('input', debounce(onSearch, 500));

const search = new Search();

function onSearch(e) {
    formCard.innerHTML = '';
    if (e.target.value.length < 1) {
        return;
    }
    search.query = e.target.value;
    search
        .searchCountr()
        .then(createHtml)
        .catch(error => {
            alert('что то пошло не так ...');
        });
}

function createHtml(data) {
    if (data.length === 1) {
        formCard.insertAdjacentHTML('beforeend', cardCountr(data));
    } else if (data.length > 1 && data.length <= 10) {
        formCard.insertAdjacentHTML('beforeend', listCountr(data));
    } else if (data.length > 10) {
        error({
            title: 'Too many matches found. Please enter a more specific query!',
            delay: 3000,
        });
    }
}
