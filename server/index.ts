import path from 'path';
import express from 'express';
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
