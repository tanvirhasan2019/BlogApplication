import './creatememories.css'
import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import ChipInput from 'material-ui-chip-input';
import { createPost } from '../actions/post';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

export const CreateMemories = () => {

  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: [], selectedFile: '' });
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const clear = () => {
    setPostData({ creator: '', title: '', message: '', tags: [], selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPost(postData, history))
  };

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

    return (
        <div className="container">
            <Paper className={classes.paper}>
                <form style={{width:'70%', textAlign:'center'}} autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography  variant="h6">{'Creating a Memory'}</Typography>
                    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
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
                    <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </div>
    )
}