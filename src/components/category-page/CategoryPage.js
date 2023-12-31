import Header from "../header/Header";
import Films from '../films/index'
import '../main-page/style.css'
import Button from "../button/Button";

const CategoryPage= ()=>{
    return(
        <div className={'main_page_container'}>
            <Header/>
            <div className={'main_page_side_container'}>
                <aside id={'left-sidebar'}/>
                <div className='main_page'>
                    <Films ></Films>
                </div>
                <aside id ={'right-sidebar'}/>
            </div>

        </div>
    )
}

export default CategoryPage;