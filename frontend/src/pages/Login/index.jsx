import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ajax, ajax_or_login } from '../../util/ajax';
import { UserContext } from '../../contexts/UserContext';
import AuthLayout from '../../components/Auth/AuthLayout';
import AuthField from '../../components/Auth/AuthField';
import AuthButton from '../../components/Auth/AuthButton';

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setId } = useContext(UserContext);

    function handle_submit(event) {
        let data = new FormData(event.target);

        ajax("/api/token/", {
            method: "POST",
            body: data,
        })
            .then(request => request.json())
            .then(json => {
                if ('access' in json) {
                    localStorage.setItem('access', json.access);
                    ajax_or_login('/currentuser/', {
                        method: 'GET',
                    }, navigate)
                        .then(response => response.json())
                        .then(userJson => {
                            const userId = Number(userJson.id);
                            localStorage.setItem("userID", String(userId));
                            localStorage.setItem("isSeeker", JSON.stringify(!!userJson.is_seeker));
                            setId(userId);
                            navigate('/');
                        })
                        .catch(error => {
                            console.error('Error fetching current user:', error);
                        });
                }
                else if ('detail' in json) {
                    setError("Invalid username and password combination.");
                }
                else {
                    setError("Invalid username and password combination.")
                }
            })
            .catch(error => {
                setError(error);
            });

        event.preventDefault();
    }

    return (
        <AuthLayout title="Welcome back" subtitle="Log in to continue your adoption journey.">
            <form className="flex flex-col gap-4" onSubmit={handle_submit}>
                <AuthField label="Email" type="email" id="email" name="email" required />
                <AuthField label="Password" type="password" id="password" name="password" required />

                {error && (
                    <p className="font-semibold text-sm text-red-500 -mt-1">{error}</p>
                )}

                <AuthButton type="submit">Log in</AuthButton>

                <p className="text-center text-sm text-text/70">
                    Don't have an account yet?
                    <Link to="/signup/seeker/" className="text-accent-100 font-semibold"> Sign up</Link>
                </p>
            </form>
        </AuthLayout>
    )
}

export default Login