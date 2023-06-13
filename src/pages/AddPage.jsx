/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import NoteInput from "../components/NoteInput";
import LocalContext from "../contexts/LocalContext";
import { getCookie } from "../utils/cookies";

function AddPage() {
  const navigate = useNavigate();

  const { local } = useContext(LocalContext);

  useEffect(() => {
    if (getCookie("token").length === 0) {
      swal({
        icon: "warning",
        title: `${
          local === "id" ? "Anda belum login!" : "You are not logged in yet!"
        }`,
        text: `${
          local === "id"
            ? "Harap login terlebih dahulu!"
            : "Please login first!"
        }`,
      }).then(() => {
        navigate("/");
      });
      return;
    }
  }, []);
  return (
    <section className="add-new-page">
      <NoteInput />
    </section>
  );
}

export default AddPage;
