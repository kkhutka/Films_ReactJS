import './Header.css'
import {Link} from "react-router-dom";


const Header =() =>{
    let category = 'spider';
    return(
        <div className={'header'}>
            <Link to={`/`} className={'header_link_home'}>Fun.tv</Link>
            <Link to={`/action`} className={'header_link'}>Action</Link>
            <Link to={`/drama`} className={'header_link'}>Drama</Link>
            <Link to={`/romantic`} className={'header_link'}>Romantic</Link>
        </div>
    )
}

export default Header;