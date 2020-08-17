import React from 'react';
import Navbar from '../navbar/Navbar';
import './selected.css';

const SelectedWorkout = (props) => {
    console.log(props.location.state.selected, 'on selected')
    return ( 
        <div className="selected">
        <Navbar />
        <h1>Get some!</h1>
        <h4>Today's workout plan</h4>
        <ul className='selected-ul'>
        {props.location.state.selected.plan.map(item => {
            return(
                <li key={item._id}>{item.activity}: {item.sets} sets of {item.reps} reps per set</li>
            )
        })}
        </ul>
        
        </div>
     );
}
 
export default SelectedWorkout;