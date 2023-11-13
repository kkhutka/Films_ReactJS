import {useDataStorageContext} from "../context/data-storage-context";
import ActorItem from "../actor-item";

const Actors = () =>{
    const {state:{actors}} = useDataStorageContext();
    const actorItems = Object.entries(actors).map(([actorId, actorData]) => <ActorItem key={actorId} actorId={actorId} actorData={actorData}/>);
    return(
        {actorItems}
    )
}

export default Actors;