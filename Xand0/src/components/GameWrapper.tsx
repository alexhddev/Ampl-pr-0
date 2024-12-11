import { useState } from "react"
import GameIntro from "./GameIntro"
import MainGame from "./MainGame"


function GameWrapper() {

    const [gameId, setGameId] = useState<string | undefined>()

    function joinOrCreateGame(){
        if (gameId) {
            return <MainGame gameId={gameId}/>
        } else {
            return <GameIntro gameIdSetter = {setGameId}/>
        }
    }

    return (
        <main>
            {joinOrCreateGame()}
        </main>
    )

}

export default GameWrapper