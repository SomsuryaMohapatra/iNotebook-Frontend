import React from "react";

export default function NoteItem(props) {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.description}</p>
          <div class="d-flex justify-content-end">
            <i className="fa-regular fa-trash-can mx-2"></i>
            <i className="fa-regular fa-pen-to-square mx-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
