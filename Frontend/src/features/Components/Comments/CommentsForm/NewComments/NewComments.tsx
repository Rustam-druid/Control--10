import {useAppDispatch} from "../../../../../app/hooks.ts";
import {ICommentsMutation} from "../../../../../types";
import {toast} from "react-toastify/unstyled";
import CommentsForm from "../CommentsForm.tsx";
import {addNewComment} from "../../../../News/postsThunks.ts";
import {Typography} from "@mui/material";

interface IProps {
    idNews?: string;
}

const NewComments: React.FC<IProps> = ({idNews}) => {
    const dispatch = useAppDispatch();


    const onCreateNewComment = async (comment: ICommentsMutation) => {
        try {
            if (idNews){
                await dispatch(addNewComment({idNews, comment}));
                toast.success("Comment was successfully created!");
            }

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New Comments
            </Typography>
            <CommentsForm onSubmitForm={onCreateNewComment}/>
        </>
    );
};

export default NewComments;