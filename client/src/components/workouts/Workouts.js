import React from 'react';
import './workouts.css'

const Workouts = () => {
    return ( 
        <div className="workouts">
        <h5>Select a Workout</h5>
            <ul className="workout-list">
                <li>Workout 1</li>
                <li>Workout 2</li>
                <li>Workout 3</li>
            </ul>
        </div>
     );
}
 
export default Workouts;