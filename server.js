const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const server = http.createServer(app);

const port = process.env.PORT || 9000;

mongoose
	.connect(process.env.mongoDB_URL)
	.then(() => {
		console.log("Database connected");
	})
   .catch((err) => console.log(`Database connection error: ${err}`));

server.listen(port, () => {
	console.log(`server running on port http://localhost:${port}`);
});
