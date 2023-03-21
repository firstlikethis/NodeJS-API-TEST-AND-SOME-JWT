const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
    return next();
    
}


module.exports = verifyToken;