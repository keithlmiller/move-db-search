const apiKey = '<API_KEY_HERE>';
const baseUrl = 'https://api.themoviedb.org/3/'

export function searchMovies(searchTerm, page) {
  const url = `${baseUrl}search/movie`;
  return fetch(`${url}?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(searchTerm)}&page=${page}&include_adult=false`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.resolve([])
      }
    })
}

export function getConfig() {
  const url = `${baseUrl}configuration`;
  return fetch(`${url}?api_key=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.resolve({})
      }

    })
}
