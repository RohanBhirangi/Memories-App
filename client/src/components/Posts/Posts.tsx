import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

interface PostsProps {
    setCurrentId: (currentId: string | undefined) => void
}

const Posts: React.FC<PostsProps> = ({ setCurrentId }) => {

    const classes = useStyles();

    const posts = useSelector((state: any) => state.posts);

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {posts.map((post: Post) => (
                    <Grid key={post._id} item>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;