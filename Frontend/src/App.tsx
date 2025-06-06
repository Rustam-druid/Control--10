import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import News from "./features/News/News.tsx";
import PostsFullViuw from "./features/News/PostsFullViuw/PostsFullViuw.tsx";
import NewsPosts from "./features/Components/NewsPosts/NewsPosts.tsx";

const App = () => {

  return (
    <>
        <CssBaseline />
        <ToastContainer/>

        <main>
            <Container maxWidth="lg" style={{border:'3px solid black', padding:'30px'}}>
                <header>
                    <AppToolbar/>
                </header>
                <Routes>
                    <Route path="/" element={<News/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/newsBook/:id" element={<PostsFullViuw/>}/>
                    <Route path="/newsBook/new" element={<NewsPosts/>}/>
                    <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                </Routes>
            </Container>
        </main>
    </>
  )
};

export default App
