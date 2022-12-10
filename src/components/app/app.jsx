import './app.module.scss';
import ArticlesList from "../articles-list/articles-list";
import {Route, Routes} from "react-router-dom";
import ArticlePage from "../article-page/article-page";
import {NotFoundPage} from "../not-found-page/not-found-page";
import {Layout} from "../Layout/Layout";
import SignUp from "../sign-up/sign-up";
import SignIn from "../sign-in/sign-in";
import Profile from "../profile/profile";
import NewArticle from "../new-article/new-article";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<ArticlesList/>}/>
          <Route path='/articles' element={<ArticlesList/>}/>
          <Route path="/articles/:slug" element={<ArticlePage/>}/>
          <Route path="/articles/:slug/edit" element={<NewArticle/>}/>
          <Route path="/new-article" element={<NewArticle/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
