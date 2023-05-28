import {React, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { getPostsByBatches,addPost } from '../../reducers/postReducer';
import Post from './Post';
import '../../css/General.css'
import '../../css/Form.css'
const Posts = () =>{
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts)
    const [batches, setBatches] = useState(0, ()=>{
        const b = localStorage.getItem('batch');
        return b ? b : 0;
    })
    const [isEnd, toggleEnd] = useState(false)
    const [text, setText] = useState({
        text:"",
    })
    // useEffect(() =>{
    //     (async () =>{
    //         await dispatch(getPostsByBatches(batches)).unwrap();
    //     })()
    // },[]);
    const handleUpdate = (e) =>{
        setText(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    useEffect(() =>{
        (async () =>{
            let leng = posts.length;
            localStorage.setItem(`batch`, batches)
            try {
                await dispatch(getPostsByBatches(batches)).unwrap();
                if(leng + 5 > posts.length) toggleEnd(true);
            } catch (error) {
                console.log(error)
            } 
        })()
    },[batches]);

    const handleScrolling = async () =>{
        setBatches(b => b+1)
    }

    const submitPost = async () =>{
        if(text && text.text===""){
            alert("Post must not be empty");
            return;
        }
        try {
            let p = await dispatch(addPost(text)).unwrap();
            console.log(p)
            setText({
                text:""
            })
        } catch (error) {
            console.log(error.payload)
        } 
    }

    return (
        <div className='body-class-mini'>
            <div className='post-box'>
                <textarea className='input-mini'
                    name='text'
                    placeholder="What's happening?"
                    value={text.text}
                    onChange={handleUpdate}
                    required
                />
                <div style={{display:'flex'}}><Button style={{marginLeft:'auto',marginRight: '22%'}} onClick={submitPost}>Post</Button></div>
            </div>
            <div id="scrollableDiv" style={{ height: '100%', overflow: "auto" }}>
                <InfiniteScroll 
                    dataLength={posts.length}
                    next={handleScrolling}
                    hasMore={!isEnd}
                    loader={<CircularProgress />}
                    scrollThreshold={0.8}
                    // height does the trick????
                    height={500}
                    endMessage={
                        <p style={{textAlign:'center'}}><b>Yay! You've seen it all!</b></p>
                    }
                    scrollableTarget="scrollableDiv"
                    >
                    {posts && posts.map(post =>{return <Post key = {post._id} post = {post}/>})}
                </InfiniteScroll>
            </div>

        </div>
    )
}

export default Posts;

