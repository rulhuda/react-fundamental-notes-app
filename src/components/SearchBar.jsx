import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import LocalContext from "../contexts/LocalContext";

function SearchBar ({ onSearchHandler }) {
  const { local } = useContext(LocalContext);
  return (
    <section className="search-bar">
      <input type='text' placeholder={`${local === 'id' ? 'Cari catatan berdasarkan judul...' : 'Search notes by title...'}`} onChange={(event) => onSearchHandler(event.target.value)}/>
    </section>
  )
}

SearchBar.propTypes = {
  onSearchHandler: PropTypes.func.isRequired,
}

export default SearchBar;