import React from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { showFormattedDate } from "../utils/index";
import PropTypes from "prop-types";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import swal from "sweetalert";
import { FaArchive, FaCheckCircle, FaTrash } from "react-icons/fa";
import DataSource from "../data/data-source";
import LocalContext from "../contexts/LocalContext";

function NoteItem ({ id, title, body, createdAt, archived }) {
  const navigate = useNavigate();
  
  const { theme } = useContext(ThemeContext);
  const { local } = useContext(LocalContext);

  const onDeleteHandler = () => {
    const temp = [];
    temp.push({ title });
   
    swal({
      title: `${local === 'id' ? 'Yakin ingin menghapus catatan ' : 'Wanna delete the note '} ${temp[0].title}?`,
      text: `${local === 'id' ? 'Setelah terhapus. Catatan tidak bisa dikembalikan lagi!' : 'After being deleted. Notes are non-refundable! '}`,
      icon: "warning",
      buttons: [
        `${local === 'id' ? 'Batalkan' : 'Cancel'}`,
        `${local === 'id' ? 'Konfirmasi' : 'Confirm'}`,
      ],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal(`${local === 'id' ? 'Berhasil menghapus catatan ' : 'Success deleted note '} ${temp[0].title}`, {
          icon: "success",
        }).then(async () =>{ 
          const deletingNote = await DataSource.DeleteNote(id);

          if (deletingNote.status !== 'success') {
            swal({
              icon: 'error',
              title: `${local === 'id' ? 'Gagal menghapus catatan!' : 'Failed deleting note'}`
            });
            return;
          }
          window.location.reload();
        });
      } else {
        swal(`${local === 'id' ? 'Penghapusan catatan dengan judul ' : 'Deleting note with title '} ${temp[0].title} ${local === 'id' ? 'dibatalkan' : 'canceled'}`);
      }
    });

  }
  
  const onArchivedNote = () => {
    const temp = [];
    temp.push({ title });

    swal({
      title: `${local === 'id' ? 'Konfirmasi pengarsipan catatan' : 'Confirmation archiving note'}`,
      text: `${local === 'id' ? 'Anda akan mengarsipkan catatan ' : 'You will archive note '} ${temp[0].title}`,
      icon: "warning",
      buttons: [
        `${local === 'id' ? 'Batalkan' : 'Cancel'}`,
        `${local === 'id' ? 'Konfirmasi' : 'Confirm'}`,
      ],
      dangerMode: true,
    })
    .then((isConfirm) => {
      if (isConfirm) {
        swal({
          title: `${local === 'id' ? 'Berhasil mengarsipkan catatan ' : 'Archiving note successfully '} ${temp[0].title}`, 
          icon: "success",
        }).then(async () =>{ 
          const archivingNote = await DataSource.ActionArchiveNote(id);

          if (archivingNote.status !== 'success') {
            swal({
              icon: 'error',
              title: `${local === 'id' ? 'Gagal mengarsipkan catatan! ' : 'Archiving note failed!'}`,
            });

            return;
          }

          navigate('/');
          window.location.reload();
        });
      } else {
        swal(`${local === 'id' ? 'Pengarsipan catatan dengan judul ' : 'Archiving note with title '} ${temp[0].title} ${local === 'id' ? ' dibatalkan' : ' cancelled'}`);
      }
    });
  }

  const onActivatedNote = () => {
    const temp = [];
    temp.push({ title });

    swal({
      title: `${local === 'id' ? 'Konfirmasi pengaktifan catatan' : 'Confirmation activating note'}`,
      text: `${local === 'id' ? 'Anda akan mengaktifkan catatan ' : 'You will activated note '} ${temp[0].title}`,
      icon: "warning",
      buttons: [
        `${local === 'id' ? 'Batalkan' : 'Cancel'}`,
        `${local === 'id' ? 'Konfirmasi' : 'Confirm'}`,
      ],
      dangerMode: true,
    })
    .then((isConfirm) => {
      if (isConfirm) {
        swal({
          title: `${local === 'id' ? 'Berhasil mengaktifkan catatan ' : 'Activated note successfully '} ${temp[0].title}`,
          icon: "success",
        }).then(async () =>{ 
          const unarchivingNote = await DataSource.ActionUnarchiveNote(id);

          if (unarchivingNote.status !== 'success') {
            swal({
              icon: 'error',
              title: `${local === 'id' ? 'Gagal mengaktifkan catatan!' : 'Failed activating note!'}`
            });

            return;
          }
          
          navigate('/archives');
          window.location.reload();
        });
      } else {
        swal(`${local === 'id' ? 'Pengaktifan catatan dengan judul ' : 'Activating note with title '} ${temp[0].title} ${local === 'id' ? ' dibatalkan' : ' cancelled'}`);
      }
    });
  }

  return (
    <Card id={id} className={`note-item ${theme === 'light' ? 'bg-dark' : 'bg-light'}`}>
      <Card.Header className="note-item__title">
          <Link className={`${theme === 'light' ? 'text-white' : 'text-dark'}`} to={`/notes/${id}`}>{title}</Link>
      </Card.Header>
      <Card.Body>
        <Card.Text className="note-item__createdAt alert-danger text-muted">
          {showFormattedDate(createdAt, local)}
        </Card.Text>
        <Card.Subtitle className={`note-item__body ${theme === 'light' ? 'text-white' : 'text-dark'}`}>
          {body}
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer>
        <span className="d-flex">
          {
            archived === true && <button className="action" title={`${local === 'id' ? 'Aktifkan catatan' : 'Activate note'}`} onClick={onActivatedNote}><FaCheckCircle /> </button>
          }
          {
            archived === false && <button className="action" title={`${local === 'id' ? 'Arsipkan catatan' : 'Archive note'}`} onClick={onArchivedNote}><FaArchive /> </button>
          }   
          <button className="action ms-2" type="button" title={`${local === 'id' ? 'Hapus catatan' : 'Delete note'}`} onClick={onDeleteHandler}><FaTrash /></button>
        </span>
      </Card.Footer>
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