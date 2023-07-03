import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "64a004388667777ebf46ef81",
      user: "64a001e78667777ebf46ef70",
      title: "Naruto",
      description: "Dattebayoo",
      tag: "Anime",
      date: "2023-07-01T10:47:20.169Z",
      __v: 0,
    },
    {
      _id: "64a113957b889486d4ee27c0",
      user: "64a001e78667777ebf46ef70",
      title: "Naruto-shippuden",
      description: "4th Great Ninja War",
      tag: "Anime",
      date: "2023-07-02T06:05:09.556Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(initialNotes);

  //Add a note
  const addNote = (title,description,tag) => {
    let note={
      _id: "64a113957b889486d4ee27c01",
      user: "64a001e78667777ebf46ef70",
      title: title,
      description: description,
      tag: tag,
      date: "2023-07-02T06:05:09.556Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = () => {};

  //Update a note
  const updateNote = () => {};
  return (
    <NoteContext.Provider value={{ notes, addNote , deleteNote , updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
