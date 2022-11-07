import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddPage from "../pages/AddPage";
import DetailPage from "../pages/DetailPage";
import HomePageWrapper from "../pages/HomePage";
import ArchivePageWrapper from "../pages/ArchivesPage";
import Navigation from "./Navigation";
import Page404 from "../pages/404";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import MyProfile from "../pages/MyProfile";
import { getCookie } from "../utils/cookies";
import { ThemeProvider } from "../contexts/ThemeContext";
import { useState } from "react";
import { useEffect } from "react";
import { LocalProvider } from "../contexts/LocalContext";

function NotesApp () {
  const getTheme = localStorage.getItem('theme') || 'dark';
  const getLocal = localStorage.getItem('local') || 'id';

  const [theme, setTheme] = useState(getTheme);
  const [local, setLocal] = useState(getLocal);

  function toggleTheme () {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  }

  function toggleLocal () {
    setLocal(local => (local === 'id' ? 'en' : 'id'))
  }
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('local', local);
  },[])
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  },[theme])

  useEffect(() => {
    localStorage.setItem('local', local);
  }, [local])
  return (
    <ThemeProvider value={{theme, toggleTheme}} >
    <LocalProvider value={{local, toggleLocal}} >
      <div className={`app-container ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
        <header className={`sticky-top ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
          <h1><Link to="/" style={{textDecoration: "none"}}>{local === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="*" element={<Page404 />} />
            {
              getCookie('token').length > 0 ?
              <Route path="/" element={<HomePageWrapper />} />
              : <Route path="/" element={<LoginPage />} />
            }
            <Route path="/archives" element={<ArchivePageWrapper />} />
            <Route path="/new" element={<AddPage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
            <Route path="/*/*" element={<Page404 />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/me" element={<MyProfile />} />
          </Routes>
        </main>
      </div>
    </LocalProvider>
    </ThemeProvider>
  );
}

export default NotesApp;