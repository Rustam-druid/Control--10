import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectLoading, selectOneNews} from "../productsSlice.ts";
import {useEffect} from "react";
import {fetchNewById} from "../productsThunks.ts";
import {Card, CardContent, Container, Typography} from "@mui/material";


const PostsFullViuw = () => {
    const dispatch = useAppDispatch();
    const onePost = useAppSelector(selectOneNews);
    const loading = useAppSelector(selectLoading);

    const {id} = useParams();
    console.log(id)

    useEffect(() => {
        if (id) {
            dispatch(fetchNewById(id));
        }
    }, [id, dispatch]);


    return (
        <Container >
            {!loading && onePost ?
                <Card sx={{width: "80%", margin: "0 auto", padding:'20px'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {onePost.title}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" style={{color:"gray"}}>
                        <small>{onePost.datetime}</small>
                    </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {onePost.description}
                        </Typography>

                    </CardContent>
                </Card>
                :
                <Typography variant="h6">Not found product</Typography>
            }
        </Container>
    );
};

export default PostsFullViuw;