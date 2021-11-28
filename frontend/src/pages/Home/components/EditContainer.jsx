import React, { useState, useEffect } from 'react';
import TagsInput from './TagInput';
import circlePurple from '../../../assets/circle-purple.svg';
import circlePink from '../../../assets/circle-pink.svg';
import circleSkyblue from '../../../assets/circle-sky-blue.svg';
import circleNearTorqois from '../../../assets/circle-near-torqois.svg';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
const Editcontainer = ({ showEdit, setShowEdit, noteId }) => {
	const [ catSelected, setCatSelected ] = useState('');
	const [ photo, setPhoto ] = useState('');
	const [ tags, setTags ] = useState([]);
	const [ title, setTitle ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ noteText, setNoteText ] = useState('');
	const selectedTags = (tags) => {
		setTags(tags);
	};

	const handleEditing = () => {
		if (title == '' && photo === null && noteText === '' && catSelected === '') {
			alert('Please fill out one or more inputs');
			return;
		}
		let formData = new FormData();
		formData.append('title', title);
		formData.append('category', category);
		tags.forEach((tag) => {
			formData.append('tags[]', tag);
		});
		formData.append('note', noteText);
		formData.append('note_image', photo[0]);
		console.log(...formData);
		fetch(`http://localhost:5000/api/notes/edit/${noteId}`, {
			headers: { authorization: `Bearer ${cookie.get('access-token')}` },
			method: 'PATCH',
			body: formData
		})
			.then(async (res) => {
				try {
					const data = await res.json();
					if (res.status !== 200) {
						console.log(data.message);
						return;
					}
					console.log(data);
				} catch (err) {
					console.log(err);
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className={showEdit === true ? 'edit-container view' : 'edit-container'}>
			<div className="top-section">
				<button className="cancel" onClick={() => setShowEdit(!showEdit)}>
					Cancel
				</button>
				<button className="edit" onClick={handleEditing}>
					Edit
				</button>
			</div>
			<div className="middle-section">
				<form action="patch" encType="multipart/form-data">
					<div>
						<input
							required
							type="file"
							name="note_image"
							placeholder="Image"
							onChange={(e) => setPhoto(e.target.files)}
						/>
					</div>
					<div style={{ width: '90%' }}>
						<label htmlFor="Title">Title</label>
						<input
							required
							type="text"
							name="title"
							placeholder="Note title"
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start'
						}}
					>
						<label htmlFor="Note">Note</label>
						<textarea
							required
							name="note"
							cols="30"
							rows="5"
							placeholder="Write your note here..."
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
	);
};

export default Editcontainer;
