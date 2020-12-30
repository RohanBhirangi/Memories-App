import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

interface FormProps {
    currentId: string | undefined,
    setCurrentId: (currentId: string | undefined) => void
}

const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [postData, setPostData] = useState<Post>({
        title: '',
        message: '',
        creator: '',
        tags: new Array<string>(),
        selectedFile: ''
    });

    const post = useSelector((state: any) => currentId ? state.posts.find((p: any) => p._id === currentId) : null);

    useEffect(() => {
        if(post) {
            setPostData(post);
        }
    }, [post]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    };

    const clear = () => {
        setCurrentId(undefined);
        setPostData({
            title: '',
            message: '',
            creator: '',
            tags: new Array<string>(),
            selectedFile: ''
        });
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a memory</Typography>
                <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e: any) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e: any) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e: any) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e: any) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone={({base64}: {base64: string}) => setPostData({ ...postData, selectedFile: base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;