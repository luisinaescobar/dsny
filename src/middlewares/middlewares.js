const { createHmac } = require('crypto');
const jwt = require('jsonwebtoken');

// Athorization: Bearer <token>
function verifyToken(req, res, next) {
    const { JWT_SECRET } = process.env;

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearertoken = bearerHeader.split(" ")[1];
        req.token = bearertoken;
        jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
            if(error){
                return res.send('Invalid token');
            }
            req.user=authData
            return next();
        })

    } else {
        res.send('You need to add your token to the header with the word Bearer');
    }

};
function encript(secret) {
    return createHmac('sha256', secret).digest('hex');
};


module.exports = {
    verifyToken, encript,
}