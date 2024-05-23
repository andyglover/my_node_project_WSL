const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/submit", (req, res) => {
  const content = req.body.content;
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const filename = `note-${timestamp}.md`;
  const filepath = path.join(__dirname, "notes", filename);

  fs.writeFile(filepath, content, (err) => {
    if (err) {
      return res.status(500).send("Error saving file");
    }
    res.status(200).send("File saved successfully");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
