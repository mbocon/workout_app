import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './register.css';

let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const Register = (props) => {
	console.log(props, 'on reg')
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleChange = e => {
		if (e.target.id === 'name') setName(e.target.value)
		if (e.target.id === 'email') setEmail(e.target.value);
		if (e.target.id === 'password') setPassword(e.target.value);
 		console.log(email, password, name)
	};

	const handleSumbit = e => {
		e.preventDefault();
		fetch(`${url}api/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data, 'from reg res')
			})
			.then(props.history.push('/login'))
			.catch(err => console.error(err, 'is error'));
	};
	return (
		<div className='register'>
			<Navbar />
			<h1 className='register-h1'>Registration</h1>
			<form className='register-form' onSubmit={handleSumbit}>
				<fieldset>
					<div className='form-group'>
					<label htmlFor='name'>Username</label>
						<input
							type='name'
							className='form-control'
							id='name'
							aria-describedby='nameHelp'
							placeholder='Enter name'
							onChange={handleChange}
						/>
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
						<input
							type='password'
							className='form-control'
							id='password'
							placeholder='Password'
							onChange={handleChange}
						/>
					</div>
				</fieldset>
				<button className='btn btn-success'>Submit</button>
			</form>
		</div>
	);
};

export default Register;
