//imports
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

const port = process.env.PORT || 4000;

//middlewares
const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

//db connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to Database!"))
  .catch((err) => {
    console.log(err);
  });

//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//product routes
app.use("/api/product", productRoute);

//start server
app.listen(port, () =>
  console.log(`server up and Running at http://localhost:${port} `)
);
