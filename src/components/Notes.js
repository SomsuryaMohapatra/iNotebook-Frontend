import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, fetchAllNote, updateNote } = context;

  useEffect(() => {
    fetchAllNote();
    // eslint-disable-next-line
  }, []);

  const modalRef = useRef(null);
  const closeModalRef = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleSubmit = (event) => {
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    closeModalRef.current.click();
    props.showAlert("Updated Successfully","success");
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const editNote = (currentNote) => {
    modalRef.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        ref={modalRef}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={10}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
                {/* <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Add Note
                </button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closeModalRef}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={note.etitle.length<5 || note.edescription.length<10}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2">
        <h2>Your Note</h2>
        <div className="container">
          {notes.length === 0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={editNote} showAlert={props.showAlert}/>;
        })}
      </div>
    </>
  );
}
