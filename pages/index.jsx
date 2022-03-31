import React, { useEffect, useState } from "react";
import Head from "next/head";
import Card from "../component/card";
import Navbar from "../component/Navbar";
import axios from "axios";

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-candidate-test.workforce-develop.com/v1/services")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>SeekSter Pre-trest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-main">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <div className="text-center">
            <h1>คำบรรยายต่างๆนานา</h1>
            <p>
              เรามีบริการที่ครบครันครอบคลุม พร้อมที่จะช่วยเหลือคุณใน
              <br />
              ทุกๆด้านอย่างที่คุณต้องการ
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h1>งานบริการ</h1>
        <div>
          <Card list={list} />
        </div>
      </div>
      <style jsx>
        {`
          .bg-main {
            background-image: url("/housewife.png");
            height: 450px;
            background-position: bottom;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
          }

          .custom-box-banner {
            width: 100%;
          }

          .custom-box {
            height: 50px;
          }
        `}
      </style>
    </>
  );
}
