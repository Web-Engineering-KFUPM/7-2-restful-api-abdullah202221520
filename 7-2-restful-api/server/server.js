import express from "express";
import cors from "cors";

// import dotenv and load environment variables from .env
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import { Song } from "./models/song.model.js";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

await connectDB(process.env.MONGO_URL);

// api/songs (Read all songs)
app.get("/api/songs", async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
});

// api/songs (Insert song)
app.post("/api/songs", async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.json(song);
});

// /api/songs/:id (Update song)
app.put("/api/songs/:id", async (req, res) => {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(song);
});

// /api/songs/:id (Delete song)
app.delete("/api/songs/:id", async (req, res) => {
    const song = await Song.findByIdAndDelete(req.params.id);
    res.json(song);
});
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));