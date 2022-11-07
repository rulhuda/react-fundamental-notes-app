import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FaSave } from "react-icons/fa";
import DataSource from "../data/data-source";

function NoteInput () {
  const navigate = useNavigate();

  const form = {
    title: '',
    body: '',
  };

  const [controlForm, setControlForm] = useState(form);

  const addNoteHandler = async () => {
    const createNote = await DataSource.CreateNote(controlForm);

    swal({
      icon: 'success',
      title: 'Berhasil menambahkan catatan!',
      text: `Berhasil menambahkan catatan dengan judul ${createNote.data.title}`
    });
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