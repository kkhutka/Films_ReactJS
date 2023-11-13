import './Add.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import {useDataStorageContext} from "../context/data-storage-context";
import Button from "../button/Button";


const Add = () =>{
    const {state, dispatch, dataActions} = useDataStorageContext();
    const {films,actors, companies} = state;
    const navigate = useNavigate();

    const [icon, setIcon] = useState("")
    const [name, setName] = useState("");
    const [year, setYear] = useState(0);
    const [actorsIds, setActorsIds] = useState([]);
    const [companyId, setCompanyId] = useState(0);
    const [type, setType] = useState("");


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

    const handleCompanyChange = selectedOption => {
        const companyId = selectedOption.value;
        setCompanyId(companyId);
    }

    const optionsCompanies = Object.entries(companies).map(([companyId, companyData]) => ({
        value: companyId,
        label: companyData.name
    }));

    const selectedActorOptions = actorsIds.map(actorId => ({
        value: `${actorId}`,
        label: actors[actorId].firstName
    }));

    const optionsActors = Object.entries(actors).map(([actorId, actorData]) => ({
        value: actorId,
        label: actorData.firstName
    }));

    const handleTypeChange = event => {
        setType(event.target.value);
    }
    const addFilm = () => {
        const film = {icon, name, year, actorsIds, companyId, type};
        dispatch(dataActions.createFilm(film));
        navigate('/')
    }
    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: 260,
            border: '1px solid #eacd0d', // Set the border
            borderRadius: 40, // Set the border-radius
            backgroundColor: '#282c34' // Set the width
        }),
    };

    return (
        <div className={'container'}>
            <div className='add-film'>
                <label>Name:</label><input type='text' value={name} onChange={handleNameChange} placeholder={'Name...'}/>
                <label>Year:</label><input type='text' value={year} onChange={handleYearChange} placeholder={'Year...'}/>
                <label>Type:</label><input type='text' value={type} onChange={handleTypeChange} placeholder={'Type...'}/>
                <label>Actors:</label><Select styles={customStyles} options={optionsActors} defaultValue={selectedActorOptions}
                                                   onChange={handleActorsChange} isMulti/>
                <label>Company:</label><Select styles={customStyles} options={optionsCompanies} defaultValue={optionsCompanies.find(option => option.value === companyId)}
                                              onChange={handleCompanyChange} />
                <Button text={'Add'} color={'#eabe0d'} lnk={addFilm}/>
            </div>
        </div>
    );

}

export default Add;