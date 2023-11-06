
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../css/MovieCardBrowser.css'
import {FaPlayCircle} from 'react-icons/fa'
export default function MovieCard({ movie }) {



    return (
        <div className="movie-card" style={{width:"170px"}} >
            <div class="wrapper">
            <Link to={`/play/${movie._id}`}>
                <div class="card1">
                    <img src={movie.image} />
                    <div class="descriptions">
                        <h1>{movie.name}</h1>
                        
                        <FaPlayCircle size={"85px"} color='#2dffb9' style={{position:"absolute",left:"32px", top:"80px"}}/>
                        <Rating style={{position:"absolute",left:"47px", top:"170px"}} score={movie.score} />
                    </div>
                </div>
                </Link>
            </div>
            
        </div>
    );
}

/*<img
                class="card__background"
                src={movie.image}
                alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                width="100%"
                height="100%"
            />
            <div className="movie-details">
                <h4>{movie.name}</h4>
                <Rating score={movie.score} />
                <Link to={`/play/${movie._id}`}>
                    <BsPlayFill className="play-btn" />
                </Link>
                <Link to={`/details/${movie._id}`}>
                    <BsChevronUp className="details-btn" />
                </Link>
            </div>
            */