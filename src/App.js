import React, { useEffect, useState } from "react";
import './App.css';
import CommentItem from "./components/CommentItem";






export const AppContext = React.createContext(null);

export default function App() {

  const [commentsList, setCommentsList] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let list = localStorage.getItem('commentsList');
    let list_2;
    if (list) list_2 = JSON.parse(list);
    if (list_2 && list_2.length) {
      setCommentsList(list_2);
    }
  }, []);


  return (
    <AppContext.Provider
      value={{
        commentsList, setCommentsList, editing, setEditing
      }}>
      <div className="App">

        <div className="header">Reviews</div>

        <div className="container">
          {commentsList && commentsList.length ? commentsList.map((item, index) => {
            return <CommentItem key={index} item={item} />
          })
            :
            null}

          <CommentItem />



        </div>










      </div>
    </AppContext.Provider>

  );
}

