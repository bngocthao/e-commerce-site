const expressJwt = require('express-jwt')

function authJwt() {
    const secret = "BuiHoangYen"
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            // chấp nhận phương thức get mà k cần auth
            {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            '/api/users/login',
            `/api/users/register`,
        ]
    })
}

async function isRevoked(req, payload, done){
    if(!payload.isAdmin) {
        done (null, true)
    }

    done(null, false)
}

module.exports = authJwt