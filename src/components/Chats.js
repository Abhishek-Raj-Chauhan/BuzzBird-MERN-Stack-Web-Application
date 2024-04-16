import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import ChatItem from "./ChatItem";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../App.css";

function Chats(props) {
  const context = useContext(noteContext);
  const { chats, fetchAllChats } = context;
  const [chat, setChat] = useState({ msg: "" });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, skip: 0 });
  const chatListRef = useRef(null);
  let history = useHistory();

  const handleAddChat = (event) => {
    event.preventDefault();
    // Add logic to add chat
  };

  const handleChange = (event) => {
    setChat({ ...chat, [event.target.name]: event.target.value });
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      // User has scrolled to the bottom, fetch more chats
      fetchMoreChats();
    }
  };

  const fetchMoreChats = () => {
    // Increment skip value to fetch next page of chats
    const newPagination = { ...pagination, skip: pagination.skip + pagination.limit };
    setPagination(newPagination);
    // Implement logic to fetch more chats here using newPagination
    setLoading(true);
    // Simulate loading for 1 second
    setTimeout(() => {
      // Fetch more chats
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // Fetch initial chats
      fetchAllChats();
    } else {
      history.push("/");
    }
  }, [fetchAllChats, history]);

  useEffect(() => {
    // Add scroll event listener to chat list container
    chatListRef.current.addEventListener("scroll", handleScroll);
    return () => {
      // Remove event listener when component unmounts
      chatListRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <h3 style={{ padding: "4rem 0rem 1rem 1rem" }}>Community Chats: </h3>
      <div ref={chatListRef} className="list-group rounded-0" id="editchat">
        {chats.map((chat) => (
          <ChatItem key={chat._id} chat={chat} />
        ))}
        {loading && <div>Loading more chats...</div>}
      </div>
      <div className="texter">
        <form onSubmit={handleAddChat} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0rem 0rem 0rem 0rem', alignItems: 'flex-start', height: '100%' }}>
          <input id="chatIn" name="msg" type="text" placeholder="type something" onChange={handleChange} value={chat.msg}/>
          <button id="chatBut" type="submit" className="btn btn-info">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chats;
