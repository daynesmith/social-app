import axios  from "axios";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
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


    return(
        <div className = "postPage">
            <div className = "leftSide">
                <div className = "title">{postObject.title}</div>
                <div className = "postText">{postObject.postText}</div>
                <div className = "footer">{postObject.username}</div>
            </div>
            <div className = "rightSide">
                <div className = "addCommentContainer">
                    <input type = "text" placeholder ="comment..."/>
                    <button>Add Comment</button>
                </div>
                <div className = "listOfComments">
                    {comments.map((comment, key)=> {
                        return <div className = "comment">{comment.commentBody}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post