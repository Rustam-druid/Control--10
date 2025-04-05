import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {Button, CircularProgress, TextField} from "@mui/material";
import {ICommentsMutation} from "../../../../types";
import {useAppSelector} from "../../../../app/hooks.ts";
import {selectAddLoading} from "../../../News/PostsSlice.ts";

interface IProps {
    onSubmitForm: (comment: ICommentsMutation) => void;
}

const initialState = {
    author: "",
    titleComments: "",
}

const CommentsForm: React.FC<IProps> = ({onSubmitForm}) => {
    const [form, setForm] = useState(initialState);
    const addLoading = useAppSelector(selectAddLoading)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.author || !form.titleComments) {
            alert("Please enter title or description");
        } else {
            onSubmitForm({...form})
            setForm(initialState)
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    return (

       <>
           {addLoading ? <CircularProgress color="secondary" /> :

               <>
                   <form onSubmit={onSubmit}>
                       <Grid container spacing={2} direction="column" alignItems="center">
                           <Grid size={{sm: 12, md: 6, lg: 6}}>
                               <TextField
                                   style={{width: '100%'}}
                                   id="author"
                                   name="author"
                                   label="author"
                                   value={form.author}
                                   onChange={onInputChange}
                               />
                           </Grid>


                           <Grid size={{sm: 12, md: 6, lg: 6}}>
                               <TextField
                                   style={{width: '100%'}}
                                   id="titleComments"
                                   multiline
                                   name="titleComments"
                                   label="titleComments"
                                   value={form.titleComments}
                                   onChange={onInputChange}
                                   rows={4}
                                   minRows={6}
                               />
                           </Grid>

                           <Grid size={{sm: 12, md: 6, lg: 6}}>
                               <Button type="submit" color="primary" variant="contained">
                                   save
                               </Button>
                           </Grid>
                       </Grid>
                   </form>
               </>
           }

       </>

    );
};

export default CommentsForm;