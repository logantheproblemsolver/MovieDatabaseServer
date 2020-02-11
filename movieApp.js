require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const helmet= require('helmet');
const cors = require('cors');

const MOVIES = require('./movieData.json')

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(function validateApiRequests(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res
            .status(401)
            .json(({error: 'Unauthorized Request'}))
    }

    next();
})

function handleGetMovies(req, res) {
    let response = MOVIES.movies;

    if(req.query.genre) {
        response = response.filter(movies => 
            movies.genre.toLowerCase().includes(req.query.genre.toLowerCase())
            )
    };

    if(req.query.country) {
        response = response.filter(movies => 
            movies.country.toLowerCase().includes(req.query.country.toLowerCase())
            )
    };

    if(req.query.avg_vote) {        
        response = response.filter(movies => 
            Number(movies.avg_vote) >= Number(req.query.avg_vote)
            )
    };
    res.json(response)
}

app.get('/movies', handleGetMovies)








module.exports = app;