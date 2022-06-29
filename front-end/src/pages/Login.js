import React, {useEffect, useState} from 'react';
import './Login.css';

import { Link } from "react-router-dom";

import eye from "../img/eye.png";
import closeEye from "../img/close-eye.png";

import axios from "axios";

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordIsVisible, setPasswordVisible] = useState(false)
    const [isRemember, setRemember] = useState(false)

    useEffect(() => {

        if (localStorage.getItem("login-data") || window.sessionStorage.getItem("login-data")) {

            window.location.replace("http://localhost:3000/account")

        }

    }, [])

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

        axios.get("http://localhost:9000/api/v1/users/" + email + "/login/" + password).then(response => {

            if (response.status === 200 && response.data !== "") {

                if (response.data.verify === false) return;

                const pseudo = response.data.pseudo

                if (isRemember) {

                    localStorage.setItem("login-data", JSON.stringify({
                        "email": email,
                        "password": password,
                        "pseudo": pseudo
                    }))

                } else {

                    window.sessionStorage.setItem("login-data", JSON.stringify({
                        "email": email,
                        "password": password,
                        "pseudo": pseudo
                    }))

                }

                window.location.replace("http://localhost:3000/account")

            }

        })

    }

    return (
        <div className={"loginPage"}>

            <div className={"modal"}>

                <div style={{position: "relative"}}>
                    <input className={"loginInput"} value={email} onChange={(e) => handleChange(e, setEmail)} type={"email"} />
                    <span className={email ? "placeholder placeholder-click" : "placeholder"} onClick={handleClickToFocus}>Adresse e-mail</span>
                </div>

                <div style={{position: "relative"}}>
                    <input className={"loginInput"} value={password} onChange={(e) => handleChange(e, setPassword)} type={passwordIsVisible ? "text" : "password"} />
                    <span className={password ? "placeholder placeholder-click" : "placeholder"} onClick={handleClickToFocus}>Mot de passe</span>
                    <img className={"showPass interact"} onClick={() => setPasswordVisible(passwordIsVisible ? false : true)} alt={""} src={passwordIsVisible ? eye : closeEye} width={"20px"} />
                </div>

                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                    <div style={{color: "#BDBDBD", display: "flex", alignItems: "center"}}>
                        <input type={"checkbox"} onChange={() => setRemember(isRemember ? false : true)} value={isRemember} />
                        <p style={{paddingLeft: "10px", fontSize: "10pt"}}>Mémoriser</p>
                    </div>
                    <div>
                        <Link to={"/forgot-password"} style={{fontSize: "10pt", color: "#FAFAFA", textUn: "#FAFAFA"}}>
                            <p>Mot de passe oublié</p>
                        </Link>
                    </div>
                </div>

                <button className={"connect-button"} onClick={handleSubmit}>
                    <p style={{fontWeight: "bold", fontSize: "9pt", color: "#FAFAFA"}}>SE CONNECTER</p>
                </button>

            </div>

        </div>
    )

}

export default Login;