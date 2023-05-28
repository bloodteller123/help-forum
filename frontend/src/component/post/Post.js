import {Fragment, React, useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Moment from 'react-moment';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import {faUpLong, faDownLong, faComment} from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router-dom';
import { postComment, upvoteComment, downvotePost } from '../../reducers/postReducer';
import '../../css/Post.css'
const Post = ({post}) => {

    const [expand, toggleExpand] = useState(false)
    const [comment, setComment] = useState({
        text:""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const post = useSelector(state=> state.posts.post)
    const stringAvatar = (name) => {
        return {
          children: name.split(' ').length > 1?`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase() : name.slice(0,1).toUpperCase(),
        };
    }
    
    const handleInput = (e) =>{
        setComment({text:e.target.value})
    }

    const submitComment = async () =>{
        console.log(comment)
        try {
            await dispatch(postComment({id:post._id, data:comment})).unwrap()
            setComment({
                text:""
            })
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <>
    {/* https://codepen.io/moshfequr9/pen/wXQbPR */}
        <div className="tweet-wrap">
            <div className="tweet-header">
                <IconButton onClick={()=>navigate(`/profile/user/${post.user._id}`)}>
                    <Avatar {...stringAvatar(post.user.name)} />
                </IconButton>
                <div className="tweet-header-info">
                    {post.user.name}<span><Moment format='YYYY-MM-DD HH:mm'>{post.date}</Moment> </span>
                    <h4>{post.text}</h4>
                </div>
            </div>

            <div className="tweet-info-counts">
                <div className="comments">
                
                <FontAwesomeIcon onClick={()=>toggleExpand(prev => !prev)}  icon={faComment}/>
                <div className="comment-count">{(post.comments===undefined || post.comments.length===0)? 0 : post.comments.length}</div>
                </div>
                
                <div className="likes">
                <FontAwesomeIcon onClick={async ()=>{
                    try{
                        await dispatch(upvoteComment(post._id)).unwrap()
                    }catch(error){
                        console.log(error.payload)
                    }
                } }  icon={faUpLong}/>
                <div className="likes-count">
                    {(post.upvotes===undefined || post.upvotes.length===0)? 
                        ((post.downvotes===undefined|| post.downvotes.length===0)? 0 :  0 - post.downvotes.length) 
                        : ((post.downvotes===undefined || post.downvotes.length===0)? post.upvotes.length : post.upvotes.length - post.downvotes.length)}
                </div>
                <FontAwesomeIcon onClick={async ()=>{
                    try{
                        await dispatch(downvotePost(post._id)).unwrap()
                    }catch(error){
                        console.log(error.payload)
                    }
                } } icon={faDownLong}/>
                </div>

            </div>
            <div>
                {expand?
                <div>              
                    <textarea className='input'
                            name='text'
                            placeholder='Leave your comment'
                            value={comment.text}
                            onChange={handleInput}
                        />
                    <div style={{display:'flex'}}><Button style={{marginLeft:'auto'}} onClick={submitComment}>Post</Button></div>
                    <div>
                        {post.comments.map(comment => {
                            return (
                                <div key={comment._id} className="tweet-header">
                                    <Avatar {...stringAvatar(post.user.name)} />
                                        <div className="tweet-header-info">
                                            {comment.user.name}<span><Moment interval={1000} fromNow>{comment.date}</Moment> </span>
                                            <p>{comment.text}</p>
                                        </div>
                                    </div>
                            )
                        })}
                    </div>
                </div>
                    :
                <Fragment>
                </Fragment>}
            </div>
        </div>
    </>
  )
}

export default Post