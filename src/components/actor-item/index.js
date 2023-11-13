import './style.css'
import { useState } from 'react';
import {Link} from "react-router-dom";
import {useDataStorageContext} from "../context/data-storage-context";
import dataActions from "../actions/data-actions";

const ActorItem = ({actorId,actorData}) =>{
    const {state:{films}, dispatch, dataActions}=useDataStorageContext();
    const{firstName, lastName, birthYear, filmsIds} = actorData;
    return (
        <div className='actor_item'>
            <div className='actor_itme__info'>
                <p>{firstName}</p>
                <p>{lastName}</p>
                <p>{birthYear}</p>

                {filmsIds.length>0 && (
                    <div>
                        {filmsIds.map(filmId => films[filmId].name).join(', ')}
                    </div>
                )}
            </div>
        </div>
    )


}


export default ActorItem;
