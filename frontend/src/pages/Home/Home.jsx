import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import './home.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import circlePurple from '../../assets/circle-purple.svg';
import circlePink from '../../assets/circle-pink.svg';
import circleSkyblue from '../../assets/circle-sky-blue.svg';
import circleNearTorqois from '../../assets/circle-near-torqois.svg';
import girl from '../../assets/girl.svg';
import Card from './components/Card';
import TagsInput from './components/TagInput';
import Editcontainer from './components/EditContainer';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
export default function Home() {
	const navigate = useNavigate();
	const [ noteId, setNoteId ] = useState('');
	const [ deleted, setDeleted ] = useState(false);
	const [ filteredData, setFilteredData ] = useState([]);
	const [ file, setFile ] = useState('');
	const [ tags, setTags ] = useState([]);
	const [ title, setTitle ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ noteText, setNoteText ] = useState('');
	const [ showEdit, setShowEdit ] = useState(false);
	const [ showAdd, setShowAdd ] = useState(false);
	const [ accessToken, setAccessToken ] = useState('');
	const [ catSelected, setCatSelected ] = useState('');
	const [ userObject, setUserObject ] = useState({});
	const [ notes, setNotes ] = useState([]);
	const triggerShowEditContainer = (showOrNot) => {
		setShowEdit(showOrNot);
	};
	const handleChange = (e) => {
		const searchWord = e.target.value;
		if (searchWord === '') {
			setFilteredData(notes);
		}

		const newFilter = notes.filter((value) => value.title.toLowerCase().includes(searchWord.toLowerCase()));
		setFilteredData(newFilter);
	};
	const triggerShowAddContainer = (showOrNot) => {
		setShowAdd(showOrNot);
	};
	const notebackground = (note) => {
		if (note.category === 'Work') return '#d2ceff';
		if (note.category === 'Study') return '#d1e5f7';
		if (note.category === 'Entertainment') return '#ffcece';
		if (note.category === 'Family') return '#daf2d6';
	};
	const handleAdding = async () => {
		if (title == '' || file === null || noteText === '' || catSelected === '') {
			alert('Please fill out all the fields');
			return;
		}
		let formData = new FormData();
		formData.append('title', title);
		formData.append('category', category);
		tags.forEach((tag) => {
			formData.append('tags[]', tag);
		});
		formData.append('note', noteText);
		formData.append('note_image', file[0]);
		console.log(formData.get('note_image'));
		fetch(`http://localhost:5000/api/notes/add/${userObject._id}`, {
			headers: { authorization: `Bearer ${accessToken}` },
			body: formData,
			method: 'POST'
		})
			.then(async (res) => {
				try {
					const data = await res.json();
					if (res.status !== 200) {
						console.log(data.message);
						return;
					}
					populateNotes(userObject);
					alert(data.message);
				} catch (err) {
					console.log(err);
				}
			})
			.catch((err) => console.log(err));
	};
	const populateNotes = async (user) => {
		try {
			const response = await fetch(`http://localhost:5000/api/notes/${user._id}`, {
				headers: { 'Content-Type': 'application/json', authorization: `Bearer ${accessToken}` },
				method: 'GET'
			});
			const data = await response.json();
			if (response.status !== 200) {
				console.log(data.message);
				return;
			}
			if (response.status == 200) {
				setNotes(data.notes);
				setFilteredData(data.notes);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const refreshtJwtToken = async (refresh) => {
		try {
			const result = await fetch(`http://localhost:5000/api/users/refresh-token/${refresh}`, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST'
			});
			const data = await result.json();
			if (result.status !== 200) {
				console.log(data.message);
				return;
			}
			const access = cookie.set('access-token', data.accessToken, {
				path: '/',
				maxAge: 3600,
				sameSite: 'strict'
			});
			setAccessToken(access);
		} catch (error) {}
	};
	const selectedTags = (tags) => {
		setTags(tags);
	};
	useEffect(
		() => {
			if (deleted === true) {
				populateNotes(userObject);
				setDeleted(false);
			}
		},
		[ deleted ]
	);
	useEffect(() => {
		const access = cookie.get('access-token');
		const refresh = cookie.get('refresh-token');
		setAccessToken(access);
		if (!access) {
			navigate('/auth', { replace: true });
			return;
		}
		jwt.verify(access, 'B>g(_#xV9b%PtWR{', (err, decoded) => {
			if (err) {
				if (err.message == 'jwt expired') {
					refreshtJwtToken(refresh);
					return;
				}
				console.log(err);
				return;
			}
			const user = decoded.user;
			setUserObject(user);
			populateNotes(user);
		});
	}, []);
	return (
		<div>
			<Navbar
				triggerShowAdd={triggerShowAddContainer}
				username={userObject.username}
				handleChange={handleChange}
			/>
			<div className="home-container">
				<div className={showEdit || showAdd === true ? 'overlay show' : 'overlay'} />
				{/* ? Edit Container Start*/}
				<Editcontainer noteId={noteId} showEdit={showEdit} setShowEdit={setShowEdit} notes={filteredData} />
				{/* ? Edit Container End*/}
				{/* ? Add Container Start*/}
				<div className={showAdd === true ? 'add-container view' : 'add-container'}>
					<div className="top-section">
						<button className="cancel" onClick={() => setShowAdd(!showAdd)}>
							Cancel
						</button>
						<button className="add" onClick={handleAdding}>
							Add
						</button>
					</div>
					<div className="middle-section">
						<form action="patch" encType="multipart/form-data">
							<div>
								<input
									type="file"
									name="note_image"
									placeholder="Image"
									required
									onChange={(e) => setFile(e.target.files)}
								/>
							</div>
							<div style={{ width: '90%' }}>
								<label htmlFor="Title">Title</label>
								<input
									type="text"
									name="title"
									placeholder="Note title"
									required
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
								<label htmlFor="Note">Note</label>
								<textarea
									name="note"
									cols="30"
									rows="5"
									placeholder="Write your note here..."
									value={noteText}
									required
									onChange={(e) => setNoteText(e.target.value)}
								/>
							</div>
						</form>
					</div>
					<div className="bottom-section">
						<div className="tags">
							<label htmlFor="Tags">Tags</label>
							<TagsInput selectedTags={selectedTags} />
						</div>
						<div className="cat">
							<div className="cat-item">
								<img
									className={catSelected === 'purple' ? 'purple' : ''}
									src={circlePurple}
									alt="circle-purple"
									onClick={() => {
										setCategory('Work');
										setCatSelected('purple');
									}}
								/>
								<p>Work</p>
							</div>
							<div className="cat-item">
								<img
									className={catSelected === 'skyBlue' ? 'skyBlue' : ''}
									src={circleSkyblue}
									alt="circle-purple"
									onClick={() => {
										setCategory('Study');
										setCatSelected('skyBlue');
									}}
								/>
								<p>Study</p>
							</div>
							<div className="cat-item">
								<img
									className={catSelected === 'pink' ? 'pink' : ''}
									src={circlePink}
									alt="circle-purple"
									onClick={() => {
										setCategory('Entertainment');
										setCatSelected('pink');
									}}
								/>
								<p>Entertainment</p>
							</div>
							<div className="cat-item">
								<img
									className={catSelected === 'nearTorqois' ? 'nearTorqois' : ''}
									src={circleNearTorqois}
									alt="circle-purple"
									onClick={() => {
										setCategory('Family');
										setCatSelected('nearTorqois');
									}}
								/>
								<p>Family</p>
							</div>
						</div>
					</div>
				</div>
				{/* ? Add Container End*/}
				<div className="left-side-bar">
					<div className="categories">
						<div className="category-item">
							<img src={circlePurple} alt="circle-purple" />
							<p>Work</p>
						</div>
						<div className="category-item">
							<img src={circleSkyblue} alt="circle-sky-blue" />
							<p>Study</p>
						</div>
						<div className="category-item">
							<img src={circlePink} alt="circle-pink" />
							<p>Entertainment</p>
						</div>
						<div className="category-item">
							<img src={circleNearTorqois} alt="circle-near-torqois" />
							<p>Family</p>
						</div>
					</div>

					<img src={girl} alt="Girl Svg" />
				</div>
				<div className="main-content">
					<div className="note-container">
						{typeof notes !== undefined || notes !== undefined ? (
							filteredData.map((note, i) => {
								return (
									<Card
										key={i}
										triggerShowEditContainer={triggerShowEditContainer}
										background={notebackground(note)}
										note={note}
										deleted={deleted}
										setDeleted={setDeleted}
										setNoteId={setNoteId}
									/>
								);
							})
						) : (
							<div style={{ display: 'flex', height: '70vh', alignItems: 'center' }}>
								<h1
									style={{
										fontSize: '1em',
										color: '#727272dd',
										fontWeight: '500'
									}}
								>
									Nothing to show
								</h1>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
