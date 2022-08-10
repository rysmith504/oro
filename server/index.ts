import path from 'path';
import express from 'express';
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
