import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './login.css';

let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [user, setUser] = useState({});

	const handleChange = e => {
		if (e.target.id === 'email') setEmail(e.target.value);
        if (e.target.id === 'password') setPassword(e.target.value);
        console.log(email, password)
	};

	const handleSumbit = e => {
		e.preventDefault();
		fetch(`${url}api/users/login`, {
            method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then(response => response.json())
			.then(response => {
				console.log(response, 'is login response');
                localStorage.token = response.userId.token;
				localStorage._id = response.userId._id;
				localStorage.setItem('created', true)
				console.log(localStorage, 'from login ');
			})
			.then(e => props.history.push('/home'))
			.catch(err => console.error(err));
	};

	return (
		<div className='register'>
			<Navbar />
			<h1 className='register-h1'>Login</h1>
			<form className='register-form' onSubmit={handleSumbit}>
				<fieldset>
					<div className='form-group'>
						<label htmlFor='email'>Email address</label>
						<input
							type='email'
							className='form-control'
							id='email'
							aria-describedby='emailHelp'
							placeholder='Enter email'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input type='password' className='form-control' id='password' placeholder='Password' onChange={handleChange} />
					</div>
				</fieldset>
				<button className='btn btn-success'>Submit</button>
			</form>
		</div>
	);
};

export default Login;
