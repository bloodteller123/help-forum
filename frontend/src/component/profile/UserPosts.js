import {React, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { getPostsByBatches,addPost } from '../../reducers/postReducer';
import Post from '../post/Post';
import '../../css/General.css'
import '../../css/Form.css'
const UserPosts = ({posts, id}) =>{
    const dispatch = useDispatch();

    const [batches, setBatches] = useState(0, ()=>{
        const b = localStorage.getItem(`batch-${id}`);
        return b ? b : 0;
    })
    const [isEnd, toggleEnd] = useState(false)

    useEffect(() =>{
        (async () =>{
            let leng = posts.length;
            localStorage.setItem(`batch-${id}`, batches)
            try {
                await dispatch(getPostsByBatches(batches)).unwrap();
                if(leng + 5 > posts.length) toggleEnd(true);
            } catch (error) {
                console.log(error)
            } 
        })()
    },[batches]);

    const handleScrolling = async () =>{
        setBatches(prev => prev+1)
    }


    return (
        <div className='body-class-mini'>
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

export default UserPosts;

