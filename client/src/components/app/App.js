import React from 'react';
import './App.css';
import Navbar from '../navbar/Navbar';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<div className='container'>
				<h1 className='welcome-h1'>Welcome to Traynr</h1>
				<h4 className='welcome-h4'>Create and keep track of your workouts with ease</h4>
			</div>
		</div>
	);
}

export default App;
