import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import Comments from '../Comments/Comments';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '5px 0'
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
    cardHeader: {
        backgroundColor: '#0066CC',
        textAlign: 'center',
        color: 'white'
    },
    button: {
        margin: '10px'
    },
}));

export default function Post({ post, setPostId, index, operation, setOpen, postId, setOperation, setSelectedPost }) {
    const { title, body, id } = post;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handlePopUp = (event) => {
        event.preventDefault();
        setSelectedPost(post);
        setPostId(id);
        setOperation(null);
        setOpen(true);
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.cardHeader}
                    action={
                        <IconButton onClick={(e) => handlePopUp(e, id)} aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {body}
                    </Typography>
                </CardContent>
                <Button className={classes.button} color={expanded ? 'primary' : 'secondary'} variant='contained' onClick={() => setExpanded(!expanded)}>{expanded ? "Hide Comments" : "Expand Comments"}</Button>
                {expanded &&
                    <div className='comments'><Comments id={id} postId={postId} post={post} setPostId={setPostId} operation={operation} setOperation={setOperation} setOpen={setOpen} /></div>
                }
            </Card>
        </>
    );
}
