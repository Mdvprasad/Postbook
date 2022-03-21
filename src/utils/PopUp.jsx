import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPost, deletePost, updatePost } from '../store/asyncActions/posts';
import './popUp.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  paper: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  typoGraphy: {
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  textInput: {
    width: '100%',
    backgroundColor: 'aliceblue',
  },
  button: {
    margin: '10px'
  },
}));

export default function PopUp({ id, open, setOpen, operation, selectedPost }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAdd = event => {
    const newPost = {
      "user_id": 2750,
      "title": title,
      "body": value
    }
    dispatch(createPost(title, value))
      .then(() => console.log("success"))
      .catch(err => console.log(err));
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const newPost = {
      "id": id,
      "title": title,
      "body": value !== null ? value : selectedPost.body
    }
    dispatch(updatePost(id, newPost))
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err));
    setOpen(false);
  }
  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deletePost(id))
      .then((data) => {
        console.log(data)
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
            <Typography component="h2" className={classes.typoGraphy}>Title</Typography>
            <Input className={classes.textInput} type="text" defaultValue={operation !== "Add" ? selectedPost.title : title} placeholder='Enter post title' onChange={e => setTitle(e.target.value)} />
            <Typography component="h2" className={classes.typoGraphy}>Text</Typography>
            <Input className={classes.textInput} type='text' defaultValue={operation !== "Add" ? selectedPost.body : value} placeholder='Enter post details' onChange={e => setValue(e.target.value)} /><br />
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