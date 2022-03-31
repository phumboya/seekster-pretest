import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerClick = async () => {
    const data = {
      fullName: firstName,
      username: username,
      password: password,
    };
    await axios({
      method: "POST",
      url: "https://api-candidate-test.workforce-develop.com/v1/auth/register",
      data,
    })
      .then((res) => {
        Cookie.set("Token", res.data.accessToken);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });

    setFirstName("");
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1 className="my-4">Register Page</h1>
          <div>
            <div>
              <input
                type="text"
                placeholder="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="button"
                value="Submit"
                onClick={() => registerClick()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
