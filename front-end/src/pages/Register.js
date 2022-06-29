import React, {useState} from 'react';

import eye from "../img/eye.png";
import closeEye from "../img/close-eye.png";
import axios from "axios"

function Register() {

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordIsVisible, setPasswordVisible] = useState(false);

    const handleChange = (e, set) => {

        e.preventDefault()
        set(e.target.value)

    }

    const handleClickToFocus = (e) => {

        e.preventDefault()
        e.target.previousSibling.focus()

    }

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.post("http://localhost:9000/api/v1/users/create-user", {
            "email": email,
            "password": password,
            "pseudo": pseudo
        }).then(r => {

            window.location.replace("http://localhost:3000/login")

        })

    }

    return (
        <div className={"loginPage"}>

            <div className={"modal"}>

                <div style={{position: "relative"}}>
                    <input className={"loginInput"} value={pseudo} onChange={(e) => handleChange(e, setPseudo)} type={"text"} />
                    <span className={pseudo ? "placeholder placeholder-click" : "placeholder"} onClick={handleClickToFocus}>Nom d'utilisateur</span>
                </div>

                <div style={{position: "relative"}}>
                    <input className={"loginInput"} value={email} onChange={(e) => handleChange(e, setEmail)} type={"email"} />
                    <span className={email ? "placeholder placeholder-click" : "placeholder"} onClick={handleClickToFocus}>Adresse e-mail</span>
                </div>

                <div style={{position: "relative"}}>
                    <input className={"loginInput"} value={password} onChange={(e) => handleChange(e, setPassword)} type={passwordIsVisible ? "text" : "password"} />
                    <span className={password ? "placeholder placeholder-click" : "placeholder"} onClick={handleClickToFocus}>Mot de passe</span>
                    <img className={"showPass interact"} onClick={() => setPasswordVisible(passwordIsVisible ? false : true)} alt={""} src={passwordIsVisible ? eye : closeEye} width={"20px"} />
                </div>

                <button className={"connect-button"} onClick={handleSubmit}>
                    <p style={{fontWeight: "bold", fontSize: "9pt", color: "#FAFAFA"}}>S'ENREGISTRER</p>
                </button>

            </div>

        </div>
    )

}

export default Register;