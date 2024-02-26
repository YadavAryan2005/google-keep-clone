import "./App.css";
import LoadingBar from "react-top-loading-bar";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DeleteOutlined,
  BulbOutlined,
  DownloadOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Data from "./Components/Data";
import Data1 from "./Components/Data1";
import Data2 from "./Components/Data2";
import Insert from "./Components/Insert";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [progress, setProgress] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //menu item index
  const [menuIndex, setMenuIndex] = useState(1);
  //auth checking
  const [auth, setAuth] = useState(localStorage.getItem("id"));
  const [pos, setPos] = useState("hidden");
  //featching data from database
  const [data, setData] = useState([]);
  async function fetchData(T_name) {
    if (auth === null || auth === undefined || auth === "signup") {
    } else {
      let aid = localStorage.getItem("id");
      try {
        setProgress(65);
        let result = await fetch(
          `https://aryan-google-keep.onrender.com/${T_name}`,
          {
            method: "POST",
            body: JSON.stringify({ aid }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProgress(90);
        result = await result.json();
        setData(result);
        setProgress(100);
      } catch (error) {
        console.log(error + "thsi is error");
      }
    }
  }
  function checkAuth() {
    setAuth(localStorage.getItem("id"));
  }
  useEffect(() => {
    return () => fetchData("NoteD");
  }, []);
  return (
    <Layout>
      <Header
        className="z-10 fixed w-full sm:bg-white top-0"
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <div className="flex items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
              pos === "hidden" ? setPos(" ") : setPos("hidden");
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <h1 className="font-serif text-2xl">keep</h1>
          <div className="w-full justify-end mr-6 hidden md:flex">
            <div className="flex justify-center items-center border rounded-xl overflow-hidden">
              <div className=" h-10 flex rounded-md">
                <input
                  className="outline-none px-2 font-serif"
                  type="text"
                  placeholder="Search by title"
                />
                <Button
                  type="text"
                  className="bg-blue-500 rounded-xl px-3  text-slate-200 font-serif"
                  icon={<h1>Search</h1>}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 40,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Header>
      <LoadingBar
        className="mt-[64px]"
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Layout style={{ marginTop: 64, width: "100% ", zIndex: 1 }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={`z-5 ${pos} md:block min-h-[80vh] h-auto w-full md:w-auto`}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[]}
            items={[
              {
                key: "1",
                icon: <BulbOutlined />,
                label: "Note",
                onClick: function () {
                  setCollapsed(!collapsed);
                  setMenuIndex(1);
                  fetchData("NoteD");
                  pos === "hidden" ? setPos(" ") : setPos("hidden");
                },
              },
              {
                key: "2",
                icon: <DownloadOutlined />,
                label: "Archive",
                onClick: function () {
                  setCollapsed(!collapsed);
                  setMenuIndex(2);
                  fetchData("ArchiveD");
                  pos === "hidden" ? setPos(" ") : setPos("hidden");
                },
              },
              {
                key: "3",
                icon: <DeleteOutlined />,
                label: "Trash",
                onClick: function () {
                  setCollapsed(!collapsed);
                  setMenuIndex(3);
                  fetchData("TrashD");
                  pos === "hidden" ? setPos(" ") : setPos("hidden");
                },
              },
              {
                key: " ",
                icon: <PoweroffOutlined />,
                label: "Log Out",
                onClick: function () {
                  setCollapsed(!collapsed);
                  localStorage.clear();
                  checkAuth();
                  pos === "hidden" ? setPos(" ") : setPos("hidden");
                },
              },
            ]}
          />
        </Sider>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 590,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {auth === null || auth === undefined ? (
            <Signup setAuth={setAuth} setProgress={setProgress} />
          ) : auth === "signup" ? (
            <Login checkauth={checkAuth} setProgress={setProgress} />
          ) : (
            <div className="flex gap-2 mt-7 flex-wrap justify-center md:justify-start w-full">
              {menuIndex === 1 ? <Insert setData={setData} /> : " "}
              {menuIndex === 1
                ? data
                    .slice(0)
                    .reverse()
                    .map((e) => {
                      return (
                        <Data
                          setData={setData}
                          index={e._id}
                          title={e.title}
                          Content={e.content}
                        />
                      );
                    })
                : menuIndex === 2
                ? data
                    .slice(0)
                    .reverse()
                    .map((e) => {
                      return (
                        <Data1
                          setData={setData}
                          index={e._id}
                          title={e.title}
                          Content={e.content}
                        />
                      );
                    })
                : data
                    .slice(0)
                    .reverse()
                    .map((e) => {
                      return (
                        <Data2
                          setData={setData}
                          index={e._id}
                          title={e.title}
                          Content={e.content}
                        />
                      );
                    })}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
