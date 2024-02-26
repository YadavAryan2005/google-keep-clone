import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
export default function Insert(props) {
  const [toggle, setToggle] = useState("hidden");
  const [h, setH] = useState("12");
  function Show() {
    setToggle("show");
    setH("32");
  }
  function Show123() {
    setToggle("hidden");
  }
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  async function insertNote() {
    if (title === undefined && content === undefined) {
      alert("please provide a title and content");
    } else {
      let aid = localStorage.getItem("id");
      try {
        await fetch(`https://aryan-google-keep.onrender.com/InsertNote`, {
          method: "post",
          body: JSON.stringify({ aid, title, content }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error + "thsi is error");
      }
      setTitle(undefined);
      alert("Added");
      try {
        let result = await fetch(
          `https://aryan-google-keep.onrender.com/NoteD`,
          {
            method: "POST",
            body: JSON.stringify({ aid }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        result = await result.json();
        props.setData(result);
      } catch (error) {
        console.log(error + "thsi is error");
      }
    }
  }
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div
          className={`rounded-md w-full md:w-1/3 border-2  p-2 flex flex-col gap-4 h-${h}`}
        >
          <input
            className={`outline-none font-serif ${toggle}`}
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            className="outline-none font-serif"
            type="text"
            name="content"
            id=""
            placeholder="Take a note..."
            onClick={Show}
            onDoubleClick={Show123}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div className="w-full flex justify-end">
            <Button
              className={`bg-blue-400 ${toggle}`}
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              onClick={insertNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
