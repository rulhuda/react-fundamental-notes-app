import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NotesList ({ notes }) {

  const checkNotes = (notes) => {
    if (notes === undefined || notes.length === 0) {
      return <h2>Tidak ada catatan!</h2>
    }

    return (
      notes.map((note) => (  
        <NoteItem key={note.id} {...note} />
      ))
    )
  }
  return (
    <div className="notes-list">
      {
       checkNotes(notes)
      }
    </div>
  )
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
}

export default NotesList;