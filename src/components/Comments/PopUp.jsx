import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input, Typography, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deleteComment, updateComment } from '../../store/asyncActions/comments';

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
    margin: '10px'
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
}));

export default function PopUp({ id, open, setOpen, postId, operation, post, selectedComment }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAdd = event => {
    let comment = {
      "post": post,
      "post_id": postId,
      "name": name,
      "email": email,
      "body": body
    }
    dispatch(createComment(post, postId, name, email, body))
      .then(() => console.log("success"))
      .catch(err => console.log(err));
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateComment(id, { "body": body }))
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log("err", err));
    setOpen(false);
  }
  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteComment(id))
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
            <Typography className={classes.typoGraphy}>Comment</Typography>
            <Input className={classes.textInput} type="text" defaultValue={operation !== "Add" ? selectedComment.body : body} placeholder='Enter Comment' onChange={e => setBody(e.target.value)} />
            {operation !== "Add" ?
              <>
                <Button variant="contained" color="primary" className={classes.button} onClick={(e) => handleUpdate(e)}>Update</Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={(e) => handleDelete(e)}>Delete</Button>
              </> :
              <>
                <Input className={classes.textInput} type="text" placeholder='Enter Name' onChange={e => setName(e.target.value)} />
                <Input className={classes.textInput} type="email" placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
                <Button className={classes.button} variant="contained" color="primary" onClick={(e) => handleAdd(e)}>Add</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={() => setOpen(!open)}>Cancel</Button>
              </>
            }
          </div>
        </Fade>
      </Modal>
    </div >
  );
}