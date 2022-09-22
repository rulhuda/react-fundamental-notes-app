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
        <header className="sticky-top bg-dark">
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
      </div>
    );
}

export default NotesApp;