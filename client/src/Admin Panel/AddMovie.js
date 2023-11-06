import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import '../css/AddMovie.css'
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { createMovieAction } from '../action/movieAction';
import ReactFileBase64 from 'react-file-base64'
const AddMovie = () => {


    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        name: '', time: '', link: '', country: '', year: '', score: '',
        description: '', director: '', company: '', actors: '', catagory: '', image: ''
    })
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        if (
            movieData.name.length >= 2 &&
            movieData.time.length >= 2 &&
            movieData.link.length >= 2 &&
            movieData.country.length >= 2 &&
            movieData.year.length >= 2 &&
            movieData.score.length >= 2 &&
            movieData.description.length >= 2 &&
            movieData.director.length >= 2 &&
            movieData.company.length >= 2 &&
            movieData.actors.length >= 2 &&
            movieData.catagory.length >= 2
        ) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [movieData]);

    const movieCreate = () => {
        dispatch(createMovieAction(movieData))
        navigate("/movielist");
        
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
    }
    else {
       
        return (
            <div class="AddMovie">

                <div class="float-child">
                    <div class="green"><SideBar /></div>
                </div>

                <div class="float-child">
                    <div class="blue ">

                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Name"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, name: e.target.value })} />
                                <label for="Film Adı" class="form__label">Film Adı</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, time: e.target.value })} />
                                <label for="Süresi" class="form__label">Süresi</label>
                            </div>

                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Linki"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, link: e.target.value })} />
                                <label for="Linki" class="form__label">Linki</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Ülkesi"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, country: e.target.value })} />
                                <label for="Ülkesi" class="form__label">Ülkesi</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yapım Yılı"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, year: e.target.value })} />
                                <label for="Yapım Yılı" class="form__label">Yapım Yılı</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="IMDB Puanı"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, score: e.target.value })} />
                                <label for="IMDB Puanı" class="form__label">IMDB Puanı</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Konusu"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, description: e.target.value })} />
                                <label for="Konusu" class="form__label">Konusu</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yönetmeni"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, director: e.target.value })} />
                                <label for="Yönetmeni" class="form__label">Yönetmeni</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yapımcı Şirketi"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, company: e.target.value })} />
                                <label for="Yapımcı Şirketi" class="form__label">Yapımcı Şirketi</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Oyuncu Kadrosu"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, actors: e.target.value })} />
                                <label for="Oyuncu Kadrosu" class="form__label">Oyuncu Kadrosu</label>
                            </div>
                        </div>

                        <div className='flex-container'>
                        <div class="form__group field">
                            <label className='catagory_text my-1 mx-3'>Kategori</label>
                            <div class="select-dropdown mx-3">

                                <select value={movieData.catagory} onChange={(e) => setMovieData({ ...movieData, catagory: e.target.value })}>
                                    <option>Choose Catagory</option>
                                    <option value="Action & Advanture">Action & Advanture</option>
                                    <option value="Animation">Animation</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Documentary">Documentary</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Family">Family</option>
                                    <option value="Kids">Kids</option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="News">News</option>
                                    <option value="Reality">Reality</option>
                                    <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
                                    <option value="Soap">Soap</option>
                                    <option value="Talk','War & Politics">Talk','War & Politics</option>
                                    <option value="Western">Western</option>
                                </select>
                            </div>
                            </div>
                            <div class="form__group field py-5 px-2">
                            <ReactFileBase64
                                type='file'
                                multiple={false}
                                onDone={({ base64 }) => {
                                    setMovieData({ ...movieData, image: base64 })
                                }}

                            />
                            </div>
                        </div>
                        <button disabled={disabled} onClick={movieCreate} className='button-66 ' role="button-66">Ekle</button>
                    </div>

                </div>

            </div>
        )
    }
};

export default AddMovie