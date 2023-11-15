import './delete_window.css'
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {useState, useRef } from "react";
import {useDataStorageContext} from "../context/data-storage-context";
import Button from "../button/Button";
import Films from "../films";
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import ResizePanel from "react-resize-panel";


const Delete = () =>{
    const [windowState, setWindowState] = useState({ width: 320, height: 200 });
    const [position, setPosition] = useState({ x: (window.innerWidth-200)/2, y: (window.innerHeight-100)/2 });


    const navigate = useNavigate();
    const { state, dispatch, dataActions}= useDataStorageContext();
    const currentFilmId =useParams().filmId;
    const filmId = currentFilmId;

    const deleteFilm =  () =>{
        dispatch(dataActions.deleteFilm(filmId));
        navigate('/')
    }

    const handleDrag = (e, { x, y }) => {
        setPosition({ x, y });
    };

    return(


        <Draggable handle=".handle"
                   defaultPosition={{ x: (window.innerWidth-200)/2, y: (window.innerHeight-100)/2 }}
                   position={position}
                   bounds={{ left: 0, top: 0, right: window.innerWidth - 360, bottom: window.innerHeight - 100 }}
                   onStop={handleDrag}>
                <div className="window">
                    <div className="handle">
                    <div className="content">
                        <p style={{fontFamily:"Comic Sans MS", textAlign: "center"}}>Are you sure?</p>
                        <div className={'delete_buttons'}>
                            <Button text={'Cancel'} color={'#eabe0d'} lnk={()=>navigate(-1)}/>
                            <Button text={'Delete anyway'} color={'red'} lnk={deleteFilm}/>
                        </div>
                    </div>
                    </div>
                </div>
        </Draggable>


    )
}

export default Delete;