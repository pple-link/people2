import { connectDatabase } from "./database";
import { runServer } from "./server";

const PORT = Number(process.env.PORT) || 3000; // default port
const HOST = process.env.HOST || "localhost"; // localhost

async function startApplication() {
  try {
    await connectDatabase();
    console.log("database is connected successfully");
    await runServer(HOST, PORT);
    console.log(`server is running on ${PORT}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

startApplication();
