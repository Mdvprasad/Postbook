import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveComments } from '../../store/asyncActions/comments';
import { Button } from '@material-ui/core';
import PopUp from './PopUp';
import './comments.css';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    button: {
        margin: '10px'
    },
    cardHeader: {
        backgroundColor: 'red',
        textAlign: 'center',
        color: 'white',
        padding: "5px 0"
    },
    content: {
        padding: '0 10% !important',
        backgroundColor: 'aliceblue',
        textAlign: 'left',
    }
}));


function Comments({ id, setOperation, operation, post }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments);
    const [selectedComment, setSelectedComment] = useState(null);
    const [commentId, setCommentId] = useState(null);
    const [postId, setPostId] = useState(null);
    const classes = useStyles();
    const [data, setData] = useState([]);
    useEffect(() => {
        dispatch(retrieveComments())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }, [open])
    const handleAdd = (event) => {
        event.preventDefault();
        setSelectedComment(null);
        setOpen(true);
        setOperation("Add");
    }
    function handlePopUp(event, i, data) {
        event.preventDefault();
        setSelectedComment(data)
        setCommentId(i);
        setOperation(null);
        setOpen(true);
    }
    const selectedComments = comments.filter(comment => comment.post_id === id);
    return (
        <div>{selectedComments.length > 0 ? selectedComments.map((d, i) =>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={(e) => handlePopUp(e, d.id, d)} aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    className={classes.cardHeader}
                    title={`${d.name} <${d.email}>`}
                />
                <CardContent className={classes.content}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {d.body}
                    </Typography>
                </CardContent>
            </Card>) : <>
            <Typography>
                No comments are there for this post
            </Typography>
        </>}<Button className={classes.button} color="secondary" variant="contained" onClick={(e) => handleAdd(e)}>
                Add Comment
            </Button>
            {open && <PopUp open={open} operation={operation} selectedComment={selectedComment} post={post} setOpen={setOpen} setId={setCommentId} list={comments} id={commentId} postId={id} />}
        </div>
    )
}

Comments.propTypes = {}

export default Comments
