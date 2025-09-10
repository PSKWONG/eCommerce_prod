const express = require('express');
const path = require('path');

const app = express();

const PORT = 8000;

//Serve a static websiste from the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

//GET request on localhost:8000
//The * symbol will match any route that is not matched by other middleware
//This will allow React routes to work
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});