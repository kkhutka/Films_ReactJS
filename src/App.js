import './App.css';
import DataStorageProvider from "./components/context/data-storage-context";
import FilmPage from "./components/film-page/film-page";
import Delete from "./components/delete_window/delete_window";
import Edit from "./components/edit-film/EditFilm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/main-page";
import AddFilm from "./components/add-film-form/AddFilm";
//import Films from "./components/films";
import CategoryPage from "./components/category-page/CategoryPage";
function App() {
  return (
    <DataStorageProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/film-page/:filmId' element={<FilmPage/>}></Route>
                <Route path='/film-page/:filmId/delete' element={<Delete/>}></Route>
                <Route path='/film-page/:filmId/edit' element={<Edit/>}></Route>
                <Route path='/add' element={<AddFilm/>}></Route>
                <Route path='/' element={<MainPage/>}></Route>
                <Route path='/:category' element={<CategoryPage/>}></Route>

            </Routes>
        </BrowserRouter>

    </DataStorageProvider>
  );
}

export default App;
