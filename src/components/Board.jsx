import React, { useState, useEffect } from 'react';
import Game from './Game';
import { useNavigate } from "react-router-dom";
import styles from '../css/Board.module.css';

const Board = () => {
    const [players, setPlayers] = useState(JSON.parse(localStorage.getItem("players")) || []);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [disconnectedPlayers, setDisconnectedPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Loaded players: ", players);
    }, [players]);

    const handleWinner = () => {
        navigate('/winner');
    };

    const handleNewUser = () => {
        navigate("/signInUp");
    };

    const handleFinishTurn = () => {
        setCurrentPlayerIndex((prevIndex) => {
            let nextIndex = (prevIndex + 1) % players.length;
            while (disconnectedPlayers.includes(players[nextIndex].username)) {
                nextIndex = (nextIndex + 1) % players.length;
            }
            return nextIndex;
        });
    };

   

    const handleDisconnect = (username) => {
        setDisconnectedPlayers(prevState => [...prevState, username]);
        handleFinishTurn();  // Passer au joueur suivant après la déconnexion
    };

   

    return (
        <div className={styles.zoomOut}>
            <div className={styles.titleContainer}>
                <h1>"GET TO 100"</h1>
                <div className={styles.buttonContainer}>
                    <button className={styles.button_container} onClick={handleWinner}>Winner</button>
                    <button type='button' className={styles.button_container} onClick={handleNewUser}>New User</button>
                </div>
            </div>

            <div className={styles.container}>
                {players.length > 0 ? players.map((player, index) => (
                    !disconnectedPlayers.includes(player.username) && (
                        <div key={index} className={styles.unites}>
                            <Game
                                username={player.username}
                                onFinishTurn={handleFinishTurn}
                                onDisconnect={handleDisconnect}
                                currentPlayerIndex={currentPlayerIndex}
                                playerIndex={index}
                            />
                        </div>
                    )
                )) : <p>No players available</p>}
            </div>
        </div>
    );
};

export default Board;
