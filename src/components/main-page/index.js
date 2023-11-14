import './style.css'
import Films from '../films/index'
import Button from "../button/Button";
import AddFilm from "../add-film-form/AddFilm";
import {useNavigate} from "react-router-dom";
import Header from "../header/Header";
import { IconName } from "react-icons/fa";

const MainPage =() =>{
    const navigate=useNavigate()
    return(
        <div className={'main_page_container'}>
            <Header/>
            <div className={'main_page_side_container'}>

                <div className='main_page'>
                    <h1>Fun.tv</h1>
                    <Films></Films>
                    <Button text={'Add'} color={'#eabe0d'} lnk={()=>{navigate('/add')}}/>
                </div>

                <aside id={'left-sidebar'}/>
                <aside id ={'right-sidebar'}/>
            </div>

        </div>
    )



}

export default MainPage;