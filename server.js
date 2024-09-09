const { app } = require("./app");

//setting config file for dotenv
const SERVER_PORT = 5000 || process.env.SERVER_PORT;

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

// handle unhandled uncaughtException
process.on("uncaughtException", (err) => {
  console.log({ error: err.message });
  console.log("Shutting down the server because of uncaughtException");
  server.close(() => process.exit(1));
});
