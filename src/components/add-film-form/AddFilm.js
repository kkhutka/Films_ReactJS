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

    const [iconError, setIconError] = useState("");
    const [nameError, setNameError] = useState("");
    const [yearError, setYearError] = useState("");
    const [typeError, setTypeError] = useState("");
    const handleNameChange = event => {
        const inputValue = event.target.value;
        setName(inputValue);
        if (!inputValue) {
            setNameError("Поле не може бути порожнім");
        } else {
            setNameError("");
        }
    }

    const handleYearChange = event => {
        const inputValue = +event.target.value;
        setYear(inputValue);

        // Валідація числового значення
        if (isNaN(inputValue) || inputValue < 0) {
            setYearError("Введіть коректний рік");
        } else {
            setYearError("");
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
        label: `${actors[actorId].firstName} ${actors[actorId].lastName}`
    }));

    const optionsActors = Object.entries(actors).map(([actorId, actorData]) => ({
        value: actorId,
        label:`${actors[actorId].firstName} ${actors[actorId].lastName}`
    }));

    const handleTypeChange = event => {
        const inputValue = event.target.value;
        setType(inputValue);

        // Валідація на мінімальну довжину тексту
        const minLength = 3;
        if (inputValue.length < minLength) {
            setTypeError(`Мінімум ${minLength} символи`);
        } else {
            setTypeError("");
        }
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
    const handleIconChange = event => {
        const inputValue = event.target.value;
        setIcon(inputValue);

        // Валідація URL
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (inputValue && !urlRegex.test(inputValue)) {
            setIconError("Введіть коректний URL");
        } else {
            setIconError("");
        }

    }

    return (
        <div className={'container'}>
            <div className='add-film'>
                <label className={'add-film_label'}>Icon url:</label><input  className={'add-film_input'} type='text' value={icon} onChange={handleIconChange} placeholder={'URL...'}/>
                <span className="error-message">{iconError}</span>

                <label className={'add-film_label'}>Name:</label><input  className={'add-film_input'} type='text' value={name} onChange={handleNameChange} placeholder={'Name...'}/>
                <span className="error-message">{nameError}</span>

                <label className={'add-film_label'}>Year:</label><input className={'add-film_input'} type='text' value={year} onChange={handleYearChange} placeholder={'Year...'}/>
                <span className="error-message">{yearError}</span>

                <label className={'add-film_label'}>Type:</label><input className={'add-film_input'} type='text' value={type} onChange={handleTypeChange} placeholder={'Type...'}/>
                <span className="error-message">{typeError}</span>

                <label className={'add-film_label'}>Actors:</label><Select styles={customStyles} options={optionsActors} defaultValue={selectedActorOptions}
                                                   onChange={handleActorsChange} isMulti/>
                <label className={'add-film_label'}>Company:</label> <div  className={'company_radio_buttons' }>{optionsCompanies.map(company => (
                <div  key={company.value}>
                    <input className='radio_button'
                        type='radio'
                        id={company.value}
                        name='company'
                        value={company.value}
                        checked={companyId === company.value}
                        onChange={() => handleCompanyChange(company)}
                    />
                    <label htmlFor={company.value} className={'company_label'}>{company.label}</label>
                </div>

            ))}</div>
                <Button text={'Add'} color={'#eabe0d'} lnk={addFilm}/>
            </div>
        </div>
    );

}

export default Add;