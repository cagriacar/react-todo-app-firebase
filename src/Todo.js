import React,{useState} from "react";
import './Todo.css';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Input,
  InputLabel
} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';

//Modal için Style tasarımı 
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//Todo işlemleri
function Todo(props) {
     const classes = useStyles();//style için className
     const [open, setOpen] = useState(false);
     const [input,setInput] = useState()
/* 
    const handleOpen = () => {
      setOpen(true);
    }; */

// Güncelleme işlemi
    const updateTodo = () => {
      db.collection('todos').doc(props.todo.id).set({
        todo: input
      },{ merge: true})
      setOpen(false);
    }

  return (
    /* Modal - Mesaj bilgisi */
    <>
    <Modal
      open={open}
      onClose={e => setOpen(false)} >
        <div className={classes.paper}>
            <h1>I am a Modal</h1>
            <InputLabel>New Todo Enter</InputLabel>
            <Input 
            placeholder= {props.todo.todo}
            value={input}  
            onChange={event => setInput(event.target.value)}
              />
            <Button 
             variant="contained" 
             color="secondary" 
            onClick={updateTodo}>Güncelle Todo</Button>
          </div>
  {/* Güncelleme işlemi */}
    </Modal>
    <List className="todo__list">
      <ListItem>
        <ListItemText primary={props.todo.todo} secondary="Todo Info" />
        <Button 
         variant="contained" 
         color="primary" 
         onClick={e => setOpen(true)}>Güncelle</Button>
  {/* Silme işlemi */}
  <Button><DeleteForeverIcon 
      variant="contained" 
      color="secondary" 
      onClick=
      {event  => db.collection('todos').doc(props.todo.id).delete()}
      
      /></Button>
            </ListItem>
    </List>
    </>
  );
}

export default Todo;
