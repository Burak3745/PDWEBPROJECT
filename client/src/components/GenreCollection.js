import { useState, useEffect } from 'react';
import MovieCard from './MovieCard1'
import InfinityScroll from './InfinityScroll';

import { getMovieAction } from '../action/movieAction'
import { useDispatch, useSelector } from 'react-redux'

export default function GenreCollection({ genre }) {
    const movie = useSelector(state => state.movie)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!movie[0]) {
      dispatch(getMovieAction());
    }
  }, [dispatch]);

    const [content, setContent] = useState([]);


    return (
        
            <div className="movie-row">
                
                <h3 style={{color:'#2dffb9'}} >{genre.name}</h3>

                <InfinityScroll>
                    {movie.filter((item) =>{
                        if(genre.name == item.catagory){
                            
                            return item
                        }
                    })
                    .slice(0,20)
                    .map((movie) => (
                        
                        <MovieCard movie={movie} />
                    ))}
                </InfinityScroll>
            </div>
    );
}