import { useReducer } from "react";
import {
    CREATE_FILM_ACTION,
    UPDATE_FILM_ACTION,
    DELETE_FILM_ACTION
} from "../actions/data-actions";
import lala from '../../images/lalaland.jpeg';
import spider from '../../images/spider.jpeg';
import ntbk from '../../images/TheNotebook.jpg';
import actors from "../actors";
import companies from "../companies";

let lastFilmId=0
let lastActorId=0
let lastCompanyId=0

const initialStage = {
    films:{
        [++lastFilmId]:{
            name: 'Spider-Man: No Way Home',
            year: 2021,
            actorsIds: [1,2],
            companyId: 1,
            type:'action',
            icon: spider
        },
        [++lastFilmId]:{
            name: 'The notebook',
            year: 2004,
            actorsIds: [3,4],
            companyId: 2,
            type: 'romantic',
            icon: ntbk
        },
        [++lastFilmId]:{
            name: 'La La Land',
            year: 2019,
            actorsIds:[3,4,5],
            companyId: 2,
            type: 'drama',
            icon: lala
        }
    },
    actors:{
        [++lastActorId]:{
            firstName: 'Tom',
            lastName: 'Holland',
            birthYear: '1995',
            filmsIds:[1]
        },
        [++lastActorId]:{
            firstName: 'Zendaya',
            lastName: 'Coleman',
            birthYear: '1995',
            filmsIds:[1]
        },
        [++lastActorId]:{
            firstName: 'Ryan',
            lastName: 'Gosling',
            birthYear: '1980',
            filmsIds:[2,3]
        },
        [++lastActorId]:{
            firstName: 'Emma',
            lastName: 'Stone',
            birthYear: '1988',
            filmsIds:[2,3]
        },
        [++lastActorId]:{
            firstName: 'Rachel',
            lastName: 'McAdams',
            birthYear: '1978',
            filmsIds:[3]
        }
    },
     companies:{
        [++lastCompanyId]:{
            name: 'Marvel',
            foundYear: 1993,
            filmIds:[1]
        },
         [++lastCompanyId]:{
             name: 'Universal pictures',
             foundYear: 1912,
             filmIds:[2,3]
         },
     }
}

const createFilm = (state, payload) =>{
    const {films, actors, companies} = state;
    films[++lastFilmId]=payload.film;
    return {...state};
}

const updateFilm = (state, payload) =>{
    const {films}  = state;
    films[payload.filmId] = payload.film;
    return {...state};
}

const deleteFilm = (state,payload) =>{
    const {films}  = state;
    const{filmId} = payload;
    delete films[filmId];
    return{...state};
}

const dataStorageReducer = (state, action) =>{
    const {type, payload} = action;

    switch (type) {
        case CREATE_FILM_ACTION:
            return createFilm(state, payload);
        case UPDATE_FILM_ACTION:
            return updateFilm(state, payload);
        case DELETE_FILM_ACTION:
            return deleteFilm(state, payload);
        default:
            return state;
    }
}

const useDataStorage = () => useReducer(dataStorageReducer, initialStage);
export default useDataStorage;