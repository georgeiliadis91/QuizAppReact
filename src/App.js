import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import EditQuiz from './routes/EditQuiz';
import Dashboard from './routes/Dashboard';
import { AuthProvider } from './contexts/Auth';
import { QuizProvider } from './contexts/Quiz';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<AuthProvider>
			<QuizProvider>
				<Router>
					<div className="App">
						<h2>Καλώς ήρθατε!</h2>
						<PrivateRoute exact path="/" component={Home} />
						<PrivateRoute exact path="/dashboard/" component={Dashboard} />
						<PrivateRoute exact path="/editquiz/:id" component={EditQuiz} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={SignUp} />
					</div>
				</Router>
			</QuizProvider>
		</AuthProvider>
	);
}

export default App;
