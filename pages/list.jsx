import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import axios from "axios";
import moment from "moment-timezone";
import Navbar from "../component/Navbar";

export default function list() {
  const router = useRouter();
  const token = Cookie.get("Token");
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      axios({
        method: "get",
        headers,
        url: `https://api-candidate-test.workforce-develop.com/v1/orders`,
      })
        .then((res) => {
          setListOrder(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      router.push("/authen/login");
    }
  }, [token]);

  return (
    <div>
      <div className="position-relative custom-navbar">
        <Navbar />
      </div>
      <div className="container mt-5">
        <h1>รายการ</h1>
        <div className="my-5">
          {listOrder.length > 0 ? (
            <div>
              {listOrder.map((data, id) => {
                return (
                  <div key={id}>
                    <div className="box-custom mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5>{data.service.name}</h5>
                        <div>
                          <span className="change-color-yellow">ราคา </span>
                          <span className="change-color-blue"> ฿ 500</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-stretch mt-4">
                        <i className="fa-solid fa-calendar-days change-color-blue mr-3 mb-0" />
                        <p className="mb-0">
                          {moment(data.customer.createdAt)
                            .tz("Asia/Bangkok")
                            .format("DD MMMM YYYY")}
                        </p>
                        <i className="fa-solid fa-clock mx-3 change-color-blue mb-0" />
                        <p className="mb-0">
                          {moment(data.customer.createdAt)
                            .tz("Asia/Bangkok")
                            .format("HH:mm")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <p>ยังไม่มีรายการ</p>
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .custom-navbar {
            width: 100%;
            height: 50px;
          }

          .box-custom {
            border-radius: 10px;
            padding: 25px 50px 25px 50px;
            border: 1px solid #c5d5d9;
            box-shadow: 4px 4px 5px hsl(0deg 0% 61% / 30%);
          }
        `}
      </style>
    </div>
  );
}

// createdAt: "2022-03-31T10:01:08.301Z"
// customer: {_id: "624560439bc86c99cd1adb38", fullName: "test2", username: "test2",…}
// createdAt: "2022-03-31T08:03:15.760Z"
// fullName: "test2"
// updatedAt: "2022-03-31T08:03:15.760Z"
// username: "test2"
// _id: "624560439bc86c99cd1adb38"
// service: {_id: "623a3ea346105a8f976da8fa", name: "ทำความสะอาดทั่วไป 2 ชั่วโมง", price: 549,…}
// description: "\nเหมาะสำหรับ: คอนโด อพาร์ทเม้นท์\n\n• ห้องนอนสตูดิโอ\n\n• ขนาดพื้นที่ประมาณ 25-40 ตร.ม.\n\n⚠️สถานที่หน้างานนั้นต้องสามารถใช้น้ำประปาและไฟฟ้าระหว่างเข้าให้บริการได้ \n\nTips\n\n💡 แนะนำให้จองบริการล่วงหน้าอย่างน้อย 1 วันเพื่อให้แม่บ้านได้มีเวลาเตรียมอุปกรณ์ทำความสะอาดสำหรับลูกค้านะคะ :)"
// name: "ทำความสะอาดทั่วไป 2 ชั่วโมง"
// picture: "https://seekster-company.oss-ap-southeast-1.aliyuncs.com/workforce-candidate-test/iYmjLjwjf7g58zKekycw2Ts9"
// price: 549
// _id: "623a3ea346105a8f976da8fa"
// updatedAt: "2022-03-31T10:01:08.301Z"
// __v: 0
// _id: "62457be49bc86c99cd1adc0f"
