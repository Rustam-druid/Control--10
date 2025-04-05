import NewsForm from "../NewsForm/NewsForm.tsx";
import {useAppDispatch} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {INewsMutation} from "../../../types";
import {createNews} from "../../News/productsThunks.ts";
import {toast} from "react-toastify/unstyled";
import {Typography} from "@mui/material";


const NewsPosts = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreateNewPost = async (post: INewsMutation) => {
        try {
            await dispatch(createNews(post))
            toast.success("Product was successfully created!");
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New Posts
            </Typography>
            <NewsForm onSubmitForm={onCreateNewPost}/>
        </>
    );
};

export default NewsPosts;