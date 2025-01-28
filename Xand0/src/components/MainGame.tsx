import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

type Xor0 = 'X' | '0'
type cellState = '' | Xor0
type allowedNumbers = 0 | 1 | 2
type cell = {
    row: allowedNumbers,
    col: allowedNumbers,
    side: Xor0
}

type withUnSub = {
    unsubscribe: Function
}

function MainGame(props: { gameId: string }) {

    const client = generateClient<Schema>();
    const [statusMessage, setStatusMessage] = useState<string | undefined>()
    const [nickName, setNickName] = useState<string | undefined>()
    const [game, setGame] = useState<Schema['Game']['type']>();
    const [side, setSide] = useState<Xor0 | 'notSetYet'>('notSetYet');
    const [gameState, setGameState] = useState<cellState[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ])
    let initialSub: withUnSub | undefined
    let movesSub: withUnSub | undefined

    if (!nickName) {
        const name = window.prompt('Enter your name', 'player') + '_' + Math.floor(Math.random() * 101).toString();
        setNickName(name)
    }

    useEffect(() => {
        console.log(`subscribing to updates for game ${props.gameId} and side: ${side}`)
        initialSub = client.models.Game.onUpdate({
            filter: {
                id: {
                    eq: props.gameId
                }
            }
        }).subscribe({
            next: (data) => {
                setGame(data)
            },
            error: (err) => {
                console.log('error: ' + err)
            }
        });
    }, [])

    function subscribeForGameMoves(arg: 'X' | '0'){
        if (initialSub) {
            initialSub.unsubscribe();
        }
        console.log(`Side chosen, subscribing to updates for game ${props.gameId} and side: ${arg}`)
        movesSub = client.models.Game.onUpdate({
            filter: {
                id: {
                    eq: props.gameId
                },
                lastMoveBy: {
                    ne: arg
                }
            }
        }).subscribe({
            next: (data) => {
                console.log('received game data: ')
                console.log(data)
                setGame(data)
                if (data.moves) {
                    updateCells(data.moves)
                }
            },
            error: (err) => {
                console.log('error: ' + err)
            }
        })
        console.log(movesSub)
    }

    function updateCells(moves: Array<string | null>) {
        const cells = parseUpdates(moves)
        const newGameState = [...gameState]
        cells.forEach((cell: cell) => {
            newGameState[cell.row][cell.col] = cell.side
        })
        setGameState(newGameState)
        checkForVictoryAndShowMessage(newGameState)
    }

    function parseUpdates(moves: Array<string | null>): cell[] {
        const parsedCells: cell[] = []
        for (const move of moves) {
            if (move) {
                if (move[2] !== side) {
                    parsedCells.push({
                        row: parseInt(move[0]) as allowedNumbers,
                        col: parseInt(move[1]) as allowedNumbers,
                        side: move[2] as Xor0
                    })
                }
            }
        }
        return parsedCells
    }

    async function chooseSide(arg: 'X' | '0') {
        if (arg === 'X') {
            await client.models.Game.update({
                id: props.gameId,
                playerX: nickName
            })
            setGame({
                ...game!,
                playerX: nickName
            })
        }
        if (arg === '0') {
            await client.models.Game.update({
                id: props.gameId,
                player0: nickName
            })
            setGame({
                ...game!,
                player0: nickName
            })
        }
        setSide(arg)
        window.alert(`You chose ${arg}`)
        subscribeForGameMoves(arg);
    }

    function renderSideChooser() {
        if (side !== 'notSetYet') {
            return null
        }
        function renderChooseX() {
            if (game?.playerX == undefined) {
                return <button onClick={() => chooseSide('X')}>Choose X</button>
            }
        }
        function renderChooseO() {
            if (game?.player0 == undefined) {
                return <button onClick={() => chooseSide('0')}>Choose O</button>
            }
        }
        return (
            <div>
                {renderChooseX()}
                <br />
                {renderChooseO()}
                <br />
            </div>
        )
    }

    async function updateCell(cell: cell) {
        const gameMoves = game!.moves ? game!.moves : []
        await client.models.Game.update({
            id: props.gameId,
            moves: [...gameMoves, `${cell.row}${cell.col}${cell.side}`],
            lastMoveBy: side
        })
    }

    async function clickCell(row: allowedNumbers, col: allowedNumbers) {
        console.log(`click: row ${row} col ${col}`)
        if (gameState[row][col] !== '') {
            return;
        }
        if (game?.lastMoveBy && game.lastMoveBy === side) {
            window.alert('Not your turn')
            return;
        }
        const newGameState = [...gameState]

        if (side !== 'notSetYet') {
            newGameState[row][col] = side
            setGameState(newGameState)
            await updateCell({ row, col, side })
        }
        checkForVictoryAndShowMessage(newGameState)

    }

    function checkForVictoryAndShowMessage(cells: cellState[][]) {
        const winner = checkForVictory(cells)
        if (winner) {
            if (movesSub) {
                movesSub.unsubscribe();
            }
            if (winner == side) {
                setStatusMessage('You won!')
            } else {
                setStatusMessage('You lost!')
            }
        }
    }

    function checkForVictory(cells: cellState[][]): cellState {
        // check for winning combinations and return the winner if there is one
        if (cells[0][0] === cells[0][1] && cells[0][1] === cells[0][2] && cells[0][0] !== '') {
            return cells[0][0]
        }
        if (cells[1][0] === cells[1][1] && cells[1][1] === cells[1][2] && cells[1][0] !== '') {
            return cells[1][0]
        }
        if (cells[2][0] === cells[2][1] && cells[2][1] === cells[2][2] && cells[2][0] !== '') {
            return cells[2][0]
        }
        if (cells[0][0] === cells[1][0] && cells[1][0] === cells[2][0] && cells[0][0] !== '') {
            return cells[0][0]
        }
        if (cells[0][1] === cells[1][1] && cells[1][1] === cells[2][1] && cells[0][1] !== '') {
            return cells[0][1]
        }
        if (cells[0][2] === cells[1][2] && cells[1][2] === cells[2][2] && cells[0][2] !== '') {
            return cells[0][2]
        }
        if (cells[0][0] === cells[1][1] && cells[1][1] === cells[2][2] && cells[0][0] !== '') {
            return cells[0][0]
        }
        if (cells[0][2] === cells[1][1] && cells[1][1] === cells[2][0] && cells[0][2] !== '') {
            return cells[0][2]
        }
        return ''

    }

    function renderGameTable() {
        if (game?.player0 && game.playerX && side !== 'notSetYet') {
            return <div>
                <button onClick={() => clickCell(0, 0)}>{gameState[0][0]}</button> <button onClick={() => clickCell(0, 1)}>{gameState[0][1]}</button> <button onClick={() => clickCell(0, 2)}>{gameState[0][2]}</button><br />
                <button onClick={() => clickCell(1, 0)}>{gameState[1][0]}</button> <button onClick={() => clickCell(1, 1)}>{gameState[1][1]}</button> <button onClick={() => clickCell(1, 2)}>{gameState[1][2]}</button><br />
                <button onClick={() => clickCell(2, 0)}>{gameState[2][0]}</button> <button onClick={() => clickCell(2, 1)}>{gameState[2][1]}</button> <button onClick={() => clickCell(2, 2)}>{gameState[2][2]}</button><br />
            </div>
        }

    }

    return (
        <div>
            <h2>Main Game</h2>
            <p>Game ID: {props.gameId}</p>
            {renderSideChooser()}
            <br />
            {renderGameTable()}
            <br />
            {statusMessage}

        </div>
    );



}




export default MainGame;