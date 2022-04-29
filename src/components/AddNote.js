import React,{ useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",desc:"",tag:""})
    const handelClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.desc,note.tag);
        setNote({title:"",desc:"",tag:""});
        props.showAlert("Added Successfullly","success");
    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className='container my-5'>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input minLength={3} required type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input minLength={5} required type="text" className="form-control" id="desc" name='desc' value={note.desc} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length<3 || note.desc.length<5} type="submit" className="btn btn-primary" onClick={handelClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote