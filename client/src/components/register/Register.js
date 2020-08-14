import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './register.css';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChange = () => {};

	const handleSumbit = e => {
		e.preventDefault();
	};
	return (
		<div className='register'>
			<Navbar />
			<h1 className='register-h1'>Registration</h1>
			<form className='register-form' onSubmit={handleSumbit}>
				<fieldset>
					<div class='form-group'>
						<label for='exampleInputEmail1'>Email address</label>
						<input
							type='email'
							class='form-control'
							id='exampleInputEmail1'
							aria-describedby='emailHelp'
							placeholder='Enter email'
							onChange={handleChange}
						/>
						<small id='emailHelp' class='form-text text-muted'>
							We'll never share your email with anyone else.
						</small>
					</div>
					<div class='form-group'>
						<label for='exampleInputPassword1'>Password</label>
						<input
							type='password'
							class='form-control'
							id='exampleInputPassword1'
							placeholder='Password'
							onChange={handleChange}
						/>
					</div>
				</fieldset>
			</form>
		</div>
	);
};

export default Register;
