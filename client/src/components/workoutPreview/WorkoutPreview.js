import React, { useState, useEffect } from 'react';
import './workoutpreview.css';
let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const WorkoutPreview = ({ exercises, getNewData, setGetNewData, props }) => {
	const [workout, setWorkout] = useState([]);
	const [user, setUser] = useState({});
	const [name, setName] = useState('');

	const handleChange = e => {
		if (e.target.id === 'name') setName(e.target.value);
	};

	console.log(props.props, 'is props on workout prev');

	useEffect(() => {
		fetch(`${url}api/users/${localStorage._id}`)
			.then(response => response.json())
			.then(json => setUser(json));
	}, []);

	useEffect(() => {
		setWorkout(exercises);
	}, [exercises]);
	console.log(workout, 'is the workout');

	const createWorkout = e => {
		e.preventDefault();
		// after creation, go to home page and render workouts in the workouts component
		// working on update/delete of workout
		let data = {
			user: user._id,
			plan: exercises,
			title: name,
		};
		fetch(`${url}api/workouts/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(resp => resp.json())
			.then(data => {
                console.log(data, 'from workout res');
                localStorage.setItem('created', true)
            })
            .then(exercises.forEach(exercise =>{
                deleteExercise(e, exercise)
            }))
			.then(props.props.history.push('/home'))
			.catch(err => console.error(err, 'is the error'));
	};

	const deleteExercise = (e, exercise) => {
		e.preventDefault();
		fetch(`${url}api/exercises/${exercise.user}/${exercise._id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data, 'from exercise res');
			})
			.then(setGetNewData(!getNewData))
			.catch(err => console.error(err, 'is error'));
    };

	return (
		<div className='workout-preview'>
			{exercises.length > 0 &&
				exercises.map((exercise, i) => {
					return (
						<ul key={i} className='exercise-list'>
							<li>
								Exercise {i + 1}: <span>{exercise.activity}</span>
							</li>
							{exercise.distance === '' ? null : (
								<li>
									Distance: <span>{exercise.distance}</span>
								</li>
							)}
							{exercise.sets === '' ? null : (
								<li>
									Sets: <span>{exercise.sets}</span>
								</li>
							)}
							{exercise.reps === '' ? null : (
								<li>
									Reps: <span>{exercise.reps}</span>
								</li>
							)}
							{exercise.weight === '' ? null : (
								<li>
									Weight: <span>{exercise.weight}</span>
								</li>
							)}
							<button className='btn btn-danger delete-btn' onClick={e => deleteExercise(e, exercise)}>
								Delete
							</button>
						</ul>
					);
				})}
			{exercises.length === 0 ? null : (
				<div className='create-workout'>
					<form className='create-workout-form'>
						<label htmlFor='name'>Name Workout</label>
						<input type='text' id='name' name='name' onChange={handleChange} required='true'/>
						<button onClick={(e)=> createWorkout(e)} className='btn btn-success create-workout-btn'>Save this Workout</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default WorkoutPreview;
