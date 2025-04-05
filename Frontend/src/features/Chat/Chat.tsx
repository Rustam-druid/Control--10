import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {addNewMessages, getAllMessages, getNewMessages} from "./messageThunk";
import {IMessageMutation} from "../../types";
import ChatForm from "../components/ChatForm/ChatForm";
import {selectAllMessages, selectLastMessageDateTime} from "./messageSlice";
import {useCallback, useEffect} from "react";
import {Card, CardContent, Typography} from "@mui/material";


const Chat = () => {
    const dispatch = useAppDispatch();
    const lastDateTime = useAppSelector(selectLastMessageDateTime)
    const allMessage = useAppSelector(selectAllMessages)

    const send = async (message: IMessageMutation) => {
        await dispatch(addNewMessages(message))
    }

    const getDate = useCallback((lastDateofMessage: string | null) => {
        if (lastDateofMessage === null) {
            dispatch(getAllMessages())
        }else{
            dispatch(getNewMessages(lastDateofMessage))
        }
    }, [dispatch])

    useEffect(() => {
        const interval = setInterval(() => {
            void getDate(lastDateTime)
        },3000)

        return () => {clearInterval(interval)}
    },[getDate, lastDateTime])



    return (
        <>
            <ChatForm onSubmitForm={send}/>

            {allMessage.length > 0 && allMessage.map(message=> (
                <Card sx={{ maxWidth: 345, marginBottom: '20px'}} key={message.id}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {message.author}
                        </Typography>
                        <Typography>
                            {message.message}
                        </Typography>
                        <Typography>
                        {message.datetime}
                    </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

export default Chat;