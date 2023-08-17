const express = require("express");
const cors = require("cors");
const { verifyJwt, setupUserInfo } = require("./middlewares/auth-middleware");

const app = express();
app.use(cors());

// enforce on all endpoints
app.use(verifyJwt);
app.use(setupUserInfo);

app.get("/api", (req, res) => {
  res.send("/api called : homepage_api");
});

app.get("/api/protected", async (req, res) => {
  res.send(req.user);
});

app.listen(4000, () => {
  console.log("Server on port 4000");
});
