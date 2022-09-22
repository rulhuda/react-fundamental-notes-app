import React from "react";
import PropTypes from "prop-types";

function SearchBar ({ onSearchHandler }) {
  return (
    <section className="search-bar">
      <input type='text' placeholder="Cari catatan berdasarkan judul .." onChange={(event) => onSearchHandler(event.target.value)}/>
    </section>
  )
}

SearchBar.propTypes = {
  onSearchHandler: PropTypes.func,
}

export default SearchBar;