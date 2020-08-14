import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import './home.css';

let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const Home = props => {
	const [user, setUser] = useState({});

	useEffect(() => {
		fetch(`${url}api/users/${localStorage._id}`)
			.then(response => response.json())
			.then(json => setUser(json));
	}, []);

	console.log(user);
	return (
		<div className='home'>
			<Navbar />
			{localStorage.token ? (
				<div className='home-page'>
					<h1>Welcome {user.name}</h1>
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

export default Home;
