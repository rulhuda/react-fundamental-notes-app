import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/local-data";
import { FaSave } from "react-icons/fa";

function NoteInput () {
  const navigate =useNavigate();

  const form = {
    title: '',
    body: '',
  };

  const [controlForm, setControlForm] = useState(form);
  const { title, body } = controlForm;

  const addNoteHandler = () => {
    addNote({title, body})
    alert(`Berhasil menambahkan catatan dengan judul ${title}`)
    navigate('/');
  }

  return (
    <section className="note-input">
      <div className="add-new-page__input">
        <input className="add-new-page__input__title" type="text" placeholder="Judul ..." value={controlForm.title} onChange={(event) => setControlForm({...controlForm, title: event.target.value })} />

        <textarea className="add-new-page__input__body" placeholder="Isi catatan ..." contentEditable="true" suppressContentEditableWarning="true" onInput={(event) => setControlForm({...controlForm, body: event.target.value })} defaultValue={controlForm.body} ></textarea>
      </div>
      
      <div className="add-new-page__action" onClick={addNoteHandler}>
        <button className="action" type="button">
          <FaSave />
        </button>
      </div>
    </section>
  )
}

export default NoteInput;