import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Create from './components/create/Create';
import { createBrowserHistory } from 'history';
import { Switch, Route, Router } from 'react-router';
import SelectedWorkout from './components/selectedWorkout/SelectedWorkout';

const routes = [
	{
		path: '/register',
		component: Register,
		name: 'Register-Page',
	},
	{
		path: '/login',
		component: Login,
		name: 'Login-Page',
	},
	{
		path: '/home',
		component: Home,
		name: 'UserHome-Page',
	},
	{
		path: '/create',
		component: Create,
		name: 'Create-Page',
	},
	{
		path: '/selected',
		component: SelectedWorkout,
		name: 'Selected-Page',
	},
	{
		path: '/',
		component: App,
		name: 'Main-Page',
	},
];

const root = document.getElementById('root');
const hist = createBrowserHistory();

ReactDOM.render(
	<Router history={hist}>
		<Switch>
			{routes.map(route => {
				return <Route path={route.path} component={route.component} key={route.name}></Route>;
			})}
		</Switch>
	</Router>,
	root,
);
