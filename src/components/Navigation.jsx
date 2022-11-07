import React from "react";
import { useContext } from "react";
import { FaArchive, FaMoon, FaSignOutAlt, FaSun, FaUser } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import LocalContext from "../contexts/LocalContext";
import ThemeContext from "../contexts/ThemeContext";
import { deleteCookie, getCookie } from "../utils/cookies";

function Navigation () {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const { local, toggleLocal} = useContext(LocalContext);

  const actionLogout = () => {
    swal({
      icon: 'info',
      title: `${local === 'id' ? 'Yakin ingin logout?' : 'Wanna logout?'}`,
      buttons: [
        `${local === 'id' ? 'Batalkan' : 'Cancel'}`,
        `${local === 'id' ? 'Konfirmasi' : 'Confirm'}`,
      ],
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        deleteCookie('token');
        swal({
          icon: 'success',
          title: `${local === 'id' ? 'Logout berhasil!' : 'Logout sucesfully!'}`,
        }).then(() => {
          navigate('/');
          window.location.reload();
        });
      } else {
        swal({
          icon: 'success',
          title: `${local === 'id' ? 'Logout dibatalkan!' : 'Logout cancelled!'}`,
        });
      }
    })
    
  };

  return (
    <nav className="navigation">
      <ul>
        <>
          <li><Link title={theme === 'light' ? `${local === 'id' ? 'Gelap' : 'Dark'}` : `${local === 'id' ? 'Terang' : 'Light'}`} onClick={toggleTheme}> {theme === 'light' ? <FaMoon /> : <FaSun />} </Link></li>

          <li><Link title={local === 'id' ? 'English' : 'Indonesia'} onClick={toggleLocal}><MdGTranslate /></Link></li>
        </>
        {
          getCookie('token').length > 0 && 
          <>
            <li><Link to='/me' title={`${local === 'id' ? 'Profilku' : 'My Profile'}`}><FaUser /> </Link></li>
            <li><Link to='/archives' title={`${local === 'id' ? 'Arsip catatan' : 'Archived Notes'}`}><FaArchive /> </Link></li>
            <li><Link title={`${local === 'id' ? 'Keluar' : 'Logout'}`}onClick={actionLogout}><FaSignOutAlt /> </Link></li>
          </>
        }    
      </ul>
    </nav>
  )
}

export default Navigation;