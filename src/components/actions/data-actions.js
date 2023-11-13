const DATA_ACTION_GROUP = 'DATA_ACTIONS';

export const CREATE_FILM_ACTION = `${DATA_ACTION_GROUP}/CREATE_FILM`;
export const UPDATE_FILM_ACTION = `${DATA_ACTION_GROUP}/UPDATE_FILM`;
export const DELETE_FILM_ACTION = `${DATA_ACTION_GROUP}/DELETE_FILM`;


const dataActions = {
    createFilm: film => ({
        type: CREATE_FILM_ACTION,
        payload: {film}
    }),
    updateFilm: (filmId,film) =>({
        type: UPDATE_FILM_ACTION,
        payload:{filmId,film}
    }),
    deleteFilm: filmId =>({
        type: DELETE_FILM_ACTION,
        payload: {filmId}
    })
}

export default dataActions;