import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {Button, Container, TextField} from "@mui/material";

import {IMessageMutation} from "../../../types";

interface IProps {
    onSubmitForm: (messageMutation: IMessageMutation) => void;
}

const initialState = {
    message: '',
    author: ''
}

const ChatForm: React.FC<IProps> = ({onSubmitForm}) => {


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

        <>
            <Container maxWidth="sm">

                <form onSubmit={onSubmit}>

                    <Grid container spacing={2} direction='row' alignItems='center'>
                        <Grid size={4} style={{width: '100%'}}>
                            <TextField
                                style={{width: '100%'}}
                                id="author"
                                name="author"
                                label="author"
                                value={form.author}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid size={4} style={{width: '100%'}}>
                            <TextField
                                style={{width: '100%', overflow: 'auto'}}
                                multiline
                                id="message"
                                name="message"
                                label="message"
                                value={form.message}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid>
                            <Grid container spacing={2}>
                                <Button
                                    type="submit"
                                    color="primary"
                                >
                                    send
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>


                </form>

            </Container>
        </>

    );
};

export default ChatForm;