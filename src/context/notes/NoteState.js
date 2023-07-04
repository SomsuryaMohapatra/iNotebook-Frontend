import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //get all notes
  const fetchAllNote = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjRhMDAxZTc4NjY3Nzc3ZWJmNDZlZjcwIn0sImlhdCI6MTY4ODIwNzkyOX0.lwV6wmdRqKuR9yD3ITtQDpAU5sXPbYHZcg1BIzanDAA",
      },
    });
    const fetchedNotes = await response.json();
    setNotes(fetchedNotes);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjRhMDAxZTc4NjY3Nzc3ZWJmNDZlZjcwIn0sImlhdCI6MTY4ODIwNzkyOX0.lwV6wmdRqKuR9yD3ITtQDpAU5sXPbYHZcg1BIzanDAA",
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();

    let note = {
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
  const deleteNote = (noteID) => {
    const remainingNotes = notes.filter((note) => {
      return note._id !== noteID;
    });
    setNotes(remainingNotes);
  };

  //Update a note
  const updateNote = async (noteID, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${noteID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjRhMDAxZTc4NjY3Nzc3ZWJmNDZlZjcwIn0sImlhdCI6MTY4ODIwNzkyOX0.lwV6wmdRqKuR9yD3ITtQDpAU5sXPbYHZcg1BIzanDAA",
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();

    //logic to edit note in cliet
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === noteID) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote , fetchAllNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
