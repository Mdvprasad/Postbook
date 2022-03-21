import React, { useEffect } from 'react'
import axios from '../../utils/axios'
import { baseUrl } from '../../constants/constants'
import { retrievePosts } from '../../store/asyncActions/posts'
import { retrieveTodos } from '../../store/asyncActions/todos'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import './home.css';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '10px'
    },
    cardHeaderPosts: {
        backgroundColor: 'red',
        textAlign: 'center',
        color: 'white',
        padding: "5px 0",
        margin: 10
    },

    cardHeaderComments: {
        backgroundColor: 'blue',
        textAlign: 'center',
        color: 'white',
        padding: "5px 0",
        margin: 10
    },

    cardHeaderTodos: {
        backgroundColor: 'green',
        textAlign: 'center',
        color: 'white',
        padding: "5px 0",
        margin: 10
    },
    content: {
        padding: '0 10% !important',
        backgroundColor: 'aliceblue',
        textAlign: 'left',
    },
    typoGraphy: {
        color: '#0066CC',
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
}));
const Home = ({ comments, setComments }) => {
    const classes = useStyles();
    const posts = useSelector(state => state.posts);
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(retrievePosts())
            .then(data => console.log(data));
        dispatch(retrieveTodos())
            .then(data => console.log(data))
        axios.get(`${baseUrl}/comments`)
            .then(data => {
                console.log("comments", data.data)
                setComments(data.data)
            })
            .catch(error => console.log("error in comments", error));
    }, [])
    return (
        <>
            <Typography className={classes.typoGraphy} >Welcome to user details</Typography>
            <section className='container'>
                <Card className={classes.root}>
                    <CardHeader
                        title={`Total No of posts ${posts.length}`}
                        className={classes.cardHeaderPosts}
                    />
                </Card>
                <Card className={classes.root}>
                    <CardHeader
                        title={`Overall No of comments ${comments.length}`}
                        className={classes.cardHeaderComments}
                    />
                </Card>
                <Card className={classes.root}>
                    <CardHeader
                        title={`Total No of todos ${todos.length}`}
                        className={classes.cardHeaderTodos}
                    />
                </Card>
            </section>
        </>
    )
}

Home.propTypes = {

}

export default Home
