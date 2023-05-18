const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = require("./models");

const userRouter = require("./routes/user");
app.use("/users", userRouter);

// const adminRouter = require("./routes/admin");
// app.use("/users/admin", adminRouter);

// const providerRouter = require("./routes/provider");
// app.use("/users/provider", providerRouter);

// const cimtuserRouter = require("./routes/cimtuser");
// app.use("/users/cimtuser", cimtuserRouter);

const resourceRouter = require("./routes/resource");
app.use("/resources", resourceRouter);

const functionsRouter = require("./routes/resourceFunction");
app.use("/functions", functionsRouter);

const unitsRouter = require("./routes/unit");
app.use("/units", unitsRouter);

const incidentRouter = require("./routes/incident");
app.use("/incidents", incidentRouter);

const categoryRouter = require("./routes/category");
app.use("/categories", categoryRouter);

db.sequelize
  // .sync({ force: true})
  // .sync({ alter: true })
  .sync()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

