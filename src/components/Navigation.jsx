import React from "react";
import { FaArchive } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navigation () {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to='/archives' title="arsip catatan"><FaArchive /> </Link></li>
      </ul>
    </nav>
  )
}

export default Navigation;