import { FormEvent, useState } from "react";
import { useAIGeneration, client } from "../Client";


function GenerateSimple() {

    const [description, setDescription] = useState("");

    const aiClient = useAIGeneration('generateRecipe')
    const data = aiClient[0].data;
    const isLoading = aiClient[0].isLoading;
    const generateRecipe = aiClient[1]

    const handleClick = async (e:FormEvent) => {
        e.preventDefault()
        const result = await client.generations.generateRecipe({
            description: description
        })
        console.log(result)
      };

    return <main>
        <form onSubmit={(e)=>handleClick(e)}>
            <label> Recipe:</label> 
            <input value={description} onChange={(e)=>setDescription(e.target.value)} />
            <input type="submit" value='Generate recipe' />
        </form>
    </main>
}

export default GenerateSimple

