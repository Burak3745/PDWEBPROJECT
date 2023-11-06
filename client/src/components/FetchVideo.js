import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getIdMovie } from '../axios';

export default function FetchVideo() {
   
    const { id } = useParams();

    const [movieData, setMovieData] = useState({
      name: '', time: '', link: '', country: '', year: '', score: '',
      description: '', director: '', company: '', actors: '', catagory: '', image: ''
  })

  useEffect(() => {
    const getMemo = async () => {
        const { data } = await getIdMovie(id)
        setMovieData(data)
    }

    getMemo()
}, [id])
    return (
      <Card style={{background:"#06001d" }}>
        <Card.Footer style={{ display: 'flex', justifyContent: "center" }}>
        <iframe src={movieData.link} scrolling="no" 
        frameborder="0" width="640" height="360" allowfullscreen="true" 
        webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>

        </Card.Footer>
      </Card>
    )
}