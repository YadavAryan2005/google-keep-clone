import React, { useState } from "react";

export default function Signup(props) {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  async function show(e) {
    e.preventDefault();
    try {
      props.setProgress(60);
      let client = await fetch(
        "https://aryan-google-keep.onrender.com/clients",
        {
          method: "POST",
          body: JSON.stringify({ email, username, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      props.setProgress(85);
      let result = await client.json();
      console.log(result);
      props.setProgress(100);
      props.setAuth("signup");
      alert("successfully");
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="flex justify-center mt-5  md:mt-[20vh] w-full">
      <div className="w-full md:w-1/3 lg:w-1/4 h-[50vh] md:h-[40vh] p-3 border flex flex-col items-center rounded-ss-3xl rounded-ee-3xl border-blue-400  shadow-2xl shadow-slate-400">
        <form className="flex items-center flex-col" onSubmit={show}>
          <h1 className="w-full font-serif text-blue-500 text-xl font-bold">
            Sign up
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
            type="text"
            name=""
            id=""
            placeholder="Enter User Name"
            required
            onChange={(e) => {
              setUsername(e.target.value);
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
            className="bg-blue-500 mt-2 p-2 rounded-lg font-serif hover:bg-blue-600 text-white cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
        <button
          className="w-fullmt-4  rounded-lg font-serif cursor-pointer text-blue-500 pt-2"
          onClick={() => props.setAuth("signup")}
        >
          Already a member?Log in
        </button>
      </div>
    </div>
  );
}
