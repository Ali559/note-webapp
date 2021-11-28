import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.svg';
import plus from '../assets/plus.svg';
import search from '../assets/searchIcon.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
export default function Navbar({ triggerShowAdd, username, handleChange }) {
	const [ open, setOpen ] = useState(false);
	const [ showAdd, setShowAdd ] = useState(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		fetch('http://localhost:5000/api/users/logout', {
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${cookie.get('access-token')}` },
			method: 'DELETE',
			body: JSON.stringify({ token: cookie.get('refresh-token') })
		})
			.then(async (result) => {
				try {
					const data = await result.json();
					if (result.status !== 200) {
						console.log(data.message);
						return;
					}
					cookie.remove('access-token');
					cookie.remove('refresh-token');
					navigate('/auth', { replace: true });
				} catch (error) {
					console.log(error);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleShowAdd = () => {
		setShowAdd(true);
		triggerShowAdd(showAdd);
	};

	return (
		<nav>
			<Link to="/">
				<img src={logo} className="logo" alt="Logo" />
			</Link>
			<div className="search">
				<input
					type="text"
					name="search"
					onChange={(e) => handleChange(e)}
					placeholder="Search..."
					maxLength={42}
				/>
				<img src={search} alt="Search Icon" />
			</div>
			<ul>
				<li>
					<Link
						to=""
						className={open === true ? `avatar-link open` : `avatar-link`}
						onClick={() => setOpen(!open)}
					>
						<img src={avatar} alt="Avatar" />
					</Link>
					<div className="dropdown">
						<Link className="dropdown-item" to="">
							{username}
						</Link>
						<Link className="dropdown-item" to="" onClick={handleLogout}>
							Logout
						</Link>
					</div>
				</li>
				<li>
					<Link to="" className="plus-link" onClick={handleShowAdd}>
						<img src={plus} alt="Plus" />
					</Link>
				</li>
			</ul>
		</nav>
	);
}
