import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [contentEmpty, setContentEmpty] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
    fetchUser();
  }, []);

  const fetchUser = () => {
    api
      .get("/api/current_user/")
      .then((res) => res.data)
      .then((data) => {
        setAuthor(data.username);
      });
  };

  //.then is like await but contains an error catch
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      })

      .catch((err) => err);
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
        } else alert("failed to delete");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();

    // Check if content is empty
    if (!content.trim()) {
      setContentEmpty(true);
      return; // Prevent further execution
    } else {
      setContentEmpty(false); // Reset the error message if content is not empty
    }

    // Check if title is empty
    const trimmedTitle = title.trim();
    const finalTitle = trimmedTitle || "untitled";
    api
      .post("/api/notes/", { content, title: finalTitle })
      .then((res) => {
        if (res.status === 201) {
        } else alert("failed");
        getNotes();
      })
      .catch((err) => alert(err));
    setContent("");
    setTitle("");
  };

  const handleClear = () => {
    setContent("");
    setTitle("");
  };

  return (
    <div>
      <div className="nav-bar">
        <div className="header-nav">
          <h1>{author}'s quotr</h1>
        </div>

        <div className="log-out">
          <button
            className="logout-button"
            onClick={() => {
              navigate("/logout");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={createNote}>
        <h2>quote of the day</h2>
        <label htmlFor="title">name yr quote, if you want</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">meat of the quote</label>
        <br />
        {contentEmpty && <p className="qm">*quote meat is required</p>}
        <textarea
          type="text"
          id="Content"
          name="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />
        <input type="submit" value="quote me" />
        <input type="button" value={"actually don't"} onClick={handleClear} />
      </form>
      <div className="user-label">
        {notes.length > 0 ? (
          <div className="note-list">
            <h2>{author}'s quotes</h2>
            <div className="note">
              {notes.map((note) => (
                <Note
                  note={note}
                  onDelete={deleteNote}
                  key={note.id}
                  user={author}
                  noteCount={notes.length}
                />
              ))}
            </div>
          </div>
        ) : (
          <h4>no quotes fr?</h4>
        )}
      </div>
    </div>
  );
}

export default Home;
