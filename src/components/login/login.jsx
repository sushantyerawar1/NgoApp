import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from './login.module.css'


const Login = ({ setUser }) => {

    const navigate = useNavigate();

    const [Login, setLogin] = React.useState({
        Name: "",
        Email: "",
        Password: "",
    });

    const handlechange = e => {
        const { name, value } = e.target;
        setLogin({ ...Login, [name]: value });
    };


    console.log(Login, 'data')

    const handleclick = () => {
        axios.post('https://ngoapp01.azurewebsites.net/api/v1/Adminlogin', Login)
            .then((res) => {
                console.log(res, 'res')
                if (res.data.success) {
                    alert(res.data.message);
                    const { data } = res.data;
                    setUser(data);
                    navigate('/home');
                }
                else {
                    alert(res.data.message);
                }
                setLogin({
                    Name: "",
                    Email: "",
                    Password: "",
                })
            })
    };


    return (
        <div className="container">
            <h3 className="hand">NGO APP</h3>
            <div className="box">
                <p className="label">Login</p>

                <input
                    type="text"
                    className={style.usernameinput}
                    placeholder="Username"
                    name="Name"
                    onChange={(e) => handlechange(e)}
                    value={Login.Name}
                />

                <input
                    type="email"
                    className={style.emailinput}
                    placeholder="Email"
                    name="Email"
                    onChange={(e) => handlechange(e)}
                    value={Login.Email}
                />

                <input
                    type="password"
                    className={style.passinput}
                    placeholder="Password"
                    name="Password"
                    onChange={(e) => handlechange(e)}
                    value={Login.Password}
                />


                <button type="button" className="btn" onClick={() => handleclick()}>
                    LOGIN
                </button>
            </div>
        </div>
    );
}
export default Login;