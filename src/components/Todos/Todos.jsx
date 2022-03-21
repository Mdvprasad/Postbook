import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableContainer from '@material-ui/core/TableContainer'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import PopUp from './PopUp';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveTodos } from '../../store/asyncActions/todos';
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: '0 10px 5px 0',
        float: 'right'
    },
    typoGraphy: {
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        lineHeight: 2
    },
    textInput: {
        width: '100%',
        backgroundColor: 'aliceblue',
    },
    header: {
        margin: "5px",
    }
}));


function Todos(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [operation, setOperation] = useState(null);
    const todos = useSelector(state => state.todos);
    const [id, setId] = useState(null);
    useEffect(() => {
        dispatch(retrieveTodos());
    }, [])
    useEffect(() => {
        console.log("todos", todos)
    }, [todos])

    const handlePopUp = (id, event) => {
        event.preventDefault();
        setId(id);
        setOperation(null);
        setOpen(true);
    }
    const handleAdd = (event) => {
        event.preventDefault();
        setOpen(true);
        setOperation("Add");
    }
    const newTodo = { "title": "updated todo", "body": "todo is updated" };

    return (

        <><header className={classes.header}>
            <Typography color="primary" className={classes.typoGraphy} component="font" >Check and Update your TODOS</Typography>
            <Button color="default" className={classes.button} variant="contained" onClick={(e) => handleAdd(e)}>Add Todo</Button>
        </header>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead >
                            <TableRow style={{ backgroundColor: "#0066CC" }}>
                                <TableCell style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>TITLE</TableCell>
                                <TableCell style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>DUE ON</TableCell>
                                <TableCell style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>STATUS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos != null && todos.length > 0 ? todos.map(todo =>
                                <TableRow onClick={(e) => handlePopUp(todo.id, e)} key={todo.id} style={{ backgroundColor: "aliceblue", textAlign: "center", borderBottom: "1px solid black" }}>
                                    <TableCell>{todo.title}</TableCell>
                                    <TableCell>{`${todo.due_on}`}</TableCell>
                                    <TableCell>{todo.status}</TableCell>
                                </TableRow>
                            ) : "No Data Found"}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {open && <PopUp open={open} operation={operation} setOpen={setOpen} list={todos} id={id} popUpType={"todos"} />}
        </>
    )
}

Todos.propTypes = {}

export default Todos
