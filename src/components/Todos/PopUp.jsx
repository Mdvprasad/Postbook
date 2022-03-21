import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input, Typography, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createTodo, deleteTodo, updateTodo } from '../../store/asyncActions/todos';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import Select from 'react-select';

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
  select: {
    margin: '10px 10px 10px 0'
  }
}));

export default function PopUp({ id, open, setOpen, operation }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const options = [
    { "label": "pending", "value": "pending" },
    { "label": "completed", "value": "completed" }
  ]
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(new Date());
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAdd = event => {
    event.preventDefault();
    const newTodo = {
      "user_id": 2750,
      "due_on": selectedDate,
      "title": title,
      "status": selectedOption.value
    }
    dispatch(createTodo(newTodo))
      .then(() => console.log("success"))
      .catch(err => console.log(err));
    setOpen(!open);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const newTodo = {
      "id": id,
      "title": title,
      "due_on": selectedDate,
      "status": selectedOption.value
    }
    dispatch(updateTodo(id, newTodo))
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log("err", err));
    setOpen(false);
  }
  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteTodo(id))
      .then(() => {
        console.log("deleted happened", id)
      })
      .catch(e => {
        console.log(e);
      });
    setOpen(false);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography className={classes.typoGraphy}>Title</Typography>
            <Input className={classes.textInput} type="text" placeholder='Enter todo title' onChange={e => setTitle(e.target.value)} />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                format="yyyy/MM/dd"
                label="Date of Todo"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <Typography className={classes.typoGraphy}>Status</Typography>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className={classes.select}
            />
            {operation !== "Add" ?
              <>
                <Button className={classes.button} variant="contained" color="primary" onClick={(e) => handleUpdate(e)}>Update</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={(e) => handleDelete(e)}>Delete</Button>
              </> :
              <Button className={classes.button} variant="contained" color="primary" onClick={(e) => handleAdd(e)}>Add</Button>}
          </div>
        </Fade>
      </Modal>
    </div >
  );
}