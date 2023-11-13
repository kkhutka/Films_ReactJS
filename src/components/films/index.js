import FilmItem from "../film-item";
import {useDataStorageContext} from "../context/data-storage-context";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import './films.css'


const Films = () =>{

    const category = useParams().category;

    const handleSearch = event =>{
        setSearchPhrase(event.target.value)
    }

    const SearchFilm = event =>{
        event.preventDefault();
        const filmFilteredItems = Object.entries(films)
            .filter(([filmId, filmData]) => filmData.name.includes(searchPhrase))
            .map(([filmId, filmData]) => (
                <FilmItem key={filmId} filmId={filmId} filmData={filmData} currentPage={currentPage} />
            ));
        setFilmItems(filmFilteredItems);
    }
    const [searchPhrase, setSearchPhrase] = useState("Enter the name of the film");
    const {state: {films}} = useDataStorageContext();
    let currentPage ='film_item';


    const [filmItems, setFilmItems]=useState([])
    useEffect(() => {
        const updateFilmItems = () => {
            if (category) {
                const categoryItems = Object.entries(films)
                    .filter(([filmId, filmData]) => filmData.type.includes(category))
                    .map(([filmId, filmData]) => (
                        <FilmItem key={filmId} filmId={filmId} filmData={filmData} currentPage={currentPage} />
                    ));
                setFilmItems(categoryItems);
            } else {
                setFilmItems(Object.entries(films).map(([filmId, filmData]) => (
                    <FilmItem key={filmId} filmId={filmId} filmData={filmData} currentPage={currentPage} />
                )));
            }
        };

        updateFilmItems();
    }, [category, films, currentPage]);
    return(
        <div className={'container'}>
            <form className={'searchForm'}  onSubmit={SearchFilm}>
                <input id='serchField' type={'search'} placeholder={searchPhrase} onChange={handleSearch}/>
                <input id='serchSubmit' type={'submit'}/>
            </form>
            <div className={'list_films'}>{filmItems}</div>

        </div>
    )
}

export default Films;