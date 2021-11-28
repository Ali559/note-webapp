import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
export default function LoginContainer({ move, animate, logo, email, setEmail, password, setPassword }) {
	const navigate = useNavigate();
	const handleLogin = () => {
		fetch('http://localhost:5000/api/users/login', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({ email, password })
		})
			.then(async (result) => {
				try {
					const data = await result.json();
					if (result.status !== 200) return alert(data.message);
					cookie.set('access-token', data.accessToken, {
						sameSite: 'strict',
						maxAge: 3600,
						path: '/'
					});
					cookie.set('refresh-token', data.refreshToken, {
						sameSite: 'strict',
						maxAge: 605500,
						path: '/'
					});
					navigate('/', { replace: true });
				} catch (error) {
					console.log(error);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className={move === true ? 'login move clicked' : 'login'}>
			<div className="header">
				<img src={logo} alt="Logo" />
				<h2>Login to your account</h2>
			</div>
			<div className="form-container">
				<form>
					<input
						required
						value={email}
						type="email"
						name="email"
						placeholder="johndoe@gmail.com"
						onChange={(e) => {
							setEmail((prev) => (prev = e.target.value));
						}}
					/>
					<input
						required
						value={password}
						type="password"
						name="password"
						placeholder="Password"
						onChange={(e) => {
							setPassword((prev) => (prev = e.target.value));
						}}
					/>
				</form>
			</div>
			<div className="footer">
				<button type="submit" className="btn-submit" onClick={handleLogin}>
					Login
				</button>
				<div className="line" />
				<p className="question">
					Don't have an account? <a onClick={animate}>Signup</a>
				</p>
			</div>
		</div>
	);
}
