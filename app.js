const Express = require("express");
const Bodyparser = require("body-parser");
const Mongoose = require("mongoose");
const Cors = require("cors");
const { StudentModel } = require("./model/student");

const app = new Express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: false }));

app.use(Cors());

Mongoose.connect(
  "mongodb+srv://Archana:Archana@cluster0.d5wvbdh.mongodb.net/Studentdb?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/add", async (req, res) => {
  const data = req.body;
  const student = new StudentModel(data);
  const result = await student.save((err, data) => {
    if (err) {
      res.json({
        status: "error",
        error: err,
      });
    } else {
      res.json({
        status: "success",
        data: data,
      });
    }
  });
  console.log(data);
});

app.post("/viewall", (req, res) => {
  StudentModel.find((err, data) => {
    if (err) {
      res.json({
        status: "error",
        error: err,
      });
    } else {
      res.json(data);
    }
  });
});

app.post("/search", (req, res) => {
  const data = req.body;

  StudentModel.find(data, (err, data) => {
    if (err) {
      res.json({
        status: "error",
        error: err,
      });
    } else {
      res.json(data);
    }
  });
});

app.put("/update", (req, res) => {
  const admno = req.body.admno;
  const data = req.body;
  StudentModel.findOneAndUpdate({ admno: admno }, data, (err, data) => {
    if (err) {
      res.json({ status: "error", error: err });
    } else {
      res.json({ status: "updated", data: data });
    }
  });
});
app.delete("/delete", (req, res) => {
  const admno = req.body.admno;
  const data = req.body;
  StudentModel.findOneAndDelete({ admno: admno }, data, (err, data) => {
    if (err) {
      res.json({ status: "error", error: err });
    } else {
      res.json({ status: "deleted", data: data });
    }
  });
});
app.listen(3000, () => {
  console.log("Server Started");
});
