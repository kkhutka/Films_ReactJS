import actorItem from "../actor-item";
import {useDataStorageContext} from "../context/data-storage-context";
import CompanyItem from "../company-item";
const Companies = () =>{
    const {state:{companies}} = useDataStorageContext();
    const companyItems = Object.entries(companies).map(([companyId, companyData]) => <CompanyItem key={companyId} companyId={companyId} companyData={companyData}/>);
    return(
        {companyItems}
    )
}

export default Companies;