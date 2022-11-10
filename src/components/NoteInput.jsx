import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FaSave } from "react-icons/fa";
import DataSource from "../data/data-source";
import { useContext } from "react";
import LocalContext from "../contexts/LocalContext";

function NoteInput () {
  const navigate = useNavigate();

  const { local } = useContext(LocalContext);

  const form = {
    title: '',
    body: '',
  };

  const [controlForm, setControlForm] = useState(form);

  const addNoteHandler = async () => {
    const createNote = await DataSource.CreateNote(controlForm);

    swal({
      icon: 'success',
      title: `${local === 'id' ? 'Berhasil menambahkan catatan' : 'Successfully added note!'}!`,
      text: `${local === 'id' ? `Berhasil menambahkan catatan dengan judul ${createNote.data.title}` : `Successfully added note with title ${createNote.data.title}`}`
    });
    navigate('/');
  }

  return (
    <section className="note-input">
      <div className="add-new-page__input">
        <input className="add-new-page__input__title" type="text" placeholder={`${local === 'id' ? 'Judul ...' : 'Title ...'}`} value={controlForm.title} onChange={(event) => setControlForm({...controlForm, title: event.target.value })} />

        <textarea className="add-new-page__input__body" placeholder={`${local === 'id' ? 'Isi catatan ...' : 'Body ...'}`}contentEditable="true" suppressContentEditableWarning="true" onInput={(event) => setControlForm({...controlForm, body: event.target.value })} defaultValue={controlForm.body} ></textarea>
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