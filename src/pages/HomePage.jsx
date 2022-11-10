/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import PropTypes from "prop-types";
import DataSource from "../data/data-source";
import { useEffect } from "react";
import { getCookie } from "../utils/cookies";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import LocalContext from "../contexts/LocalContext";

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
  
  const { local } = useContext(LocalContext);
  const onSearchHandler = (keyword) => {
    setKeyword(keyword);

    keywordChange(keyword);
  }

  const addNoteNavigate = () => {
    navigate("/new");
  }

  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(defaultKeyword || '');
  const [filterNotes, setFilterNotes] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
    const AllNotes = async () => {
      setLoading(true);
      const getNotes = await DataSource.GetNotes();
      setNotes(getNotes.data);
      setLoading(false);
    };

    AllNotes();
  }, [])

  useEffect(() => {
    const notesList = (notes, keyword) => {
      if (notes === null) {
        return [];
      }

      const data = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()));

      if (keyword.trim() === '') {
        return notes.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (b.createdAt > a.createdAt) {
            return 1;
          }
          return 0;
        })
      }

      if (data.length > 0) {
        return data;
      }
    }
    
    const resultNotesList = notesList(notes, keyword);
    setFilterNotes(resultNotesList);
  }, [notes, keyword])

  return (
    <section className="homepage">
      <SearchBar onSearchHandler={onSearchHandler} />
      <h2>{local === 'id' ? 'Daftar Catatan Aktif' : 'List of Active Notes'}</h2>
      
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

      <div className="homepage__action">
        <button type="button" className="action" title={`${local === 'id' ? 'Tambah catatan' : 'Add note'}`} onClick={addNoteNavigate}>
          <FaPlusCircle />
        </button>
      </div>
    </section>
  )
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
}

export default HomePageWrapper;