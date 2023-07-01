import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s = {
    name: "som",
    class: "CSE-B",
  };
  const [state, setState] = useState(s);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "somsurya",
        class: "CSE-C",
      });
    }, 2000);
  };
  return (
    <NoteContext.Provider value={{state,update}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
