import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import EditQuiz from './routes/EditQuiz';
import Dashboard from './routes/Dashboard';
import NotFound from './routes/NotFound';
import { AuthProvider } from './contexts/Auth';
import PrivateRoute from './components/PrivateRoute';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider } from 'react-alert';
import app from './firebase/firebase';

const options = {
	timeout: 5000,
	position: positions.BOTTOM_CENTER
};

const navigation = (
	<ul>
		<li>
			<Link to="/">Home</Link>
		</li>
		<li>
			<Link to="/dashboard">Dashboard</Link>
		</li>
		<li>
			<Link to="/login">Login</Link>
		</li>
		<li>
			<Link to="/signup">Signup</Link>
		</li>
	</ul>
);

function App() {
	return (
		<Provider template={AlertTemplate} {...options}>
			<AuthProvider>
				<Router>
					<div className="App">
						<h2>Καλώς ήρθατε!</h2>
						<button onClick={() => app.auth().signOut()}>Sign out</button>
						{navigation}
						<Switch>
							<PrivateRoute exact path="/" component={Home} />
							<PrivateRoute exact path="/dashboard/" component={Dashboard} />
							<PrivateRoute exact path="/editquiz/:id" component={EditQuiz} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={SignUp} />
							<Route exact path="*" component={NotFound} />
						</Switch>
					</div>
				</Router>
			</AuthProvider>
		</Provider>
	);
}

export default App;
