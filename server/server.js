const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initializes express

const app = express();

// Middleware
// Body parser to read incoming requests correctly

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors to enable requests from another HTTP origin (mobile application)

app.use(cors());

// Import routers

const userRouter = require("./routes/user.router");
const postRouter = require("./routes/posts.router");

// Call and initialize routers

app.use("/user", userRouter);
app.use("/post", postRouter);

// Defines port based on if server is hosted or not, if it is not hosted and no PORT is listed in ENV, use port 5000

const PORT = process.env.PORT || 5000;

// Listens for server calls on the desired port

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
