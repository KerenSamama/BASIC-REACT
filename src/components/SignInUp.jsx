import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../css/SignInUp.module.css';

const SignInUp = () => {
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [average, setAverage] = useState(0);

    const navigate = useNavigate();

    const checkExistingPlayer = (usernameToCheck) => {
        const players = JSON.parse(localStorage.getItem("players")) || [];
        return players.some(player => player.username === usernameToCheck);
    };

    useEffect(() => {
        setError(checkExistingPlayer(username) ? "A player with this username already exists" : "");
    }, [username]);

    const handleSignUp = (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (checkExistingPlayer(username)) {
            setError("A player with this username already exists");
            return;
        }

        const players = JSON.parse(localStorage.getItem("players")) || [];
        const newPlayer = { username, mail, password, isLoggedIn: true, scores: [], average };
        players.push(newPlayer);
        localStorage.setItem("players", JSON.stringify(players));
        localStorage.setItem("currentPlayer", JSON.stringify(newPlayer));

        setUsername("");
        setMail("");
        setPassword("");
        setConfirmPassword("");

        navigate(`/`); // Rediriger vers la page du jeu après l'inscription
    };

    const handleReturn = () => {
        navigate("/");
    };

    return (
        <>
            <div>
                <div className={styles.titleContainer2}>
                    <h2>Sign Up </h2>
                    <button type='button' className={styles.buttonSign} onClick={handleReturn}>Return</button>
                </div>
                <div className={styles.container2}>
                    <div className={styles.unites2}>
                        <form className={styles.formSign} onSubmit={handleSignUp}>
                            <input className={styles.input_winner}
                                type="text"
                                id="signup-username"
                                name="signup-username"
                                placeholder="Please choose a Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input className={styles.input_winner}
                                type="email"
                                id="signup-mail"
                                name="signup-mail"
                                placeholder="Please enter mail"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                required
                            />
                            
                            <input className={styles.input_winner}
                                type="password"
                                id="signup-password"
                                name="signup-password"
                                placeholder="Please enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input className={styles.input_winner}
                                type="password"
                                id="signup-confirm-password"
                                name="signup-confirm-password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <button className={styles.buttonSign} type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignInUp;
