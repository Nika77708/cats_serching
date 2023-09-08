import { fetchApi, fetchImgBreed } from '../services/api.js';
import '../sass/_test.scss';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorMessage = document.querySelector('.error');
const loader = document.querySelector('.loader');

const createOption = ({ id, name }) => {
  const option = document.createElement('option');
  option.setAttribute('value', id);
  option.innerText = name;

  return option;
};

const optionsList = dates => {
  const arrTags = dates.map(date => createOption(date));
  select.append(...arrTags);
};

const createInfoMarkup = ({ name, description, temperament }) => {
  // const wrapper = document.createElement('div');

  const cardText = document.createElement('div');
  const title = document.createElement('h2');
  title.innerText = name;
  const about = document.createElement('p');
  about.innerText = description;
  const temperamentInfo = document.createElement('p');
  temperamentInfo.innerText = temperament;
  const temperamentBold = document.createElement('span');
  temperamentBold.innerText = 'Temperament:';

  temperamentInfo.prepend(temperamentBold);
  cardText.append(title, about, temperamentInfo);

  return cardText;
};
const createImgMarkup = ([{ url }]) => {
  const img = document.createElement('img');
  img.setAttribute('src', url);

  return img;
};

const createBreedsList = async () => {
  try {
    loader.style.display = 'block';
    const data = await fetchApi();

    optionsList(data);

    const renderInfo = async () => {
      const image = await fetchImgBreed(select.value);
      const renderImg = createImgMarkup(image);
      const infoObj = data.filter(el => el.id === select.value);
      catInfo.replaceChildren();
      loader.style.display = 'none';
      catInfo.append(renderImg, createInfoMarkup(infoObj[0]));
    };

    select.addEventListener('change', renderInfo);
  } catch (err) {
    errorMessage.style.display = 'block';
  }
};

createBreedsList();
