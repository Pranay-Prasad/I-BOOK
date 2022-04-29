import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
const UINotes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, GetNotes, Editnote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      GetNotes();
    }
    else{
      navigate("/login");
    }
  }, [])
  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNote] = useState({ id: "", utitle: "", udesc: "", utag: "" })
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({ id: currentnote._id, utitle: currentnote.title, udesc: currentnote.description, utag: currentnote.tag });
  }
  const handelClick = (e) => {
    Editnote(note.id, note.utitle, note.udesc, note.utag);
    refclose.current.click();
    props.showAlert("Updated Successfully", "success");
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input minLength={3} required type="text" className="form-control" value={note.utitle} id="utitle" name='utitle' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Description</label>
                  <input minLength={5} required type="text" className="form-control" value={note.udesc} id="udesc" name='udesc' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tags</label>
                  <input type="text" className="form-control" value={note.utag} id="utag" name='utag' onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.utitle.length < 3 || note.udesc.title < 5} onClick={handelClick} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className='container'>
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}

export default UINotes