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
      body: JSON.stringify({ title, description, tag }),
    });
    if (response.status === 200) {
      fetchAllNote();
    }
  };

  //Delete a note
  const deleteNote = async (noteID) => {
    const response = await fetch(`${host}/api/notes/deletenote/${noteID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjRhMDAxZTc4NjY3Nzc3ZWJmNDZlZjcwIn0sImlhdCI6MTY4ODIwNzkyOX0.lwV6wmdRqKuR9yD3ITtQDpAU5sXPbYHZcg1BIzanDAA",
      },
    });
    const json = await response.json();
    console.log(json);

    const remainingNotes = notes.filter((note) => {
      return note._id !== noteID;
    });
    setNotes(remainingNotes);
  };

  //Update a note
  const updateNote = async (noteID, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${noteID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjRhMDAxZTc4NjY3Nzc3ZWJmNDZlZjcwIn0sImlhdCI6MTY4ODIwNzkyOX0.lwV6wmdRqKuR9yD3ITtQDpAU5sXPbYHZcg1BIzanDAA",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //logic to edit note in cliet
    let newNote=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      // const element = newNote[index];
      if (newNote[index]._id === noteID) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, fetchAllNote, addNote, deleteNote, updateNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
