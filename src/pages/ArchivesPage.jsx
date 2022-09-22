import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import PropTypes from "prop-types";
import { getArchivedNotes } from "../utils/local-data";

function ArchivePageWrapper () {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  }

  return (
    <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  )
}

function ArchivePage ({ defaultKeyword, keywordChange }) {

  const AllNotes = getArchivedNotes().sort((a,b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (b.createdAt > a.createdAt) return 1;
    return 0;
  });;

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

  return (
    <section className="archivepage">
      <SearchBar onSearchHandler={onSearchHandler} />
      <h2>Daftar Catatan Arsip</h2>
      <NotesList notes={notesList} />
    </section>
  )
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
}

export default ArchivePageWrapper;