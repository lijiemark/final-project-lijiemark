import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get("/", (req, res) => {
  res.send("Home")

})

app.get("/api", (req, res) => {
  res.json({ "users": ['userOne'] })
})

app.listen(process.env.PORT || 3001, () => { console.log("Back end running on 3001") });
