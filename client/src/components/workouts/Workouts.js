import React, { useEffect, useState } from 'react';
import './workouts.css';
let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const Workouts = ({ workouts, props }) => {
	const goToSelected = (e, selected, i) => {
        console.log(selected, 'is selceted', i, 'is index');
        console.log(props, 'are props')
        props.history.push({pathname: '/selected', state: {selected: selected}})
	};

	// console.log(workouts, 'are workouts list on workous');
	return (
		<div className='workouts'>
			<h5>Select a Workout</h5>
			<ul className='workout-list'>
				{workouts.map((plan, i) => {
					return (
						<li key={plan.title}>
							<button className='btn btn-secondary' onClick={(e) => goToSelected(e, plan, i)}>{plan.title}</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Workouts;
