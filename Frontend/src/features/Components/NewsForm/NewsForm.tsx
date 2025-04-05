import Grid from "@mui/material/Grid2";
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import {INewsMutation} from "../../../types";

interface IProps {
    onSubmitForm: (post: INewsMutation) => void;
}

const initialState = {
    title: "",
    description: "",
}

const NewsForm:React.FC<IProps> = ({onSubmitForm}) => {
    const [form, setForm] = useState(initialState);


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitForm({...form})
        setForm(initialState)
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    return (

        <form onSubmit={onSubmit}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="title"
                        name="title"
                        label="title"
                        value={form.title}
                        onChange={onInputChange}
                    />
                </Grid>


                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="description"
                        multiline
                        name="description"
                        label="description"
                        value={form.description}
                        onChange={onInputChange}
                        rows={4}
                        minRows={6}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button  type="submit" color="primary" variant="contained">
                        save
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewsForm;