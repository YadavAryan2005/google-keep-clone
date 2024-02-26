import React, { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function lshow(e) {
    try {
      e.preventDefault();
      props.setProgress(60);
      let client = await fetch(
        "https://aryan-google-keep.onrender.com/loginclients",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      props.setProgress(85);
      let result = await client.json();
      console.log(result._id);
      props.setProgress(100);
      alert("login successfully");
      localStorage.setItem("id", result._id);
      props.checkauth();
      console.log(result);
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="flex justify-center mt-5  md:mt-[20vh] w-full">
      <div className="w-full sm:w-1/3 lg:w-1/4 h-[50vh] md:h-[40vh]  p-3 border flex flex-col items-center rounded-ss-3xl rounded-ee-3xl border-blue-400  shadow-2xl shadow-slate-400">
        <form action="" className="flex items-center flex-col" onSubmit={lshow}>
          <h1 className="w-full font-serif text-blue-500 text-xl font-bold">
            Login
          </h1>
          <input
            className="w-full  border mt-4 p-2 rounded-lg"
            type="email"
            name=""
            id=""
            placeholder="Enter Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="w-full  border mt-4 p-2 rounded-lg"
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="bg-blue-500 mt-4 p-2 rounded-lg font-serif hover:bg-blue-600 text-white cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}
