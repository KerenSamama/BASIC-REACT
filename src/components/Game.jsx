import React, { useState, useEffect } from 'react';
import styles from '../css/Game.module.css';

const Game = ({ username, onFinishTurn, onDisconnect, currentPlayerIndex, playerIndex }) => {
    const [number, setNumber] = useState(Math.floor(Math.random() * 99) + 1);
    const [steps, setSteps] = useState(1);
    const [currentPlayer, setCurrentPlayer] = useState({ username: '', scores: [] });
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isDisconnectVisible, setIsDisconnectVisible] = useState(false);

    useEffect(() => {
        const players = JSON.parse(localStorage.getItem("players")) || [];
        const player = players.find(player => player.username === username);
        setCurrentPlayer(player || { username: '', scores: [] });
    }, [username]);

    const updatePlayerScores = () => {
        const players = JSON.parse(localStorage.getItem("players")) || [];
        const updatedPlayers = players.map(player => {
            if (player.username === currentPlayer.username) {
                const newScores = [...player.scores, steps];
                const average = Math.round(newScores.reduce((acc, score) => acc + score, 0) / newScores.length);
                return { ...player, scores: newScores, average };
            }
            return player;
        });

        localStorage.setItem("players", JSON.stringify(updatedPlayers));
        setCurrentPlayer(prevPlayer => {
            const newScores = [...prevPlayer.scores, steps];
            const average = Math.round(newScores.reduce((acc, score) => acc + score, 0) / newScores.length);
            return { ...prevPlayer, scores: newScores, average };
        });
    };

    const handleOperation = (operation) => {
        if (currentPlayerIndex === playerIndex && isGameStarted) {
            let newNumber;
            switch (operation) {
                case 'plusOne':
                    newNumber = number + 1;
                    break;
                case 'minusOne':
                    newNumber = number - 1;
                    break;
                case 'multiplyByTwo':
                    newNumber = number * 2;
                    break;
                case 'divideByTwo':
                    newNumber = Math.floor(number / 2);
                    break;
                default:
                    return;
            }
            const newSteps = steps + 1;
            setNumber(newNumber);
            setSteps(newSteps);

            if (newNumber === 100) {
                updatePlayerScores();
                setSteps(1);
                setNumber(Math.floor(Math.random() * 99) + 1);
                setIsDisconnectVisible(true);
                setIsGameStarted(false);
            } else {
                onFinishTurn();
            }
        }
    };

    const handleStart = () => {
        if (currentPlayerIndex === playerIndex) {
            setIsGameStarted(true);
        }
    };

    const handleDisconnect = () => {
        onDisconnect(currentPlayer.username);
        onFinishTurn();  // Passer au joueur suivant après la déconnexion
    };

    return (
        <div className={styles.information}>
            {currentPlayer ? (
                <div>
                    <h1>PLAYER {currentPlayer.username}</h1>
                    <h3>Scores : {currentPlayer.scores.join(', ')}</h3>
                </div>
            ) : (
                <div>Chargement...</div>
            )}
            <div className={styles.play}>
                <p>Number : {number}</p>
                <p>Steps : {steps}</p>
                <div className='button_of_the_game'>
                    <button type="button" onClick={() => handleOperation('plusOne')} disabled={currentPlayerIndex !== playerIndex || !isGameStarted}>
                        +1
                    </button>
                    <button type="button" onClick={() => handleOperation('minusOne')} disabled={currentPlayerIndex !== playerIndex || !isGameStarted}>
                        -1
                    </button>
                    <button type="button" onClick={() => handleOperation('multiplyByTwo')} disabled={currentPlayerIndex !== playerIndex || !isGameStarted}>
                        *2
                    </button>
                    <button type="button" onClick={() => handleOperation('divideByTwo')} disabled={currentPlayerIndex !== playerIndex || !isGameStarted}>
                        /2
                    </button>
                    <button type="button" onClick={handleStart} disabled={isGameStarted || currentPlayerIndex !== playerIndex}>Start</button>
                    {isDisconnectVisible && <button type="button" onClick={handleDisconnect}>Disconnect</button>}
                </div>
            </div>
            {number === 100 && (
                <div>
                    <h2>Congratulations ! You have reached 100 in {steps} steps!</h2>
                </div>
            )}
        </div>
    );
};

export default Game;
