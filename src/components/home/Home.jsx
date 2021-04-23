import React,  { useState, useEffect } from 'react'
import { fetchGenre, fetchMovies, fetchMovieByGenre,fetchPersons, fetchTopratedMovie } from '../../services'
// import ReactDOM from 'react-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
// import RBCarousel from "react-bootstrap-carousel";

export function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRated, setTopRated] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre(28));
            setPersons(await fetchPersons())
            setTopRated(await fetchTopratedMovie())
        };
        fetchAPI();
    }, []);
    
    const handleGenreClick = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id));
}
    
    const movies = nowPlaying.slice(0, 5).map((item, index) => {
        return (
            <div style={{height: 500, width: "100%"}} key={index}>
                <div className="carousel">
                    <img style={{ height: 600}} src={item.backPoster} alt={item.title} />
                </div>
                <div className="carousel-center">
                    <i className='far fa-play-circle' style={{fontSize: 95, color: '#f4c10f'}}></i>
                </div>
                <div className="carousel-caption" style={{ fontSize: 35}}>
                    {item.title}
                </div>
            </div>
        );
    });
    
    const genreList = genres.map((item, index) => {
        return (
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info" onClick={() => {
                    handleGenreClick(item.id)
                }}>
                    {item.name}
                </button>
        </li>
    )
    })
    
    const movieList = movieByGenre.slice(0, 4).map((item, index) => {
        return (
            <div className='col-md-3 col-sm-6' key={index}>
                <div className='card'>
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}></img>
                    </Link>
                </div>
                <div className='mt-3'>
                    <p style={{ fontWeight: 'bolder' }}>Rated: {item.title}</p>
                    <ReactStars count={item.rating} size={20} color1={'#f4c10f'}
                        ></ReactStars>
                </div>
            </div>
        )
    })

    const trendingPersons = persons.slice(0, 4).map((p, i) => {
        return (
            <div className="col-md-3 text-center" key={i}>
                <img className="img-fluid rounded-circle mx-auto d-block" src={p.profileImg} alt={p.name}/>
                    <p className='font-weight-bold text-center'>
                        {p.name}
                </p>
                <p className="font-weight-light text-center" style={{ color: '#5a606b' }}>
                    Trending for {p.known}
                </p>
            </div>
        )
    });

    const topRatedList = topRated.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3" key={index}>
                <div className='card'>
                    <Link to={`/movies/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}/>
                    </Link>
                </div>
                <div className='mt-3'>
                    <p style={{ fontWeight: 'bolder' }}>Rated: {item.title}</p>
                    <ReactStars count={item.rating} size={20} color1={'#f4c10f'}
                        ></ReactStars>
                </div>
        </div>
    )
})

    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col">
                    <Carousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={5000}
                        version={4}
                        indicators={false}
                        showThumbs={false} 
                    >
                        {movies}
                    </Carousel>
                </div>
            </div>
            <div className="row 
            met-3">
                <div className='col'>
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
</div>
            <div className="row mt-3">
                {movieList}
            </div>

            <div className='row mt-3'>
                <div className='col'>
                    <p className='font-weight-bold' style={{ color: '#5a606b' }}>
                        TRENDING PERSONS THIS WEEK
                    </p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
</div>
            <div className="row mt-3">{trendingPersons}</div>
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{ color: '#5a606b' }}>
                        TOP RATED MOVIES
                    </p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
</div>
            <div className="row mt-3">{topRatedList}</div>
            <hr className="mt-5" style={{ borderTop: '1px solid #5a606b' }}></hr>
            
            <div className='row mt-3 mb-5'>
                <div className="col-md-8 col-sm-6" style={{ color: '#5a606b' }}>
                    <h3>ABOUT ME</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum, libero quos, aperiam sapiente exercitationem consequuntur fugiat, veniam tempore corrupti perspiciatis a accusantium deleniti! Dignissimos quis, cumque eos omnis ducimus voluptas?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate quisquam, nisi voluptas nam, sit a, placeat debitis asperiores corrupti aut quos inventore dolorem excepturi explicabo quaerat quibusdam harum. Sapiente, iste!</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/" style={{ color: '#f4c10f' }}>
                                <i className='fab fa-facebook'></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{ color: '#f4c10f' }}>
                                <i className='fab fa-youtube'></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{ color: '#f4c10f' }}>
                                <i className='fab fa-twitter'></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" style={{ color: '#f4c10f' }}>
                                <i className='fab fa-instagram'></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6" style={{ color: '#5a606b' }}>
                    <h3>KEEP IN TOUCH</h3>
                    <ul className="list-unstyled">
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-map-marker-alt"></i> Address:</strong> city, state, country
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-phone"></i> Phone:</strong> +3 093 333-333-333
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <i className="fas fa-envelope"></i> Email:</strong> info@infomail.com
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}