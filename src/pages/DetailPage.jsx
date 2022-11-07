import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils/index";
import { FaArchive, FaCheckCircle, FaTrash } from "react-icons/fa";
import swal from "sweetalert";
import DataSource from "../data/data-source";
import { useEffect } from "react";
import { getCookie } from "../utils/cookies";
import { RotatingLines } from "react-loader-spinner";
import { useContext } from "react";
import LocalContext from "../contexts/LocalContext";


function DetailPage () {
  const { id } = useParams();
  const navigate = useNavigate();
  const { local } = useContext(LocalContext);

  const [detailNote, setDetailNote] = useState([]);
  const {title, body, createdAt, archived} = detailNote;

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
          navigate("/")
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

          navigate("/")
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
          
          navigate("/archives")
        });
      } else {
        swal(`${local === 'id' ? 'Pengaktifan catatan dengan judul ' : 'Activating note with title '} ${temp[0].title} ${local === 'id' ? ' dibatalkan' : ' cancelled'}`);
      }
    });
  }

  useEffect(() => {
    if (getCookie('token').length === 0) {
      swal({
        'icon': 'warning',
        'title': `${local === 'id' ? 'Anda belum login!' : 'You are not logged in yet!'}`,
        'text': `${local === 'id' ? 'Harap login terlebih dahulu!' : 'Please login first!'}`,
      }).then(() => {
        navigate('/');
      });
      return;
    }

    const detailNoteHandler = async (id) => {
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={true}
      />
      const note = await DataSource.GetNote(id);
      setDetailNote(note)
    }

    detailNoteHandler(id);
  }, [])

  return (
    <section className="detail-page">
        <h3 className="detail-page__title">
          {title ? title : 'title loading...'}
        </h3>
        <p className="detail-page__createdAt">
          {createdAt ? showFormattedDate(createdAt, local) : 'created At loading...'}
        </p>
        <div className="detail-page__body">
          {body ? body : 'Isi catatan kosong!'}
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