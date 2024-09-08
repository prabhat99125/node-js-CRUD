const express = require("express");
const app = express();
const db = require("./dbConetction");
const path = require("path");
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.get("/", async (req, res) => {
    let userData = await db.find()
    res.render("index", { userData: userData });
});
app.post("/create", async (req, res) => {
    await db.create({
        name: req.body.name,
        Email: req.body.email,
        id: req.body.id
    });
    res.redirect("/")
});
app.get("/edit/:id", async (req, res) => {
    const user = await db.findOne({_id : req.params.id});
    console.log(user);
    res.render("update", {user});
})
app.post("/update/:id", async (req, res) => {
    let { name, email, id} = req.body
    let find = await db.findOneAndUpdate(
        {_id : req.params.id},
        { name, Email : email, id },
        {new : true}
    );
    console.log(find);
    res.redirect("/");
});
app.get("/delete/:id", async (req, res) => {
    await db.deleteOne({
        _id : req.params.id
    });
    res.redirect("/")
});
app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })