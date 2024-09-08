const mongoos = require("mongoose")

mongoos.connect("mongodb://localhost:27017/Prabhat");

const userSchema = mongoos.Schema({
    name : String,
    Email : String,
    id : Number
});

module.exports = mongoos.model("product", userSchema);