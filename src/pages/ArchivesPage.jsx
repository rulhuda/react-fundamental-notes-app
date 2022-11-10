/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import PropTypes from "prop-types";
import { useEffect } from "react";
import DataSource from "../data/data-source";
import { getCookie } from "../utils/cookies";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";
import LocalContext from "../contexts/LocalContext";

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
  const navigate = useNavigate();
  const { local } = useContext(LocalContext);

  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(defaultKeyword || '');
  const [filterNotes, setFilterNotes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onSearchHandler = (keyword) => {
    setKeyword(keyword);

    keywordChange(keyword);
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

    const archiveNotes = async () => {
      setLoading(true);
      const AllNotes = await DataSource.GetArchiveNotes();

      setNotes(AllNotes.data)
      setLoading(false);
    }

    archiveNotes();
  }, [])

  useEffect(() => {
    const notesList = (notes, keyword) => {
      if (notes === null) {
        return [];
      }

      const data = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()));

      if (keyword.trim() === '') {
        return notes;
      }

      if (data.length > 0) {
        return data;
      }
    }
    const resultNotes = notesList(notes, keyword);
    setFilterNotes(resultNotes);
  }, [notes, keyword])

  return (
    <section className="archivepage">
      <SearchBar onSearchHandler={onSearchHandler} />
      <h2>{local === 'id' ? 'Daftar Catatan Arsip' : 'List of Archive Notes'}</h2>
      {
        isLoading ? 
        <ThreeDots
        height="80" 
        width="80" 
        radius="9"
        color="#dfdfdf" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        /> : <NotesList notes={filterNotes} />
      }
    </section>
  )
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
}

export default ArchivePageWrapper;