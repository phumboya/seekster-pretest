import React from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <>
      <div className="box-nav d-none d-md-flex align-items-center">
        <p className="pointer mb-0 mr-5" onClick={() => router.push("/")}>
          บริการ
        </p>
        <p className="pointer mb-0" onClick={() => router.push("/list")}>
          รายการ
        </p>
      </div>
      <style jsx>
        {`
          .box-nav {
            position: absolute;
            padding: 50px;
            right: 15%;
            color: red;
          }
        `}
      </style>
    </>
  );
}
