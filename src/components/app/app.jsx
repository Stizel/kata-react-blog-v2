import './app.module.scss';
import ArticlesList from "../articles-list/articles-list";
import {Route, Routes} from "react-router-dom";
import ArticlePage from "../ArticlePage/article-page";
import {NotFoundPage} from "../not-found-page/not-found-page";
import {Layout} from "../Layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<ArticlesList/>}/>
          <Route path='/articles' element={<ArticlesList/>}/>
          <Route path="/articles/:slug" element={<ArticlePage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
