import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils/index";
import { deleteNote, getNote, archiveNote, unarchiveNote } from "../utils/local-data";
import { FaArchive, FaCheckCircle, FaTrash } from "react-icons/fa";
import swal from "sweetalert";


function DetailPage () {
  const { id } = useParams();
  const detailNoteHandler = getNote(id);
  const navigate = useNavigate();

  const [detailNotes] = useState(detailNoteHandler);
  const {title, body, createdAt, archived} = detailNotes;

  const onDeleteHandler = () => {
    const temp = [];
    temp.push({ title });
   
    swal({
      title: `Yakin ingin menghapus ${temp[0].title}?`,
      text: "Setelah terhapus. Catatan tidak bisa dikembalikan lagi!",
      icon: "warning",
      buttons: [
        'Batalkan',
        'Konfirmasi',
      ],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal(`Berhasil menghapus catatan ${temp[0].title}`, {
          icon: "success",
        }).then(() =>{ 
          deleteNote(id)
          navigate("/")
        });
      } else {
        swal(`Penghapusan catatan dengan judul ${temp[0].title} dibatalkan`);
      }
    });

  }
  
  const onArchivedNote = () => {
    const temp = [];
    temp.push({ title });

    swal({
      title: "Konfirmasi pengarsipan catatan",
      text: `Anda akan mengarsipkan catatan ${temp[0].title}`,
      icon: "warning",
      buttons: [
        'Batalkan',
        'Konfirmasi',
      ],
      dangerMode: true,
    })
    .then((isConfirm) => {
      if (isConfirm) {
        swal(`Berhasil mengarsipkan catatan ${temp[0].title}`, {
          icon: "success",
        }).then(() =>{ 
          archiveNote(id);
          navigate("/")
        });
      } else {
        swal(`Pengarsipan catatan dengan judul ${temp[0].title} dibatalkan`);
      }
    });
  }

  const onActivatedNote = () => {
    const temp = [];
    temp.push({ title });

    swal({
      title: "Konfirmasi pengaktifan catatan",
      text: `Anda akan mengaktifkan catatan ${temp[0].title}`,
      icon: "warning",
      buttons: [
        'Batalkan',
        'Konfirmasi',
      ],
      dangerMode: true,
    })
    .then((isConfirm) => {
      if (isConfirm) {
        swal(`Berhasil mengaktifkan catatan ${temp[0].title}`, {
          icon: "success",
        }).then(() =>{ 
          unarchiveNote(id);
          navigate("/archives")
        });
      } else {
        swal(`Pengaktifan catatan dengan judul ${temp[0].title} dibatalkan`);
      }
    });
  }

  return (
    <section className="detail-page">
        <h3 className="detail-page__title">
          {title}
        </h3>
        <p className="detail-page__createdAt">
          {showFormattedDate(createdAt)}
        </p>
        <div className="detail-page__body">
          {body}
        </div>
        <div className="detail-page__action">
          {
            archived === true && <button className="action" title="aktifkan" onClick={onActivatedNote}><FaCheckCircle /> </button>
          }
          {
            archived === false && <button className="action" title="arsipkan" onClick={onArchivedNote}><FaArchive /> </button>
          }   
          <button className="action" type="button" title="hapus" onClick={onDeleteHandler}><FaTrash /></button>
        </div>
    </section>
  )
}

export default DetailPage;