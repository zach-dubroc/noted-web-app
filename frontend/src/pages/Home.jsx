import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const username = "";
  const navigate = useNavigate();
  //useEffect runs on initial render
  //and on value change of 2nd argument(dependency)
  useEffect(() => {
    getNotes();
  }, []);

  //.then is like await but contains an error catch
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(res);
        username = res.username;
      })
      .catch((err) => err);
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          //alert("note deleted");
        } else alert("failed to delete");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          //alert("note created");
        } else alert("failed");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <button
          className="logout-button"
          onClick={() => {
            navigate("/logout");
          }}
        >
          Logout
        </button>
      </div>
      <div>
        `<h2>${username}'s' notes:</h2>`
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>

      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="content">Content</label>
        <br />
        <textarea
          type="text"
          id="Content"
          name="Content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Home;
