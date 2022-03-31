import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function login() {
  const router = useRouter();

  const [erros, setErrors] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginClick = async () => {
    const data = {
      username: username,
      password: password,
    };
    await axios({
      method: "POST",
      url: "https://api-candidate-test.workforce-develop.com/v1/auth/signin",
      data,
    })
      .then((res) => {
        Cookie.set("Token", res.data.accessToken);
        router.push("/");
      })
      .catch((error) => {
        setErrors(error.response.data.message);
      });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1 className="mt-5">Login</h1>
          <div>
            <div>
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
                onClick={() => loginClick()}
              />
              <span
                className="pointer ml-5"
                onClick={() => router.push("/authen/register")}
              >
                Register
              </span>
            </div>
          </div>
          <div className="mt-5 text-danger">{erros && <p>{erros}</p>}</div>
        </div>
      </div>
    </>
  );
}
