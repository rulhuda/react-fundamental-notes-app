import React from "react";
import { TbError404 } from "react-icons/tb";

function Page404() {
  return (
    <>
      <p style={{textAlign: "center", fontSize: "56px"}}><TbError404 /></p>
      <h2 style={{textAlign: "center", fontSize: "46px"}}>Halaman yang anda akses tidak tersedia!</h2>
    </>
  )
}

export default Page404;