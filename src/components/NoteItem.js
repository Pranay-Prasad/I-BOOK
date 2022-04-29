import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {DeleteNote} = context;
    const { note,updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{DeleteNote(note._id);props.showAlert("Deleted Successfullly","success");}}></i>
                        <i className="fa-solid fa-pen mx-2" onClick={() => {updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem