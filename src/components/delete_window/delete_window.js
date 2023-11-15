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
    const [position, setPosition] = useState({ x: 0, y: 0 });


    const navigate = useNavigate();
    const { state, dispatch, dataActions}= useDataStorageContext();
    const currentFilmId =useParams().filmId;
    const filmId = currentFilmId;

    const deleteFilm =  () =>{
        dispatch(dataActions.deleteFilm(filmId));
        navigate('/')
    }



    // const handleResizeStart = () => {
    //     setResizing(true);
    // };
    //
    // const handleResizeStop = () => {
    //     setResizing(false);
    // };
    //
    // const handleMouseMove = (e) => {
    //     if (resizing) {
    //         setWidth(e.clientX - resizableRef.current.getBoundingClientRect().left);
    //         setHeight(e.clientY - resizableRef.current.getBoundingClientRect().top);
    //     }
    // };
    //
    // const handleResize = (e, { size }) => {
    //     setWidth(size.width);
    //     setHeight(size.height);
    // };
    //
    const handleDrag = (e, { x, y }) => {
        setPosition({ x, y });
    };
    const resizableRef = useRef(null);

    return(

        // <Resizable
        //     style={{ marginLeft: 100, marginTop: 100, border: "1px solid black" }}
        //     size={{ width: windowState.width, height: windowState.height }}
        //     onResizeStop={(e, direction, ref, d) => {
        //         setWindowState({
        //             width: windowState.width + d.width, height: windowState.height + d.height,});
        //     }}>
        <ResizePanel direction="w" style={{ width: '400px' }} handleClass='customHandle' borderClass='customResizeBorder'>
        <Draggable handle=".handle"
                   defaultPosition={{ x: (window.innerWidth-200)/2, y: (window.innerHeight-100)/2 }}
                   position={{ x: (window.innerWidth-360)/2, y: (window.innerHeight-100)/2 }}
                   bounds={{ left: 0, top: 0, right: window.innerWidth - 360, bottom: window.innerHeight - 100 }}
                   onStop={handleDrag}>
                <div className="window">
                    <div className="handle">
                    <div className="content">
                        <p>Resizable Content</p>
                        <Button text={'Cancel'} color={'yellow'} lnk={()=>navigate(-1)}/>
                        <Button text={'Delete anyway'} color={'red'} lnk={deleteFilm}/>
                    </div>
                    </div>
                </div>
        </Draggable>
        </ResizePanel>


    )
}

export default Delete;