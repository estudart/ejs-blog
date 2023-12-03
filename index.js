import express from "express";
import { render } from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var articleList = [];

app.get("/", (req, res) => {
  var data = articleList;
  res.render("index.ejs", { data });
});

app.post("/newArticle", (req, res) => {
  articleList.push(req.body);
  res.render("add.ejs");
});

app.get("/addArticles", (req, res) => {
  var data = articleList;
  res.render("addarticles.ejs", { data });
});

app.post("/showArticle", (req, res) => {
  var data = {
    text: req.body.articleText,
    author: req.body.articleAuthor,
    date: req.body.articleDate,
    title: req.body.articleTitle,
  };
  console.log(data);
  res.render("showarticle.ejs", { data });
});

app.post("/deleteArticle", (req, res) => {
  articleList = articleList.filter(
    (item) => item.title !== req.body.articleTitle
  );
  var data = articleList;
  res.render("index.ejs", { data });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
