const BASE_URL = 'https://api.thecatapi.com';

export function fetchApi() {
  return fetch(`${BASE_URL}/v1/breeds`).then(responce => {
    if (!responce.ok) {
      throw new Error('тут ошибка');
    }
    return responce.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/v1/images/search?breed_ids=${breedId}`).then(
    responce => {
      if (!responce.ok) {
        throw new Error('This ERROR');
      }    
      return responce.json();
    }
  );
}

