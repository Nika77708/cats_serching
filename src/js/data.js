import {fetchApi, fetchCatByBreed} from '../services/cat-api.js'
import '../sass/_test.scss'

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

function createOption({ id, name }) {
  const option = document.createElement('option');
  option.setAttribute('value', id);
  option.innerText = name;

  return option;
}

function optionsList(dates) {
  const arrTags = dates.map(date => createOption(date));
  select.append(...arrTags);
}

const createInfoMarkup = ({ name, description, temperament }) => {
  const cardInfo = document.createElement('div');
  const title = document.createElement('h2');
  title.innerText = name;
  const about = document.createElement('p');
  about.innerText = description;

  const temperamentInfo = document.createElement('p');
  temperamentInfo.innerText = temperament;
  const temperamentBold = document.createElement('span');
  temperamentBold.innerText = 'Temperament:';

  temperamentInfo.prepend(temperamentBold);
  cardInfo.append(title, about, temperamentInfo);

  return cardInfo;
};

const createImgMarkup = ([{ url }]) => {
  const img = document.createElement('img');
  img.setAttribute('src', url);
  img.classList.add('pic');

  return img;
};

async function createBreedList() {
  try {
    loader.style.display = 'block';
    const data = await fetchApi();
    optionsList(data);

    async function renderInfo() {
      const image = await fetchCatByBreed(select.value);
      const renderImg = createImgMarkup(image);
      const infoObj = data.filter(el => el.id === select.value);
      catInfo.replaceChildren();
      loader.style.display = 'none';
      catInfo.append(renderImg, createInfoMarkup(...infoObj));
    }

    select.addEventListener('change', renderInfo);
  } catch (err) {
    error.style.display = 'block';
  }
}

createBreedList();

// Коллекция пород
// При загрузке страницы должен выполняться HTTP-запрос за коллекцией пород.
//Для этого необходимо выполнить GET-запрос на ресурс https://api.thecatapi.com/v1/breeds,
//возвращающий массив объектов. При успешном запросе, необходимо наполнить select.breed-select
//опциями так, чтобы value опции содержал id породы, а в интерфейсе пользователю отображалось название породы.

// Напиши функцию fetchBreeds() которая делает HTTP-запрос и возвращает промис с массивом пород -
//результатом запроса. Вынеси её в файл cat-api.js и сделай именованный экспорт.

// Информация о коте
// Когда пользователь выбирает опцию в селекте, необходимо выполнять запрос за полной информацией
//о коте на ресурс https://api.thecatapi.com/v1/images/search. Не забудь указать в этом запросе параметр
//строки запроса breed_ids с идентификатором породы. Ознакомься с документацией ресурса.

// Напиши функцию fetchCatByBreed(breedId) которая ожидает идентификатор породы, делает HTTP-запрос и
//возвращает промис с данными о коте - результатом запроса. Вынеси её в файл cat-api.js и сделай именованный экспорт.

// Если запрос был успешный, под селектом, в блоке div.cat-info появляется изображение и развернутая
//информация о коте: название породы, описание и темперамент.

// Обработка состояния загрузки
// Пока идет любой HTTP-запрос, необходимо показывать загрузчик - элемент p.loader. Пока запросов нет или
//когда запрос завершился, загрузчик необходимо скрывать. Используй для этого дополнительные CSS классы.

// Пока идет запрос за списком пород, необходимо скрыть select.breed-select и показать p.loader.
// Пока идет запрос за инфорацией о коте, необходимо скрыть div.cat-info и показать p.loader.
// Когда любой запрос завершился, p.loader необходимо скрыть
// Обработка ошибки
// Если у пользователя произошла ошибка любого HTTP-запроса, например упала сеть, была потеря пакетов и т. п., то есть промис был отклонен, необходимо отобразить элемент p.error, а при каждом последующем запросе скрывать его. Используй для этого дополнительные CSS классы.

// Протестировать работоспособноть отображения ошибки очень просто - измени адрес запроса добавив в конец любой символ, например вместо https://api.thecatapi.com/v1/breeds используй https://api.thecatapi.com/v1/breeds123. Запрос получения списка пород будет отклонен с ошибкой. Аналогично для запроса информации о коте по породе.

// Интерфейс
// Добавь минимальное оформление элементов интерфейса.
// Вместо select.breed-select можешь использовать любую библиотеку с красивыми селектом, например https://slimselectjs.com/
// Вместо p.loader можешь использовать любую библиотеку с красивыми CSS-загрузчиками, например https://cssloaders.github.io/
// Вместо p.error можешь использовать любую библиотеку с красивыми оповещениями, например Notiflix