import React, { useState, useEffect } from 'react';
import './workoutpreview.css';
let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const WorkoutPreview = ({ exercises, getNewData, setGetNewData }) => {
	const [workout, setWorkout] = useState([]);

	useEffect(() => {
		setWorkout(exercises);
	}, [exercises]);
	console.log(workout, 'is the workout');

	const createWorkout = e => {
		e.preventDefault();
		// create workout model in server/models
		// create workout route
		// after creation, go to home page and render workouts in the workouts component
		// working on update/delete of workout
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
					<form onSubmit={() => createWorkout}>
						<button className='btn btn-success create-workout-btn'>Save this Workout</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default WorkoutPreview;
