// import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000";
    const notesinitial = []
    const [notes,setNotes] = useState(notesinitial);
    //fetch all Notes
    const GetNotes = async () => {
      //API CALL 
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json  = await response.json();
      setNotes(json);
    }
    //ADD note
    const addNote = async (title,description,tag) => {
      //TO-DO API CALL 
      const response = await fetch(`${host}/api/notes/addnote`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      //Client side logic
      // console.log("Adding a new note");
      const note = await response.json();
      setNotes(notes.concat(note));
    }
    //Delete Note
    const DeleteNote = async(id) => {

      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const newnotes = notes.filter((note) =>{return note._id !== id});
      setNotes(newnotes);
    }
    //Edit Note
    const Editnote = async (id,title,description,tag) => {
      //API calling TO-DO
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const json =  await response.json();
      //Logic for client side
      let newnotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newnotes.length; index++) {
        const element = newnotes[index];
        if(element._id === id){
          newnotes[index].title = title;
          newnotes[index].description = description;
          newnotes[index].tags = tag;
          break;
        }
      }
      setNotes(newnotes);
    }
    return (
        <NoteContext.Provider value = {{notes,addNote,DeleteNote,Editnote,GetNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;