import FilmItem from "../film-item";
import '../film-item/style.css'
import {useParams, useLocation, useNavigate } from "react-router-dom";
import {useState} from "react";
import Button from "../button/Button";
import './film-page.css'
import {useDataStorageContext} from "../context/data-storage-context";
import Header from "../header/Header";

const FilmPage= () =>{
    const [isOpenActor, setOpenActor] = useState(false);
    const [isOpenCompany, setOpenCompany] = useState(false);


    const location = useLocation();
    const navigate = useNavigate();

    const {state:{films,actors,companies}}=useDataStorageContext();
    const {filmId} = useParams();
    const filmData = films[filmId]


    if (!filmData) {
        return <div>Error: Film data not available</div>;
    }

    const toggleOpenActor = () => {
        setOpenActor(!isOpenActor);
    }

    const toggleOpenCompany = () => {
        setOpenCompany(!isOpenCompany);
    }



    return (
        <div className={'film_page_container'}>
            <Header/>
            <div className={'film_page_main_side'}>
                <aside id={'left-sidebar'}/>
                <div className={`film_page`}>
                    <div id={'film_page_main_info'}>
                        <img id={'film_page_icon'} src={filmData.icon}/>
                        <div id={'film_page_main_text'}>
                            <h1 id={'film_page_name'}>{filmData.name}</h1>
                            <h2 id={'film_page_year'}>{filmData.year} | {filmData.type}</h2>
                        </div>
                        <div className='film_page_toggle'>
                            <span onClick={toggleOpenActor}>{isOpenActor ? '∧' : '∨'} Actors</span>
                            {isOpenActor && (
                                <div>
                                    {filmData.actorsIds.map(actorId =>  (
                                        <div className={'film_page_toggle_element'} key={actorId}>
                                            {actors[actorId].firstName} {actors[actorId].lastName} </div>
                                ))}
                                </div>
                            )}
                        </div>
                        <div className='film_page_toggle'>
                            <span onClick={toggleOpenCompany}>{isOpenCompany ? '∧' : '∨'} Company</span>
                            {isOpenCompany && (
                                <div>
                                        <div className={'film_page_toggle_element'} key={filmData.companyId}>{companies[filmData.companyId].name}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={'film_page_buttons'}>
                        <Button classname={'edit_button'} color='#eabe0d' text='Edit' lnk={() => navigate(`/film-page/${filmId}/edit`)}></Button>
                        <Button classname={'delete_button'} color='red' text='Delete' lnk={() => navigate(`/film-page/${filmId}/delete`)}></Button>
                    </div>
                </div>

                <aside id ={'right-sidebar'}/>
            </div>

        </div>

    );
}

export default FilmPage;