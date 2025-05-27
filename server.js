const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/shorts', (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  const command = `yt-dlp -f best --get-url "${url}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: "Download failed" });
    return res.json({ download_url: stdout.trim() });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
