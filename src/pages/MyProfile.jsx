/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ThemeContext from "../contexts/ThemeContext";
import LocalContext from "../contexts/LocalContext";
import DataSource from "../data/data-source";
import { getCookie } from "../utils/cookies";

function MyProfile() {
  const [myData, setMyData] = useState(
    {id : '', name: '', email: ''}
  );
    
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { local } = useContext(LocalContext);
  const { id, name, email } = myData;

  useEffect(() => {
    if (getCookie('token').length === 0) {
      swal({
        'icon': 'warning',
        'title': 'Anda belum login!',
        'text': 'Harap login terlebih dahulu!',
      }).then(() => {
        navigate('/');
      });
      return;
    }
    getMyData();
  }, []);

  const getMyData = async () => {
    const getAllData = await DataSource.Profile();
    setMyData(getAllData);
  };

  return (
    <Card className={`${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <Card.Header className="bg-primary text-center">
        <h1>{local === 'id' ? 'Profilku' : 'My Profile'}</h1>
      </Card.Header>
      <Card.Body>
        <table className={`${theme === 'light' ? 'text-muted' : 'text-grey'}`}>
          <tbody>
            <tr>
              <td className="p-1 fs-5 text-start">Id</td>
              <td colSpan="2" className="px-2 text-start">: </td>
              <td className="p-1 fs-5 text-start">{id ? id :
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
              }</td>
            </tr>
            <tr>
              <td className="p-1 fs-5 text-start">{local === 'id' ? 'nama' : 'name'}</td>
              <td colSpan="2" className="px-2 text-start">: </td>
              <td className="p-1 fs-5 text-start">{name ? name : 
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
              }</td>
            </tr>
            <tr>
              <td className="p-1 fs-5 text-start">Email</td>
              <td colSpan="2" className="px-2 text-start">: </td>
              <td className="p-1 fs-5 text-start">{email ?email : 
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
              }</td>
            </tr>
          </tbody>
        </table>
      </Card.Body>
    </Card>
  )
}

export default MyProfile;
