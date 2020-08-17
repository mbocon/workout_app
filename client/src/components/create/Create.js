import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import AddExercise from '../addExercise/AddExercise';
import './create.css';

let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const Create = props => {
	const [user, setUser] = useState({});

	useEffect(() => {
		fetch(`${url}api/users/${localStorage._id}`)
			.then(response => response.json())
			.then(json => setUser(json));
	}, []);
	// console.log(user, 'from create');

	return (
		<div className='create'>
			<Navbar />
			{localStorage.token ? (
				<div className='create-page'>
					<h2 className='home-h2'>Get after it {user.name}</h2>
					<div className='create-main'>
						<div className='new-workout'>
							<AddExercise props={props}/>
                        </div>
					</div>
				</div>
			) : (
				<div className='home-page'>
					<h1>You must be logged in to access this page</h1>
					<button className='btn btn-success' onClick={() => props.history.push('/login')}>
						Login
					</button>
				</div>
			)}
		</div>
	);
};

export default Create;
