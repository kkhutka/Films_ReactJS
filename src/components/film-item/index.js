import './style.css'
import { useState } from 'react';
import {useDataStorageContext} from "../context/data-storage-context";
import {Link} from "react-router-dom";
import FilmPage from "../film-page/film-page";


const FilmItem = ({filmId, filmData, currentPage}) =>{
    const {state: {actors, companies}, dispatch, dataActions} = useDataStorageContext();


    const {name, year, actorsIds, companyId,type, icon} = filmData;

    return (
        <div className={`film_item`}>
            <img id={`film_item__image`} src={icon} alt={''}/>
            <span id={`film_item__name`}>
                    <Link to={`/film-page/${filmId}`} state={{ filmData }} className={'link'}> {name}</Link>
            </span>
            <span id={`film_item__year`}>{year}</span>
            <span id={`film_item__type`}>{type}</span>
            <span id={`film_item__company`}>{companies[companyId].name}</span>
            {actorsIds.length >0 && (
                <div id={`$film_item__actors`}>
                    {actorsIds.map(actorId =>  (
                        <div  id={'actor'} key={actorId}>
                        {actors[actorId].firstName} {actors[actorId].lastName}
                    </div>
                    ))}
                </div>)
            }

        </div>
    )
}

export default FilmItem;