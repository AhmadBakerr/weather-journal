const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

let projectData = {};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('website'));

app.listen(port, () => {
    console.log(`Server running on localhost: ${port}`);
});

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    projectData = { temperature, date, userResponse };
    res.send(projectData);
});
