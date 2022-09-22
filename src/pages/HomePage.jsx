import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import PropTypes from "prop-types";
import { getActiveNotes } from "../utils/local-data";

function HomePageWrapper () {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  )
}

function HomePage ({ defaultKeyword, keywordChange }) {
  const navigate = useNavigate();

  const AllNotes = getActiveNotes().sort((a,b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (b.createdAt > a.createdAt) return 1;
    return 0;
  });
  const [notes] = useState(AllNotes);
  const [keyword, setKeyword] = useState(defaultKeyword || '');

  const onSearchHandler = (keyword) => {
    setKeyword(keyword);

    keywordChange(keyword);
  }

  const notesList = notes.filter((note) => {
    if (note.title.toLowerCase().includes(keyword.toLowerCase()))
    {
      return note;
    }
  })

  const addNoteNavigate = () => {
    navigate("/new");
  }

  return (
    <section className="homepage">
      <SearchBar onSearchHandler={onSearchHandler} />
      <h2>Daftar Catatan Aktif</h2>
      <NotesList notes={notesList} />
      <div className="homepage__action">
        <button type="button" className="action" title="tambah" onClick={addNoteNavigate}>
          <FaPlusCircle />
        </button>
      </div>
    </section>
  )
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
}

export default HomePageWrapper;