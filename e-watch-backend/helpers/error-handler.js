const express = require('express');
const app = express();

app.use(express.json());
function errorHandler(err, req, res, next) {
    if (res.status(500)){
        return res.status(500).json(err);
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({message: "The user is not authorized"})
    }

    if (err.name === 'ValidationError') {
        //  validation error
        return res.status(401).json({message: err})
    }

    // default to 500 server error
    next
}

module.exports = errorHandler;