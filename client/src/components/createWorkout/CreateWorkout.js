import React, { useState, useEffect } from 'react';
import './createworkout.css';
import WorkoutPreview from '../workoutPreview/WorkoutPreview';
let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const CreateWorkout = () => {
	let [activity, setActivity] = useState('');
	let [distance, setDistance] = useState('');
	let [sets, setSets] = useState('');
	let [reps, setReps] = useState('');
	let [weight, setWeight] = useState('');
	let [exercises, setExercises] = useState([]);
	let [user, setUser] = useState({});
	let [getNewData, setGetNewData] = useState(false);

	useEffect(() => {
		fetch(`${url}api/users/${localStorage._id}`)
			.then(response => response.json())
			.then(json => setUser(json));
	}, []);

	useEffect(() => {
		if (getNewData) {
			fetch(`${url}api/exercises/getexercises`)
			.then(response => response.json())
			.then(json => setExercises(json))
			.then(setGetNewData(!getNewData))
		}
	}, [getNewData]);

	// const handleSubmit = e => {
	// 	e.preventDefault();
	// };

	const clearData = e => {
		setActivity('');
		setDistance('');
		setSets('');
		setReps('');
		setWeight('');
	}

	const AddExercise = e => {
		e.preventDefault();
		let form = e.target;
		let data = {
			user: user._id,
			activity: activity,
			distance: distance,
			sets: sets,
			reps: reps,
			weight: weight,
		};
		fetch(`${url}api/exercises/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(resp => resp.json())
			.then(data => {
				// console.log(data, 'from exercise res');
				setExercises(data);
				setGetNewData(!getNewData)
			})
			.then(form.reset())
			.then(clearData())
			.catch(err => console.error(err, 'is error'));
	};

	const handleChange = e => {
		if (e.target.id === 'activity') setActivity(e.target.value);
		if (e.target.id === 'distance') setDistance(e.target.value);
		if (e.target.id === 'sets') setSets(e.target.value);
		if (e.target.id === 'reps') setReps(e.target.value);
		if (e.target.id === 'weight') setWeight(e.target.value);
	};

	return (
		<div className='workout-form'>
			<div className='left'>
				<h5 className='create-h5'>Add Exercise</h5>
				<form className='create-form' onSubmit={e => AddExercise(e)}>
					<label htmlFor='activity'>Activity</label>
					<input type='text' name='activity' id='activity' onChange={handleChange} />
					<label htmlFor='distance'>Distance</label>
					<input type='text' name='distance' id='distance' onChange={handleChange} />
					<label htmlFor='sets'>Sets</label>
					<input type='text' name='sets' id='sets' onChange={handleChange} />
					<label htmlFor='reps'>Reps</label>
					<input type='text' name='reps' id='reps' onChange={handleChange} />
					<label htmlFor='weight'>Weight</label>
					<input type='text' name='weight' id='weight' onChange={handleChange} />
					<div className='form-btns'>
						<button className='btn btn-success create-btn'>Add Exercise</button>
					</div>
				</form>
			</div>
			<div className='right'>
				<h3 className='create-h3'>Workout preview</h3>
				<WorkoutPreview exercises={exercises} getNewData={getNewData} setGetNewData={setGetNewData} />
			</div>
		</div>
	);
};

export default CreateWorkout;
