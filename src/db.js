import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useFindAndModify: false, // 기존 몽고DB처럼 쓰기 위한 설정
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
