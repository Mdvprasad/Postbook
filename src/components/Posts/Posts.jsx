import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import PopUp from '../../utils/PopUp';
import { useDispatch, useSelector } from 'react-redux';
import { retrievePosts } from '../../store/asyncActions/posts';
import Post from './Post';
import useWindowSize from '../../utils/useWindowSize';
import './posts.css';
import Select from 'react-select';

function Posts(props) {
    const { width } = useWindowSize();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const dispatch = useDispatch();
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [operation, setOperation] = useState(null);
    const posts = useSelector(state => state.posts);
    const options = posts.map(function (post) {
        return {
            "value": post.title,
            "label": post.title
        };
    });
    useEffect(() => {
        dispatch(retrievePosts());
    }, [])
    const handlePopUp = (event) => {
        event.preventDefault();
        setId(id);
        setOperation(null);
        setOpen(true);
    }
    const handleAdd = (event) => {
        event.preventDefault();
        setSelectedPost(null);
        setOpen(true);
        setOperation("Add");
    }

    return (

        <>
            <section className='header' >
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    className="select"
                    isClearable="true"
                />
                <Button color="default" className='add' variant='contained' onClick={(e) => handleAdd(e)}>Add New Post</Button>
            </section>
            <section className='posts'>
                {(selectedOption !== null ?
                    (posts.filter(post => post.title === selectedOption.value)) :
                    posts).map((post, i) => <Post post={post} setSelectedPost={setSelectedPost} index={i} postId={id} setOperation={setOperation} operation={operation} setPostId={setId} open={open} setOpen={setOpen} posts={posts} />)}
            </section>
            {open && <PopUp open={open} selectedPost={selectedPost} operation={operation} setOpen={setOpen} setId={setId} list={posts} id={id} />}
        </>
    )
}

Posts.propTypes = {}

export default Posts
