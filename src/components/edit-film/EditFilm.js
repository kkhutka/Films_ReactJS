import './EditFilm.css';
import {useDataStorageContext} from "../context/data-storage-context";
import {useParams, useNavigate} from "react-router-dom";
import {useState} from "react";
import Select from "react-select";
import Button from "../button/Button";

const Edit = () =>{
    const currentFilmId =useParams().filmId;
    const {state, dispatch, dataActions} = useDataStorageContext();
    const filmId = currentFilmId;

    const {films, actors, companies} = state;


    const filmData = films[filmId];
    const navigate=useNavigate();


    const [icon, setIcon] = useState(filmData.icon)
    const [name, setName] = useState(filmData.name);
    const [year, setYear] = useState(filmData.year);
    const [actorsIds, setActorsIds] = useState(filmData.actorsIds);
    const [companyId, setCompanyId] = useState(filmData.companyId);
    const [type, setType] = useState(filmData.type);


    const handleIconChange = event => {

        setIcon(event.target.value);

    }
    const handleNameChange = event => {
        setName(event.target.value);
    }

    const handleYearChange = event => {
        const year = +event.target.value;
        if (!isNaN(year)) {
            setYear(year);
        }
    }
    const handleActorsChange = selectedActorOptions => {
        const updatedActorIds = selectedActorOptions.map(({value}) => +value);
        setActorsIds(updatedActorIds);
    }

    const handleCompanyChange = event => {
        const companyId = +event.target.value;
        if (!isNaN(companyId)) {
            console.log(companyId)
            setCompanyId(companyId);
        }
    }

    const selectedActorOptions = actorsIds.map(actorId => ({
        value: `${actorId}`,
        label: `${actors[actorId].firstName} ${actors[actorId].lastName}`
    }));

    const options = Object.entries(actors).map(([actorId, actorData]) => ({
        value: actorId,
        label: `${actors[actorId].firstName} ${actors[actorId].lastName}`
    }));

    const handleTypeChange = event => {
        setType(event.target.value);
    }

    const saveFilm = () => {
        const film = {icon, name, year, actorsIds, companyId,type};
        dispatch(dataActions.updateFilm(filmId, film));
        navigate('/')
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: 250,
            border: '1px solid #eacd0d', // Set the border
            borderRadius: 40, // Set the border-radius
            backgroundColor: '#282c34' // Set the width
        }),
    };

    return (
        <div className={'container'}>
            <div className='edit-film'>
                <label>Icon url:</label><input type='text' value={icon} onChange={handleIconChange}/>
                <label>Name:</label><input type='text' value={name} onChange={handleNameChange}/>
                <label>Year:</label><input type='text' value={year} onChange={handleYearChange}/>
                <label>Type:</label><input type='text' value={type} onChange={handleTypeChange}/>

                <label>Actors:</label><Select styles={customStyles} options={options} defaultValue={selectedActorOptions}
                                                   onChange={handleActorsChange} isMulti/>
                <label>Company:</label><input type='text' value={companyId} onChange={handleCompanyChange}/>

                <Button text={'Save'} color={'#eabe0d'} lnk={saveFilm}></Button>
            </div>
        </div>
    );

}
export default Edit;
