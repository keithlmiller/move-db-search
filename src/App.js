import { useEffect, useState } from 'react';
import { getConfig, searchMovies } from './utils/api';
import MovieResult from './components/Movie';
import './App.scss';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [baseUrl, setBaseUrl] = useState('')
  const [imageSize, setImageSize] = useState('')


  const handleSearchChange = (e) => {
    const { target: { value }} = e;
    setSearchTerm(value);

    if (value) {
      searchMovies(value, 1)
        .then(data => {
          setTotalPages(data.total_pages)
          setResults(data.results)
        });
    } else {
      setResults([]);
      setTotalPages(0);
    }
    setPage(1);
  }

  const handlePageChange = () => {
    searchMovies(searchTerm, page+1)
      .then(data => {
        setResults([...results, ...data.results])
      });
    setPage(page+1);
  }

  useEffect(() => {
    getConfig().then((config) => {
      const { images: { base_url, poster_sizes = [] } = {} } = config
      setBaseUrl(base_url);
      setImageSize(poster_sizes[0]);
    })
  }, [])


    useEffect(() => {
    if (results.length && !searchTerm.length) {
      setResults([]);
      setTotalPages(0);
    }
  }, [results, searchTerm])

  return (
    <div className='movie-search'>
      <header className='search-bar'>
        <h2>Movie Search App</h2>
        <input
          type='text'
          className='search-input'
          placeholder='Search by Movie Title'
          onChange={handleSearchChange}
          value={searchTerm}
          alt='Type to seach by movie title'
        >
        </input>
      </header>

      <div className='results'>
        {results.map((result) => (
          <MovieResult
            key={result.id}
            title={result.original_title}
            year={result.release_date}
            description={result.overview}
            reviewAvg={Math.round(result.vote_average)/2}
            reviewCount={result.vote_count}
            imgSrc={result.poster_path}
            baseUrl={baseUrl}
            imageSize={imageSize}
          />))}
       {totalPages > 1 && <button className='btn' onClick={handlePageChange}>See More</button>}
      </div>
    </div>
  );
}

export default App;
