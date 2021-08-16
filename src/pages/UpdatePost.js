
import React, { useState , useEffect , useRef } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch , useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import ChipInput from 'material-ui-chip-input';
import {  updatePost, getPost } from '../actions/post';
import useStyles from '../components/styles.js';
import { useParams } from 'react-router-dom';
import Bounch from '../components/spinner/Bounch';
import { Toast } from 'primereact/toast';


export const UpdatePost = () => {

  //const state = useSelector(state => state.p)
  const toast = useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch()
  const { id } = useParams();
  const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: [], selectedFile: ''});
  const [name, setName]= useState('')
 //const {isLoading, post }= useSelector((state) => state.post ? state.post : true)  
  const { post , isLoading } = useSelector((state) => state.post ? state.post : true)  



  useEffect(() => {
   
    dispatch(getPost(id))

 }, [dispatch , id]);




 
  const clear = () => {
    setPostData({ creator: '', title: '', message: '', tags: [], selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(updatePost(postData, id))
    if(response)showSuccess();
    else showWarn();
  
  };

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Post Update', detail:'Your Post is Updated', life: 3000});
}


const showWarn = () => {
    toast.current.show({severity:'warn', summary: 'Post not Updated', detail:'Your Post is not Updated', life: 3000});
}



useEffect(() => {
  if(!isLoading && post)setPostData({ creator: post.creator._id, title: post.title, message: post.message, tags:post.tags, selectedFile: post.selectedFile });
  if(!isLoading && post) setName(post.creator.name);
}, [isLoading , post]);
 

    return (
        <div className="container">

          <Toast ref={toast} />
          
           {
             isLoading ? <Bounch />
             :
             <Paper style={{marginTop:'20px', marginBottom:'20px'}} className={classes.paper}>
                <form style={{width:'70%', textAlign:'center'}} autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography  variant="h6">Update your Memory</Typography>
                    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={name} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <div style={{ padding: '5px 0', width: '98%' }}>
                    <ChipInput
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    />
                    </div>
                    <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...post, selectedFile: base64 })} /></div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Update</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
           }
        </div>
    )
}