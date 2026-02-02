"use client"
import { usePlayground } from "@/modules/playground/hooks/usePlayground"
import { useParams } from "next/navigation"


const MainPlaygroundpage = () =>{
    const {id} = useParams()

    const {playgroundData, templateData, isLoading, error, saveTemplateData} = usePlayground(id) //usePlayground(id)
    console.log("temeplatedata",templateData);
    console.log("playgroundData",playgroundData);
    
    return(
        <div>
            <h1>Playground Page</h1>
            <p>Playground ID: {id}</p>
        </div>
    )
}


export default MainPlaygroundpage