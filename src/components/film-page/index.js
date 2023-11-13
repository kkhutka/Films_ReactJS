import FilmItem from "../film-item";
import '../film-item/style.css'
import { useLocation, useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import Button from "../button/Button";
import './film-page.css'
import {useDataStorageContext} from "../context/data-storage-context";

const FilmPage= () =>{

    const location = useLocation();
    const navigate = useNavigate();

    const {state:{films}}=useDataStorageContext();
    const {filmId} = useParams();
    const filmData = films[filmId]


    if (!filmData) {
        // Handle the case when filmData is not available
        return <div>Error: Film data not available</div>;
    }

    console.log(filmId)



    return (
        <div className={`film_page`}>
            <FilmItem key={filmId} filmId={filmId} filmData={filmData} currentPage={'film_page_it'} />
            <div className={'film_page-buttons'}>
                <Button classname={'edit_button'} color='#eabe0d' text='Edit' lnk={() => navigate(`/film-page/${filmId}/edit`)}></Button>
                <Button classname={'delete_button'} color='red' text='Delete' lnk={() => navigate(`/film-page/${filmId}/delete`)}></Button>
            </div>
        </div>
    );
}

export default FilmPage;