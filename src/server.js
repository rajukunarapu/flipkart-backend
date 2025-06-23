require('dotenv').config();
const app = require("./app");
const connectDB = require("./config/db")

// for vercel deployment, It doesn't take app.listen()
// module.exports = app;

connectDB().then(() => {
  console.log("DB connected successfully");
  app.listen(`${process.env.SERVER_PORT}`,()=>console.log(`Server is running on ${process.env.SERVER_PORT} port`))
}).catch((error)=>console.log(error))
