import React from 'react';
import Navbar from '../navbar/Navbar';

const SelectedWorkout = (props) => {
    console.log(props.location.state.selected, 'on selected')
    return ( 
        <div className="selected">
        <Navbar />
        <h1>Selected</h1>
        {props.location.state.selected.plan.map(item => {
            return(
                <li>{item.activity}</li>
            )
        })}
        </div>
     );
}
 
export default SelectedWorkout;