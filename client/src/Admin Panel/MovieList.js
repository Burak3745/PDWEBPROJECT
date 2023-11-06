
import SideBar from './SideBar'
import '../css/AddMovie.css'
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {Card, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { deleteMovieAction, getMovieAction } from '../action/movieAction';
import { BsFillCollectionPlayFill } from 'react-icons/bs'
import { MdBrowserUpdated } from 'react-icons/md'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { motion } from "framer-motion"
const MovieList = () => {
    const movie = useSelector(state => state.movie)
    const dispatch = useDispatch();
    const[search, setSearch] = useState('')

    useEffect(() => {
        if (!movie[0]) {
            dispatch(getMovieAction());
        }
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = movie.filter((item) => {
        return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
      }).slice(firstIndex, lastIndex);
    const npage = Math.ceil(movie.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const navigate = useNavigate();

    const playMovie = (id) => {
        navigate(`/play/${id}`);
    }
    const updateMovie = (id) => {
        navigate(`/updatemovie/${id}`);
    }
    const deleteMovie = (id) => {
        dispatch(deleteMovieAction(id))
    }
    
  
    const imageanimations = {
        hidden: {
            opacity: 0,
            width: '80px'
        },
        show: {
            opacity: 1,
            width: '70px',
            transition: {
                ease: 'easeInOut',
                duration: 0.8
            }
        }
    }




    const [user, setUser] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
    }, [userState])
    const userType = user && user.userType
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    }
    else if (userType != "ADMIN"){
        navigate("/browse");
    } else {

        return (

            <div>
                <div><div class="float-child">

                    <div class="green"><SideBar /></div>
                </div>

                    <div class="float-child">
                        <div class="box">
                            <form name="search">
                                <input type="text" class="input1" name="txt" placeholder='Search' 
                                onmouseout="this.value = ''; this.blur();" onChange={(e) => setSearch(e.target.value)}/>
                            </form>
                            <i class="fas fa-search"></i>

                        </div>
                        <div class="blue">
                            <Table >
                                <thead className='text-light'>
                                    <th>IMAGE</th>
                                    <th>NAME</th>
                                    <th>CATAGORY</th>
                                    <th className='px-2'>COUNTRY</th>
                                    <th>YEAR</th>
                                    <th>TIME</th>
                                    <th>ACTIONS</th>
                                </thead>
                                <tbody className='text-muted'>
                                    {records.map((d, i) => (
                                        <tr key={i}>
                                            <motion.div variants={imageanimations} initial="hidden" animate="show">
                                                <div className='bg-image hover-zoom'>
                                                    <Card.Img variant="top" src={d.image} />
                                                </div>
                                            </motion.div>
                                            <td >{d.name}</td>
                                            <td>{d.catagory}</td>
                                            <td >{d.country}</td>
                                            <td>{d.year}</td>
                                            <td>{d.time}</td>
                                            <td><div style={{ position: "absolute", color: "#2dffb9", cursor: "pointer" }} onClick={() => playMovie(d._id)}><BsFillCollectionPlayFill /></div><br />
                                                <div style={{ position: "absolute", color: "#2dffb9", cursor: "pointer" }} onClick={() => updateMovie(d._id)}><MdBrowserUpdated /></div><br/>
                                                <div style={{ position: "absolute", color: "#2dffb9", cursor: "pointer" }} onClick={() => deleteMovie(d._id)}><RiDeleteBin5Fill /></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <nav style={{ position: "absolute", left: "850px", top: "680px" }}>
                                <ul className='pagination'>
                                    <li className='page-item '>
                                        <a href='#' className='page-link' onClick={prePage}>Prev</a>

                                    </li>
                                    {
                                        numbers.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className='page-item'>
                                        <a href='#' className='page-link' onClick={nextPage}>Next</a>

                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
};

export default MovieList