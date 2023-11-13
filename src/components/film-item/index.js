import './style.css'
import { useState } from 'react';
import {useDataStorageContext} from "../context/data-storage-context";
import {Link} from "react-router-dom";
import FilmPage from "../film-page";


const FilmItem = ({filmId, filmData, currentPage}) =>{
    const {state: {actors, companies}, dispatch, dataActions} = useDataStorageContext();


    const {name, year, actorsIds, companyId,type, icon} = filmData;

    return (
        <div className={`${currentPage}`}>
            <img id={`${currentPage}__image`} src={icon} alt={''}/>
            <span id={`${currentPage}__name`}>{
                currentPage==='film_item' ?
                    (<Link to={`/film-page/${filmId}`} state={{ filmData }} className={'link'}> {name}</Link>)
                    :(name) }</span>
            <span id={`${currentPage}__year`}>{year}</span>
            <span id={`${currentPage}__company`}>{companies[companyId].name}</span>
            {actorsIds.length >0 && (
                <div id={`${currentPage}__actors`}>
                    {actorsIds.map(actorId =>  (
                        <div key={actorId}>
                        {actors[actorId].firstName} {actors[actorId].lastName}
                    </div>
                    ))}
                </div>)
            }
            <span id={`${currentPage}__type`}>{type}</span>
        </div>
    )
}

export default FilmItem;