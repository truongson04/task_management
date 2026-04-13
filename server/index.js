const express = require("express");
const app = express();
require("dotenv").config();

const dbConnection = require("./config/database");
const route = require("./routes/index");
app.use(express.json());
dbConnection.connect();
route(app);

app.listen(process.env.PORT, () => {
  console.log(`The server is running at http://localhost:${process.env.PORT}`);
});
