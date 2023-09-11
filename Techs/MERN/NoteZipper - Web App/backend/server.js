const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const noteRoutes = require("./Routes/noteRoutes");

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());

const connectDatabase = require("./db/conn");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
connectDatabase();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Connection is live on port number ${port}`);
});
