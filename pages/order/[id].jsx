import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../component/Navbar";
import axios from "axios";
import Cookie from "js-cookie";

export default function index() {
  const [orders, setOrder] = useState({
    description: "",
    name: "",
    picture: "",
    price: 0,
    id: "",
  });
  const token = Cookie.get("Token");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios
      .get(`https://api-candidate-test.workforce-develop.com/v1/services/${id}`)
      .then((response) => {
        setOrder({
          description: response.data.description,
          name: response.data.name,
          picture: response.data.picture,
          price: response.data.price,
          id: response.data._id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, token]);

  const onSubmit = async () => {
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      await axios({
        method: "post",
        headers,
        url: `https://api-candidate-test.workforce-develop.com/v1/services/${id}/booking`,
      })
        .then((res) => {
          router.push("/list");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      router.push(`/authen/login`);
    }
  };

  return (
    <>
      <div className="position-relative custom-height-id">
        <Navbar />
      </div>
      <div className="container">
        <h1>{orders.name}</h1>
        <h2> ฿ {orders.price.toLocaleString()}</h2>
        <p dangerouslySetInnerHTML={{ __html: `${orders.description}` }} />
        <div>
          <input
            type="button"
            name="button-submit"
            value="จองบริการ"
            className="custom-button pointer"
            onClick={() => onSubmit()}
          />
        </div>
      </div>
      <style jsx>
        {`
          .custom-height-id {
            height: 250px;
          }
          .custom-button {
            margin-top: 20px;
            font-weight: 600;
            font-size: 16px;
            background-color: blue;
            padding: 15px 50px 15px 50px;
            color: #ffffff;
            outline: none;
            border: 0;
          }
        `}
      </style>
    </>
  );
}
