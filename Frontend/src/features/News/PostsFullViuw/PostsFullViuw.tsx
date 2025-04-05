import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";

import {useEffect} from "react";

import {Card, CardContent, Container, Typography} from "@mui/material";
import {fetchNewById} from "../postsThunks.ts";
import {selectLoading, selectOneNews} from "../PostsSlice.ts";
import Grid from "@mui/material/Grid2";
import Comments from "../../Components/Comments/Comments.tsx";
import NewComments from "../../Components/Comments/CommentsForm/NewComments/NewComments.tsx";


const PostsFullViuw = () => {
    const dispatch = useAppDispatch();
    const onePost = useAppSelector(selectOneNews);
    const loading = useAppSelector(selectLoading);

    const {id} = useParams();


    useEffect(() => {
        if (id) {
            dispatch(fetchNewById(id));
        }
    }, [id, dispatch]);


    return (
        <Container>
            {!loading && onePost ?
                <Grid>
                    <Card sx={{width: "80%", margin: "0 auto", padding: '20px'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {onePost.title}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" style={{color: "gray"}}>
                                <small>{onePost.datetime}</small>
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {onePost.description}
                            </Typography>

                        </CardContent>
                    </Card>

                    <Grid>
                        <Grid>
                            <Comments/>
                        </Grid>

                        <Grid>
                            <NewComments idNews={id}/>
                        </Grid>

                    </Grid>
                </Grid>

                :
                <Typography variant="h6">Not found product</Typography>
            }
        </Container>
    );
};

export default PostsFullViuw;