/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotesList from "../components/NotesList";
import PropTypes from "prop-types";
import DataSource from "../data/data-source";
import { useEffect } from "react";
import { getCookie } from "../utils/cookies";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import LocalContext from "../contexts/LocalContext";
import FiltersComponent from "../components/FiltersComponent";
import dayjs from "dayjs";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  };

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

function HomePage({ defaultKeyword, keywordChange }) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      "title-query": "",
      body: "",
      "body-query": "",
      "createdAt-starts": "",
      "createdAt-ends": "",
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  console.log(formik.values);

  const { local } = useContext(LocalContext);

  const addNoteNavigate = () => {
    navigate("/new");
  };

  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(defaultKeyword || "");
  const [isLoading, setLoading] = useState(false);

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
    const AllNotes = async () => {
      setLoading(true);
      const getNotes = await DataSource.GetNotes();
      setNotes(getNotes.data);
      setLoading(false);
    };

    AllNotes();
    console.log(notes);
  }, []);

  console.log("notes", notes);

  const filteredNotes = useMemo(() => {
    let temp = notes;

    const query = {
      contains: "contains",
      starts: "starts",
      ends: "ends",
    };

    if (formik.values?.title) {
      if (formik.values["title-query"] === query.contains) {
        temp = temp.filter((note) => {
          return note.title
            .toLowerCase()
            .includes(formik.values?.title.toLowerCase());
        });
      } else if (formik.values["title-query"] === query.starts) {
        temp = temp.filter((note) => {
          return note.title
            .toLowerCase()
            .startsWith(formik.values?.title.toLowerCase());
        });
      } else if (formik.values["title-query"] === query.ends) {
        temp = temp.filter((note) => {
          return note.title
            .toLowerCase()
            .endsWith(formik.values?.title.toLowerCase());
        });
      }
    }

    if (formik.values?.body) {
      if (formik.values["body-query"] === query.contains) {
        temp = temp.filter((note) => {
          return note.body
            .toLowerCase()
            .includes(formik.values?.body.toLowerCase());
        });
      } else if (formik.values["body-query"] === query.starts) {
        temp = temp.filter((note) => {
          return note.body
            .toLowerCase()
            .startsWith(formik.values?.body.toLocaleLowerCase());
        });
      } else if (formik.values["body-query"] === query.ends) {
        temp = temp.filter((note) => {
          return note.body
            .toLowerCase()
            .endsWith(formik.values?.body.toLowerCase());
        });
      }
    }

    if (formik.values?.["createdAt-starts"]) {
      temp = temp.filter((note) => {
        return (
          dayjs(formik.values?.["createdAt-starts"]).format("YYYY-MM-DD") <=
          dayjs(note.createdAt).format("YYYY-MM-DD")
        );
      });
    }

    if (formik.values?.["createdAt-ends"]) {
      temp = temp.filter((note) => {
        return (
          dayjs(formik.values?.["createdAt-ends"]).format("YYYY-MM-DD") >=
          dayjs(note.createdAt).format("YYYY-MM-DD")
        );
      });
    }

    return temp;
  }, [notes, keyword, formik.values]);

  return (
    <section className="homepage">
      {/* <SearchBar onSearchHandler={onSearchHandler} /> */}
      <h1>Filters</h1>
      <FiltersComponent formik={formik} />
      <h2>
        {local === "id" ? "Daftar Catatan Aktif" : "List of Active Notes"}
      </h2>

      {isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#dfdfdf"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <NotesList notes={filteredNotes} />
      )}

      <div className="homepage__action">
        <button
          type="button"
          className="action"
          title={`${local === "id" ? "Tambah catatan" : "Add note"}`}
          onClick={addNoteNavigate}
        >
          <FaPlusCircle />
        </button>
      </div>
    </section>
  );
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
