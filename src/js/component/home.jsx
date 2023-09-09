import React, { useState, useEffect } from "react";
import Comment from "./comment";


//create your first component
const Home = () => {
	const [comments, setComments] = useState([])
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/comments')
    	.then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			// Read the response as json.
			return response.json();
		})
    	.then(responseAsJson => {
		 	setComments(responseAsJson.map(c => c.body));
    	 })
    	.catch(error => {
	    	console.log('Looks like there was a problem: \n', error);
   		 });
	}, [])

	function postComment() {
		setComments(comments.concat(newComment));

		fetch('https://jsonplaceholder.typicode.com/comments', {
			method: 'POST',
			body: JSON.stringify(newComment),
			headers:{
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (!res.ok) throw Error(res.statusText);
			return res.json();
		})
		.then(response => console.log('Success:', response))
		.catch(error => console.error(error));
	}

	function deleteComment (index){
		setComments(comments.filter((c, i) => {
			return i !== index
		}));

		fetch(`https://jsonplaceholder.typicode.com/comments/${index}`, {
			method: 'DELETE',
			headers:{
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (!res.ok) throw Error(res.statusText);
			return res.json();
		})
		.then(response => console.log('Success:', response))
		.catch(error => console.error(error));
	}

	return (
		<div className="container">
			<div className="form-group mb-2">
				<label for="comment">Write comment</label>
				<input type="text" onChange={e => {setNewComment(e.target.value)}} className="form-control" id="comment"/>
			</div>
			<button type="submit" onClick={postComment} className="btn btn-primary">Post</button>

			{comments.map((c, index) => (
				<Comment text={c} index={index} deleteComment={deleteComment} />
			))}

			
		</div>
	);
};

export default Home;
