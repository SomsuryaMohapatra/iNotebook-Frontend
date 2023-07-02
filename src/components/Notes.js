import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row my-2">
      <h2>Your Note</h2>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>
      })}
    </div>
  );
}
