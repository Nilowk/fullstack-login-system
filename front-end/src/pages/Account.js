import React, {useEffect, useState} from 'react';
import eye from "../img/eye.png";
import closeEye from "../img/close-eye.png";
import axios from "axios";

function Account() {

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordIsVisible, setPasswordVisible] = useState(false);
    const [wantDelete, setWantDelete] = useState(false);

    useEffect(() => {

        if (localStorage.getItem("login-data") != null) {

            const loginData = JSON.parse(localStorage.getItem("login-data"))
            setPseudo(loginData.pseudo)
            setEmail(loginData.email)
            setPassword(loginData.password)

        } else if (window.sessionStorage.getItem("login-data") != null) {

            const loginData = JSON.parse(window.sessionStorage.getItem("login-data"))
            setPseudo(loginData.pseudo)
            setEmail(loginData.email)
            setPassword(loginData.password)

        } else {

            window.location.replace("http://localhost:3000/login")

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
        const data = {
            "email": email,
            "password": password,
            "pseudo": pseudo
        }

        if (JSON.stringify(data) !== localStorage.getItem("login-data") && JSON.stringify(data) !== window.sessionStorage.getItem("login-data")) {

            axios.put("http://localhost:9000/api/v1/users/" + email, data)

            if (localStorage.getItem("login-data")) {

                localStorage.setItem("login-data", JSON.stringify(data))

            } else {

                window.sessionStorage.setItem("login-data", JSON.stringify(data))

            }

        }

    }

    const handleDelete = (e) => {

        e.preventDefault()
        const data = localStorage.getItem("login-data") ? JSON.parse(localStorage.getItem("login-data")) : JSON.parse(window.sessionStorage.getItem("login-data"))
        axios.delete("http://localhost:9000/api/v1/users/" + data.email + "/delete/" + data.password).then(response => {

            if (response.status === 200) {

                localStorage.removeItem("login-data")
                window.sessionStorage.removeItem("login-data")
                window.location.replace("http://localhost:3000/register")

            }

        })

    }

    const handleDisconnect = () => {

        localStorage.removeItem("login-data")
        window.sessionStorage.removeItem("login-data")
        window.location.replace("http://localhost:3000/login")

    }

    return (

        <div className={"loginPage"}>

            <div className={"modal"}>

                <div style={{position: "relative"}}>
                    <input className={"loginInput"} value={pseudo} onChange={(e) => handleChange(e, setPseudo)} type={"text"} />
                    <span className={pseudo ? "placeholder placeholder-click" : "placeholder"} onClick={handleClickToFocus}>Nom d'utilisateur</span>
                </div>

                <div style={{position: "relative"}}>
                    <input className={"loginInput"} value={email} type={"email"} onChange={() => {return}} />
                    <span className={email ? "placeholder placeholder-click" : "placeholder"} onClick={handleClickToFocus}>Adresse e-mail</span>
                </div>

                <div style={{position: "relative"}}>
                    <input className={"loginInput"} value={password} onChange={(e) => handleChange(e, setPassword)} type={passwordIsVisible ? "text" : "password"} />
                    <span className={password ? "placeholder placeholder-click" : "placeholder"} onClick={handleClickToFocus}>Mot de passe</span>
                    <img className={"showPass interact"} onClick={() => setPasswordVisible(passwordIsVisible ? false : true)} alt={""} src={passwordIsVisible ? eye : closeEye} width={"20px"} />
                </div>

                <button className={"connect-button"} onClick={handleSubmit}>
                    <p style={{fontWeight: "bold", fontSize: "9pt", color: "#FAFAFA"}}>MODIFIER</p>
                </button>

                <button className={"delete-button"} style={{marginTop: "20px", marginBottom: "20px"}} onClick={() => setWantDelete(true)}>
                    <p style={{fontWeight: "bold", fontSize: "9pt", color: "#FAFAFA"}}>SUPPRIMER</p>
                </button>

                <p onClick={handleDisconnect} style={{display: "flex", justifyContent: "center", color: "#B71C1C", cursor: "pointer", textDecorationLine: "underline"}}>se déconnecter</p>

            </div>

            {wantDelete &&
                <div className={"delete-modal"}>
                    <p style={{color: "white"}}>Voulez vous vraiment supprimer votre compte ?</p>
                    <div>
                        <button className={"connect-button"} style={{marginTop: "20px", marginRight: "20px", width: "100px"}} onClick={() => setWantDelete(false)}>
                            <p style={{fontWeight: "bold", fontSize: "9pt", color: "#FAFAFA"}}>NON</p>
                        </button>
                        <button className={"delete-button"} style={{marginTop: "20px", marginLeft: "20px", width: "100px"}} onClick={handleDelete}>
                            <p style={{fontWeight: "bold", fontSize: "9pt", color: "#FAFAFA"}}>OUI</p>
                        </button>
                    </div>
                </div>
            }

        </div>

    )

}

export default Account;