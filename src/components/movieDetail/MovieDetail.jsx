import React, { useEffect, useState } from 'react'
import { fetchCasts, fetchMovieDetail, fetchMovieVideos, fetchSimilarMovie } from '../../services'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import { Modal } from 'react-bootstrap'
import ReactPlayer from 'react-player/youtube'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'

export function MovieDetail({ match }) {
    let params = match.params
    let genres = []
    const [detail, setDetail] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [video, setVideo] = useState([]);
    const [casts, setCasts] = useState([]);
    const [similarMovie, setSimilarMovie] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id))
            setVideo(await fetchMovieVideos(params.id))
            setCasts(await fetchCasts(params.id))
            setSimilarMovie(await fetchSimilarMovie(params.id));
        };
        fetchAPI();
    }, [params.id]);

    genres = detail.genres;

    const MoviePlayerModal = (props) => {
        const youtubeUrl = 'https://www.youtube.com/watch?v=';
        return (
            <Modal
            {...props}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                contered="true"
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={{ color: '#000000', fontWeight: 'bolder' }}
                        >
                        {detail.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#000000' }}>
                    <ReactPlayer
                        className='container-fluid'
                        url={youtubeUrl + video.key}
                        playing
                        width="100%"/>
                </Modal.Body>
            </Modal>
        )
    }

    let genresList
    if (genres) {
        genresList = genres.map((g, i) => {
            return (
                <li className='list-inline-item' key={i}>            <button type="button" className='btn btn-outline-info'>
                    {g.name}
                </button>
                </li>
            )
        })
    }

    const castList = casts.slice(0, 4).map((c, i) => {
        return (
            <div className="col-md-3 text-center" key={i}>
                <img className="img-fluid rounded-circle mx-auto d-block" src={c.img} alt={c.name}/>
                    <p className='font-weight-bold text-center'>
                        {c.name}
                </p>
                <p className="font-weight-light text-center" style={{ color: '#5a606b' }}>
                   {c.character}
                </p>
            </div>
        )
    })

    const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
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

    return (
        <div className="container">
            <div className='row mt-2'>
                <MoviePlayerModal
                    show={isOpen}
                    onHide={() => {
                        setIsOpen(false);
                    }}>
                </MoviePlayerModal>
                <div className='col text-center' style={{ width: '100%' }}>
                    <img className="img-fluid" src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt={detail.title} />
                    <div className="carousel-center">
                    <i onClick={() => setIsOpen(true)} className="far fa-play-circle" style={{fontSize: 95, color: '#f4c10f', cursor: 'pointer'}} ></i>
                    </div>
                    <div className="carousel-caption" style={{textAlign: 'center', fontSize: 35}}>
                        {detail.title}
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <p style={{color: '#5a606b', fontWeight: 'bolder'}}>GENRE</p>
                </div>
            </div>
            <div className='row mt-3'>
                <div className="col">
                    <ul className="list-inline">
                        {genresList}
                    </ul>
                </div>
            </div>

            <div className='row mt-3'>
                <div className="col">
                    <div className="text-center">
                        <ReactStars
                            count={detail.vote_average}
                            size={20}
                            color1={'#f4c10f'}
                            >
                        </ReactStars>
                    </div>
                    <div className="mt-3">
                        <p style={{color: '#5a606b', fontWeight: 'bold'}}>
                            OVERVIEW
                        </p>
                        {detail.overview}
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-3">
                    <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>RELEASE DATE</p>
                    <p style={{ color: '#f4c10f' }}>{detail.release_date}</p>
                </div>
                <div className="col-md-3">
                    <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>RUN TIME</p>
                    <p style={{ color: '#f4c10f' }}>{detail.runtime}</p>
                </div>
                <div className="col-md-3">
                    <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>BUDGET</p>
                    <p style={{ color: '#f4c10f' }}>{detail.budget}</p>
                </div>
                <div className="col-md-3">
                    <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>HOMEPAGE</p>
                    <p style={{ color: '#f4c10f' }}>{detail.homepage}</p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p style={{color: '#5a606b', fontWeight: 'bolder'}}>CAST</p>
                </div>
            </div>
             <div className="row mt-3">
                    {castList}
            </div>
            <div className="row mt-3">
                <div className="col">
                    <p style={{color: '#5a606b', fontWeight: 'bolder'}}>SIMILAR MOVIES</p>
                </div>
            </div>

            <div className="row mt-3">
                {similarMovieList}
            </div>
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
    )
}