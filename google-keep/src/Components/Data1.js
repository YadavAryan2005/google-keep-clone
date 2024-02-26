import React from "react";
import "../App.css";
import { Card, Button } from "antd";
import { DeleteOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
export default function Data1(props) {
  async function del() {
    try {
      let _id = props.index;
      let result = await fetch(
        `https://aryan-google-keep.onrender.com/ArchiveDelete`,
        {
          method: "delete",
          body: JSON.stringify({ _id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error + "thsi is error");
    }
    let aid = localStorage.getItem("id");
    try {
      let result = await fetch(
        `https://aryan-google-keep.onrender.com/ArchiveD`,
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
  async function delandinsert() {
    try {
      let _id = props.index;
      let result = await fetch(
        `https://aryan-google-keep.onrender.com/ArchiveDeleteandInsert`,
        {
          method: "delete",
          body: JSON.stringify({ _id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error + "thsi is error");
    }
    let aid = localStorage.getItem("id");
    try {
      let result = await fetch(
        `https://aryan-google-keep.onrender.com/ArchiveD`,
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
  return (
    <div className="flex aryan">
      <div className="p-5 relative cursor-pointer">
        <Card
          title={props.title}
          key={props.index}
          bordered={false}
          className="border  shadow-xl w-[250px] sm:w-[300px]"
        >
          <p>{props.Content}</p>
        </Card>
      </div>
      <div className="sachin absolute items-center ml-56">
        <Button
          className={`bg-blue-400`}
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          size="large"
          onClick={() => del()}
        />
        <Button
          className={`bg-blue-400 mx-3`}
          type="primary"
          shape="circle"
          icon={<VerticalAlignTopOutlined />}
          size="large"
          onClick={() => delandinsert()}
        />
      </div>
    </div>
  );
}
