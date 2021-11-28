import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import settingsVector from '../../../assets/settings.svg';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
const Card = ({ triggerShowEditContainer, background, note, deleted, setDeleted, setNoteId }) => {
	const [ open, setOpen ] = useState(false);
	const [ showEdit, setShowEdit ] = useState(false);
	const handleShowEditContainer = () => {
		setShowEdit(true);
		triggerShowEditContainer(showEdit);
	};
	const handleDelete = async () => {
		try {
			const res = await fetch(`http://localhost:5000/api/notes/delete/${note._id}`, {
				headers: { 'Content-Type': 'application/json', authorization: `Bearer ${cookie.get('access-token')}` },
				method: 'DELETE'
			});
			const data = await res.json();
			if (res.status !== 200) {
				console.log(data.message);
				return;
			}
			alert(data.message);
			setDeleted(true);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {}, [ deleted ]);
	return (
		<div className="note-card" style={{ background: background }}>
			<div className="header">
				<a onClick={() => console.log('Hello')}>
					<h3>{note.title}</h3>
				</a>
				<div>
					<Link
						to=""
						className={open === true ? `setting-link open` : `setting-link`}
						onClick={() => {
							setNoteId(note._id);
							setOpen(!open);
						}}
					>
						<img src={settingsVector} alt="dots" />
					</Link>
					<div className="drp">
						<Link className="drp-item" to="" onClick={handleShowEditContainer}>
							Edit..
						</Link>
						<div className="lin" style={{ width: '100%', height: '1px', background: '#fafadd7b' }} />
						<Link className="drp-item" to="" style={{ color: 'red' }} onClick={handleDelete}>
							Delete
						</Link>
					</div>
				</div>
			</div>
			<div className="note-text">
				<p>{note.note}</p>
			</div>
			<div className="footer">
				<div className="tags-selection">
					{note.tags.map((tag, i) => (
						<div className="tag" key={i}>
							<p>{tag}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Card;
