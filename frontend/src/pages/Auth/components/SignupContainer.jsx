import React from 'react';

export default function SignupContainer({
	logo,
	move,
	animate,
	navigate,
	email,
	setEmail,
	password,
	setPassword,
	username,
	setUsername
}) {
	const handleSignup = () => {
		fetch('http://localhost:5000/api/users/signup', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({ username, email, password })
		})
			.then(async (result) => {
				const data = await result.json();
				if (result.status !== 200) return alert(data.message);
				alert(data.message);
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	return (
		<div className={move === false ? 'signup move' : 'signup'}>
			<div className="header">
				<img src={logo} alt="Logo" />
				<h2>Create a new account</h2>
			</div>
			<div className="form-container">
				<form>
					<input
						required
						type="text"
						name="username"
						placeholder="John Doe"
						value={username}
						onChange={(e) => setUsername((prev) => (prev = e.target.value))}
					/>
					<input
						required
						type="email"
						name="email"
						placeholder="johndoe@gmail.com"
						value={email}
						onChange={(e) => setEmail((prev) => (prev = e.target.value))}
					/>
					<input
						required
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword((prev) => (prev = e.target.value))}
					/>
				</form>
			</div>
			<div className="footer">
				<button type="submit" className="btn-submit" onClick={handleSignup}>
					Signup
				</button>
				<div className="line" />
				<p className="question">
					Already have an account? <a onClick={animate}>Login</a>
				</p>
			</div>
		</div>
	);
}
