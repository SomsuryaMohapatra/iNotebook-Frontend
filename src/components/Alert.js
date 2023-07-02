import React from "react";

export default function Alert(props) {
  return (
    <div>
      <div class="alert alert-info" role="alert">
        {props.message}
      </div>
    </div>
  );
}
