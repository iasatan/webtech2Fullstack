const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const posts = require("./routes/api/posts");


//midlleware
app.use(express.json());
app.use(cors());
app.use("/api/posts", posts);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/public"));
    app.get(/.*/, (req, res) => {
            res.sendFile(__dirname + "/public/index.html");
        }
    )
}

app.listen(port, () => {
    console.log("Server started on " + port);
});

