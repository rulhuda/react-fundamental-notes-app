import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/index";
import PropTypes from "prop-types";

function NoteItem ({ id, title, body, createdAt, archived }) {

  return (
    <Card id={id} className="note-item bg-white">
      <Card.Header className="note-item__title">
          <Link className="text-dark" to={`/notes/${id}`}>{title}</Link>
      </Card.Header>
      <Card.Body>
        <Card.Text className="note-item__createdAt alert-danger text-muted">
          {showFormattedDate(createdAt)}
        </Card.Text>
        <Card.Subtitle className="note-item__body text-muted">
          {body}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
}

export default NoteItem;