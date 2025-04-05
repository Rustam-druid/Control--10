import {useEffect} from "react";
import Grid from "@mui/material/Grid2";


import {DeleteNews, fetchAllNews} from "./postsThunks.ts";
import {Button, Card, CardMedia, Container, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import noPosts from "../../assets/images/noPosts.jpg"
import {Link} from "react-router-dom";
import {selectLoading, selectNews} from "./PostsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";


const News = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectNews)
    const Loading = useAppSelector(selectLoading)


    useEffect(() => {
        dispatch(fetchAllNews())
    }, [dispatch])

    const onDelete = async (id: string) => {
        await dispatch(DeleteNews(id))
        await dispatch(fetchAllNews())
    }

    return (
        <>
            <Container>
                <Grid container spacing={2}>

                    <Grid direction="row" container justifyContent="space-between"
                          size={{xs: 12, sm: 12, md: 6, lg: 12}}>

                        <Grid>
                            <Typography variant="h4" component="div">
                                posts
                            </Typography>
                        </Grid>

                        <Grid>
                            <Button  color="primary" component={Link} to={'/newsBook/new' }>
                                Add new Posts
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container spacing={2} size={{xs: 12, sm: 12, md: 6, lg: 12}}>
                        {Loading ? <Spinner/> :
                            <>
                                {posts.length === 0 ? <Typography variant='h4'>No posts yet</Typography> :
                                    <>
                                        {posts.map(item => (
                                            <Card key={item.id} style={{width: '100%', marginTop:'30px'}} >
                                                <Grid container style={{display: 'flex',}}
                                                      size={{xs: 12, sm: 12, md: 6, lg: 12}}>

                                                    <Grid size={{xs: 12, sm: 12, md: 6, lg: 2}}>
                                                        <CardMedia
                                                            component="img"
                                                            height="200"
                                                            image={noPosts}
                                                            alt={item.title}
                                                        />
                                                    </Grid>

                                                    <Grid size={{xs: 12, sm: 12, md: 6, lg: 10}}>

                                                        <Grid style={{marginBottom: '20px'}}>
                                                            <Typography variant='h4'>{item.title}</Typography>
                                                        </Grid>

                                                        <Grid
                                                            style={{display: 'flex', justifyContent: 'space-between'}}>
                                                            <Grid>
                                                                <Typography>{item.datetime}</Typography>

                                                            </Grid>

                                                            <Grid>
                                                                <Typography color="primary" component={Link}
                                                                            to={'/newsBook/' + item.id}>Read Full
                                                                    Post</Typography>

                                                            </Grid>

                                                            <Grid>
                                                                    <Button onClick={() => onDelete(item.id)}>Delete</Button>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>

                                                </Grid>
                                            </Card>
                                        ))}
                                    </>
                                }
                            </>
                        }
                    </Grid>

                </Grid>
            </Container>

        </>
    );
};

export default News;