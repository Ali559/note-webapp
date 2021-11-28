import React, { useEffect, useRef, useState } from 'react';
import storyVector from '../../assets/story.svg';
import './auth.css';
import logo from '../../assets/logo.png';
import LoginContainer from './components/LoginContainer';
import StoryContainer from './components/StoryContainer';
import SignupContainer from './components/SignupContainer';
export default function Auth() {
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ move, setMove ] = useState(false);
	const animate = () => {
		setMove(!move);
	};
	return (
		<div className="container">
			{/* Login */}
			<LoginContainer
				move={move}
				animate={animate}
				logo={logo}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
			/>
			{/* Login ENd */}
			{/* ******************************* */}
			{/* Story */}
			<StoryContainer move={move} storyVector={storyVector} />
			{/* Story End */}
			{/* ********************************** */}
			{/* ? Sign Up */}
			<SignupContainer
				move={move}
				logo={logo}
				animate={animate}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				username={username}
				setUsername={setUsername}
			/>
			{/* Signup End */}
			{/* ************************************ */}
		</div>
	);
}
