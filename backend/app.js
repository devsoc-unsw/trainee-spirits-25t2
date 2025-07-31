const express = require('express');
const cors = require('cors'); //


    const app = express();
    const port = 3000;

    app.use(cors());

    app.get('/', (req, res) => {
  res.json({ message: 'Hello Spirits! This is the Backend calling!' });
});

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });