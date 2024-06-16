import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../css/Winner.module.css';

const Winner = () => {
    // Récupérer les joueurs depuis le localStorage
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const navigate = useNavigate();
    
    // Map chaque joueur à un objet contenant leur username et leur average
    const bestOfPlayers = players.map((player) => ({
        username: player.username,
        average: player.average
    }));

    const bestOfPlayers2 = bestOfPlayers.filter((player) => player.average > 0)

    // Trier les joueurs par average en ordre décroissant
    const sortedPlayers = bestOfPlayers2.sort((a, b) => a.average - b.average);

    // Obtenir les top 3 joueurs
    const top3Players = sortedPlayers.slice(0, 3);

    console.log(top3Players);

    const handleReturn = () => {
        navigate("/");
    };
    

    return (
        <div>
            <div className={styles.titleContainerWinner}>
            <h1>Top 3 Players...<i className="fas fa-trophy"></i></h1>
            <button type='button' className={styles.button_winner2} onClick={handleReturn}>Return</button>
           
            </div>
            <div className={styles.titleBodyWinner}>
            <ol>
                {top3Players.map((player, index) => (
                    <li key={index}>
                        <strong> <i className="fa fa-star" aria-hidden="true"></i> PLAYER : {player.username}</strong> <br></br>Final score: {player.average}
                    </li>
                ))}
            </ol>
            
            </div>
        </div>
    );
};

export default Winner;
