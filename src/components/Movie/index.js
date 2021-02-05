import './Movie.scss';

function Movie({
  title,
  year,
  description,
  reviewAvg,
  reviewCount,
  imgSrc,
  baseUrl,
  imageSize,
 }) {
  return (
    <div className='movie'>

    {baseUrl && imageSize && imgSrc && <img src={`${baseUrl}${imageSize}${imgSrc}`} alt='Movie Poster'></img>}
    <div className='movie-details'>
      <h4 className='movie-title'>{title}</h4>
      <span className='release-year'>{year}</span>
      <p>{description}</p>
      <div className='rating'>
        <span className='stars'>{reviewAvg}/5 stars </span>
        <span className='reviewCount'>{reviewCount} reviews</span>
      </div>
    </div>


    </div>
  );
}

export default Movie;
