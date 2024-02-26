const express = require("express");
const cors = require("cors");
require("./db/connect");
const data = require("./db/model");
const clients = require("./db/model1");
const dataA = require("./db/model2");
const dataD = require("./db/model3");
const app = express();
app.use(express.json());
app.use(cors());
//insert client in database
app.post("/clients", async (req, res) => {
  let result = await new clients(req.body);
  let note = result.save();
  res.send(note);
});
//search clients in database
app.post("/loginclients", async (req, res) => {
  let result = await clients.findOne(req.body);
  res.send(result);
});
//insert datea in data
app.post("/InsertNote", async (req, res) => {
  let result = await new data(req.body);
  let note = result.save();
  res.send(note);
});
//display data of note
app.post("/NoteD", async (req, res) => {
  let da = await data.find(req.body);
  res.send(da);
});
//display data of Achive
app.post("/ArchiveD", async (req, res) => {
  let da = await dataA.find(req.body);
  res.send(da);
});
//display data of delete note
app.post("/TrashD", async (req, res) => {
  let da = await dataD.find(req.body);
  res.send(da);
});

//delete data of note
app.delete("/NoteDelete", async (req, res) => {
  let result = await data.findOne(req.body);
  let note = await new dataD({
    aid: result.aid,
    title: result.title,
    content: result.content,
  });
  await note.save();
  let da = await data.deleteOne(req.body);
  res.send(da);
});

//delete data of achieve
app.delete("/ArchiveDelete", async (req, res) => {
  let result = await dataA.findOne(req.body);
  let note = await new dataD({
    aid: result.aid,
    title: result.title,
    content: result.content,
  });
  await note.save();
  let da = await dataA.deleteOne(req.body);
  res.send(da);
});
// delete trash data
app.delete("/TrashDelete", async (req, res) => {
  let da = await dataD.deleteOne(req.body);
  res.send(da);
});
//data insert form note to archive
app.delete("/NoteDeleteandInsert", async (req, res) => {
  let result = await data.findOne(req.body);
  let note = await new dataA({
    aid: result.aid,
    title: result.title,
    content: result.content,
  });
  await note.save();
  let da = await data.deleteOne(req.body);
  res.send(da);
});
//delete from archive and insert into notes

app.delete("/ArchiveDeleteandInsert", async (req, res) => {
  let result = await dataA.findOne(req.body);
  let note = await new data({
    aid: result.aid,
    title: result.title,
    content: result.content,
  });
  await note.save();
  let da = await dataA.deleteOne(req.body);
  res.send(da);
});
//delete from trash and insert into notes
app.delete("/DeleteandInsert", async (req, res) => {
  let result = await dataD.findOne(req.body);
  let note = await new data({
    aid: result.aid,
    title: result.title,
    content: result.content,
  });
  await note.save();
  let da = await dataD.deleteOne(req.body);
  res.send(da);
});
//listen port number
app.listen(5002, () => {
  console.log("server is running");
});
