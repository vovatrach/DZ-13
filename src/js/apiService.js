const API_URL = 'https://pixabay.com/api/';
const API_KEY = '19126431-639b2ba18eb4caa5d22b03767';

export default function (searchQuery, page, perPageNumber) {
  return fetch(
    `${API_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${perPageNumber}&key=${API_KEY}`,
  )
    .then(response => {
      return response.json();
    })

    .catch(error => {
      return error;
    });
}
