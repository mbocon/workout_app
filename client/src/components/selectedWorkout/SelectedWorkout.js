import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../navbar/Navbar';
import './selected.css';

const SelectedWorkout = props => {
    console.log(props, 'are selectd props')
	let completed = 'line-through';
	let notCompleted = 'no-line';

	const toggleDone = e => {
		if (e.currentTarget.parentNode.parentNode.className === 'no-line') {
			e.currentTarget.parentNode.parentNode.className = completed;
		} else if (e.currentTarget.parentNode.parentNode.className === 'line-through') {
			e.currentTarget.parentNode.parentNode.className = notCompleted;
		}
	};

	const toggleEdit = (e, item) => {
		console.log(item);
	};

	return (
		<div className='selected'>
			<Navbar />
			<h2 className='home-h2'>Get after it!</h2>
			<ul className='selected-ul'>
				{props.location.state.selected.plan.map(item => {
					return (
						<li key={item._id} className={notCompleted}>
							<span className='selected-span'>{item.activity}:</span> {item.sets} x {item.reps} @ {item.weight}lbs
							<div>
								<button onClick={e => toggleEdit(e, item)} className='btn btn-warning selected-btn'>
									Edit
								</button>
								<button onClick={e => toggleDone(e)} className='btn btn-success selected-btn'>
									Complete
								</button>
							</div>
						</li>
					);
				})}
			</ul>
			<div className='workout-complete-btn-area'>
				<button onClick={()=> props.history.push('/home')} className='btn btn-success workout-complete-btn'>Workout Complete</button>
			</div>
		</div>
	);
};

export default SelectedWorkout;
