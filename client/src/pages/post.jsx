import axios  from "axios";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`)
        .then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`)
        .then((response) => {
            setComments(response.data);
        });

    }, []);

    const addComment = () => {
        axios
        .post("http://localhost:3001/comments", {
            commentBody: newComment,
             PostId: id,
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }
            )
            .then((response) => {
                if(response.data.error) {
                    console.log(response.data.error);
                } else {
                const commentToAdd = {commentBody: newComment,username: response.data.username}
                setComments([...comments, commentToAdd])
                setNewComment("");
                }
        });
    }
    return(
        <div className = "postPage">
            <div className = "leftSide">
                <div className = "post" id ="individual">
                <div className = "title">{postObject.title}</div>
                <div className = "body">{postObject.postText}</div>
                <div className = "footer">{postObject.username}</div>
                </div>
            </div>
            <div className = "rightSide">
                <div className = "addCommentContainer">
                    <input 
                    type = "text" 
                    value = {newComment}
                    placeholder ="comment..." 
                    onChange = {(event) => {
                        setNewComment(event.target.value);
                    }}
                    />
                    <button onClick = {addComment}>Add Comment</button>
                </div>
                <div className = "listOfComments">
                    {comments.map((comment, key)=> {
                        return (
                            <div className = "comment">
                                {comment.commentBody}
                            <label> Username: {comment.username}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post