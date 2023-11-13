import {useDataStorageContext} from "../context/data-storage-context";


const CompanyItem = ({companyId, companyData}) =>{
    const{state:{films}} = useDataStorageContext();
    const {name, foundYear, filmIds} = companyData;


    return(
        <div className='company_item'>
            <div className='company_item__info'>
                <p>{name}</p>
                <p>{foundYear}</p>
                {
                    filmIds.length>0 &&(
                        <div>
                            {filmIds.map(filmId => films[filmId].name).join(', ')}
                        </div>
                    )
                }
            </div>

        </div>
    )

}

export default CompanyItem;