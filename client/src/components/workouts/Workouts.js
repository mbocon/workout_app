import React, { useEffect, useState } from 'react';
import './workouts.css';
let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const Workouts = ({ workouts, props, deleted, setDeleted }) => {
    const [user, setUser] = useState({});
    console.log(deleted, 'on workouts')
    useEffect(() => {
		fetch(`${url}api/users/${localStorage._id}`)
			.then(response => response.json())
			.then(json => setUser(json));
	}, []);

    console.log(props, 'props on workout')
	const goToSelected = (e, selected, i) => {
		console.log(selected, 'is selceted', i, 'is index');
		console.log(props, 'are props');
		props.history.push({ pathname: '/selected', state: { selected: selected } });
	};

	const handleDelete = (e, id) => {
		console.log(id, ' is id to delete');
		e.preventDefault();
		fetch(`${url}api/workouts/${user._id}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(resp => resp.json())
			.then(data => {
                console.log(data, 'from exercise delete');
                setDeleted(!deleted)
			})
			.catch(err => console.error(err, 'is error'));
	};

	// console.log(workouts, 'are workouts list on workous');
	return (
		<div className='workouts'>
			<h5>Select a Workout</h5>
			<ul className='workout-list'>
				{workouts.map((plan, i) => {
					return (
						<li key={plan.title}>
							<button className='btn btn-secondary' onClick={e => goToSelected(e, plan, i)}>
								{plan.title}
							</button>
							<button className='btn btn-danger' onClick={e => handleDelete(e, plan._id)}>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Workouts;
