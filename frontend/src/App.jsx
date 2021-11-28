import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/auth" element={<Auth />} />
				<Route exact path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
