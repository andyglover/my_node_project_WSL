const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define the timestamp format variable
const timestampFormat = "humanReadable"; // Change this to your preferred format: iso, compact, humanReadable, unix, custom

function getTimestamp(format) {
  const now = new Date();
  switch (format) {
    case "iso":
      return now.toISOString().replace(/[:.]/g, "-");
    case "compact":
      return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}${String(now.getDate()).padStart(2, "0")}-${String(
        now.getHours()
      ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
        now.getSeconds()
      ).padStart(2, "0")}`;
    case "humanReadable":
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return now
        .toLocaleDateString("en-US", options)
        .replace(/,|:/g, "")
        .replace(/ /g, "-");
    case "unix":
      return Math.floor(Date.now() / 1000);
    case "custom":
      return `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}_${String(now.getDate()).padStart(2, "0")}-${String(
        now.getHours()
      ).padStart(2, "0")}_${String(now.getMinutes()).padStart(2, "0")}_${String(
        now.getSeconds()
      ).padStart(2, "0")}`;
    default:
      return now.toISOString().replace(/[:.]/g, "-");
  }
}

app.post("/submit", (req, res) => {
  const content = req.body.content;
  const timestamp = getTimestamp(timestampFormat);
  const filename = `${timestamp}-note.md`;
  const filepath = path.join(__dirname, "notes", filename);

  fs.writeFile(filepath, content, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error saving file" });
    }
    res.status(200).json({ filename });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
