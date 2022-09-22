import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NotesList ({ notes }) {
  return (
    <div className="notes-list">
      {
        notes.length > 0 ? notes.map((note) => (  
          <NoteItem key={note.id} {...note} />
        )) : <h2>Tidak ada catatan!</h2>
      }
    </div>
  )
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
}

export default NotesList;