import express from "express";

const expressApp = express();
const PORT = 8080;

expressApp.get("/ping", (req, res) => {
    res.status(200).send("pong");
});

expressApp.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`);
})