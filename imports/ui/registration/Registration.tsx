import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';

export const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()


    const onSubmit = async () => {
        Accounts.createUser({
            username: username,
            password: password,
        });
        navigate('/login')
    }

    return (
        <form onSubmit={onSubmit} className="login-form">
            <div>
                <label htmlFor="username">Username</label>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>


            <div>
                <button type="submit">Registration</button>
            </div>
        </form>
    );
};