import React from "react";
import "../styles/Note.css";
function Note({ note, onDelete, user }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-us");

  return (
    <div className="container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{`"${note.content}"`}</p>

      <p className="note-author">{`-${user}`}</p>
      <div className="note-footer">
        <p className="note-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(note.id)}>
          delete
        </button>
      </div>
    </div>
  );
}

export default Note;
