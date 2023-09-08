const BASE_URL = 'https://api.thecatapi.com'
export const fetchApi = () => {
   return fetch(`${BASE_URL}/v1/breeds`).then(response => {
    if(!response.ok){
        throw new Error("404");
    }
    return response.json()
   });
}

export const fetchImgBreed = breedId => {
  return fetch(`${BASE_URL}/v1/images/search?breed_ids=${breedId}`).then(
    response => {
        if(!response.ok){
            throw new Error("");
        }
//привет
        return response.json();
    }
  );
};