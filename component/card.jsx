import React from "react";
import { useRouter } from "next/router";

export default function card({ list }) {
  const router = useRouter();

  const seeBox = (values) => {
    // alert(values.name);
    console.log(values._id);
    router.push(`/order/${values._id}`);
  };

  return (
    <div>
      <div className="row">
        {list.map((data, k) => {
          return (
            <div key={k} className="col-12 col-md-6 col-lg-4">
              <div className="card pointer" onClick={() => seeBox(data)}>
                <img
                  src={data.picture}
                  alt={data.picture}
                  className="object-fit-cover custom-image"
                />
                <div className="custom-name-and-price d-flex justify-content-between align-items-center">
                  <div className="box-name-custom">{data.name}</div>
                  <div>
                    <span className="change-color-yellow">เริ่มต้น</span>{" "}
                    <span className="change-color-blue">
                      ฿ {data.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          .card {
            border-radius: 10px;
            margin-bottom: 50px;
            width: 100%;
            height: 270px;
            box-shadow: 4px 4px 5px hsl(0deg 0% 61% / 30%);
          }

          .custom-name-and-price {
            padding: 20px;
          }

          .box-name-custom {
            width: 130px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .custom-image {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            width: 100%;
            height: 200px;
          }

          @media screen and (min-width: 1200px) {
            .card {
              margin: 20px;
              width: 340px;
            }
          }
        `}
      </style>
    </div>
  );
}
