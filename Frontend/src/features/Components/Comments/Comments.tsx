import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectLoading, selectNews} from "../../News/PostsSlice.ts";
import {useEffect} from "react";
import {DeleteNews, fetchAllNews} from "../../News/postsThunks.ts";


const Comments = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectNews)
    const Loading = useAppSelector(selectLoading)


    // useEffect(() => {
    //     dispatch(fetchAllNews())
    // }, [dispatch])

    const onDelete = async (id: string) => {
        await dispatch(DeleteNews(id))
        await dispatch(fetchAllNews())
    }


    return (
        <div>

        </div>
    );
};

export default Comments;