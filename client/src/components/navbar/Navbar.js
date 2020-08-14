import React, { useEffect, useState }from 'react';
import './navbar.css';
let url;
if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:4000/';
} else {
	url = '/';
}

const Navbar = (props) => {
	console.log(localStorage, 'from nav')
	const handleLogout = () => {
		localStorage.clear()
		window.location.href = 'http://localhost:3000/'
	}
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
			<a className='navbar-brand' href='/'>
				Traynr
			</a>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarColor01'
				aria-controls='navbarColor01'
				aria-expanded='false'
				aria-label='Toggle navigation'>
				<span className='navbar-toggler-icon'></span>
			</button>

			<div className='collapse navbar-collapse' id='navbarColor01'>
				<ul className='navbar-nav mr-auto'>
					<li className='nav-item'>
						<a className='nav-link' href='/home'>
							Home <span className='sr-only'>(current)</span>
						</a>
					</li>
					{localStorage.token ? null :
						<li className='nav-item'>
							<a className='nav-link' href='/register'>
								Register
							</a>
						</li>
					}
					{localStorage.token ? 
						<li className='nav-item'>
						<a className='nav-link' onClick={handleLogout}>
							Logout
						</a>
					</li>
					: <li className='nav-item'>
					<a className='nav-link' href='login'>
						Login
					</a>
				</li>
					}
					
                </ul>
                <div className='d-flex flex-row-reverse'>
                    <a className='p-2 mb2' href="https://www.mikebocon.com" target='_blank' rel="noopener noreferrer" >MB2</a>
                </div>
			</div>
		</nav>
	);
};

export default Navbar;
