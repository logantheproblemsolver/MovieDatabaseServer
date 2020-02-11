const app = require('./movieApp');


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})