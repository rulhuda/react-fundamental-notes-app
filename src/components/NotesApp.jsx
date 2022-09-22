import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddPage from "../pages/AddPage";
import DetailPage from "../pages/DetailPage";
import HomePageWrapper from "../pages/HomePage";
import ArchivePageWrapper from "../pages/ArchivesPage";
import Navigation from "./Navigation";

function NotesApp () {
    return (
      <div className="app-container bg-dark">
        <header>
          <h1><Link to="/" style={{textDecoration: "none"}}>Aplikasi Catatan</Link></h1>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePageWrapper />} />
            <Route path="/archives" element={<ArchivePageWrapper />} />
            <Route path="/new" element={<AddPage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
          </Routes>
        </main>
        <footer className="bg-light text-dark text-center m-0 p-3">
          <h3 className="text-center">
            <Link className="text-dark text-decoration-none" to="https://github.com/rulhuda">Nurul Huda</Link>
          </h3>
            <hr />
          <h2>{new Date().getFullYear()}</h2>
        </footer>
      </div>
    );
}

export default NotesApp;