import { FormEvent, useState } from "react";
import { client } from "../Client";

import { Schema } from "../../amplify/data/resource";

type Recipe = Schema['generateRecipe']['type']


function GenerateSimple() {

    const [description, setDescription] = useState("");
    const [generatedRecipe, setGeneratedRecipe] = useState<Recipe>()
    const [generatedImage, setGeneratedImage] = useState<string>()

    const handleClick = async (e: FormEvent) => {
        e.preventDefault()
        const result = await client.generations.generateRecipe({
            description: description
        })
        console.log(result)
        if (result.data) {
            setGeneratedRecipe(result.data)
        }
    };

    function renderRecipe() {
        if (generatedRecipe) {
            const ingredientsList = []
            if (generatedRecipe.ingredients) {
                for (const ingredient of generatedRecipe.ingredients) {
                    ingredientsList.push(<li key={ingredient}>{ingredient}</li>)
                }
            }
            return <div>
                <h2>{generatedRecipe.name}</h2>
                {ingredientsList}
                <h3>{generatedRecipe.instructions}</h3>
            </div>
        }
    }

    async function generateImage(){
        const result = await client.queries.generateImage({
            prompt: `Create an image for this dish: ${description}`
        })
        console.log(result)
        const dataImage = result.data
        if (dataImage && dataImage[0]) {
            const image = dataImage[0]
            setGeneratedImage(`data:image/png;base64,${image}`)
        }
    }

    function renderGeneratedImage(){
        if (generatedImage) {
            return <img src={generatedImage} alt="Generated image" />
        }
    }

    return <main>
        <form onSubmit={(e) => handleClick(e)}>
            <label> Recipe:</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="submit" value='Generate recipe' />
            <button onClick={generateImage}>Generate image</button>
        </form>
        <br />
        {renderRecipe()}
        {renderGeneratedImage()}
    </main>
}

export default GenerateSimple

