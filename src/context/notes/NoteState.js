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
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
