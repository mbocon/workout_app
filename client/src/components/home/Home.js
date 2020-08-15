import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
// import CreateWorkout from '../createWorkout/CreateWorkout';
import Workouts from '../workouts/Workouts';
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
	console.log(user, 'from home');

	return (
		<div className='home'>
			<Navbar />
			{localStorage.token ? (
				<div className='home-page'>
					<h2 className='home-h2'>Welcome {user.name}</h2>
					<div className='home-main'>
						<div className='new-workout'>
							<button className='btn btn-success' onClick={() => props.history.push('/create')}>
								Create new workout
							</button>
						</div>

						<div className='workouts'>
							<Workouts />
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

export default Home;
