const jwt = require('jsonwebtoken');
const secretKey = 'H2fJt9Oq7Z';

const codeParam = (event) => {
    try {
        const token = jwt.sign(event, secretKey);
        console.log(token);
        return token;
    } catch (error) {
        console.error('Error during token generation:', `from ${event}`);
        return 'error'
    }
};

const decode = (event) => {
    try {
        const decoded = jwt.verify(event, secretKey);
        return decoded;
    } catch (error) {
        // console.error('Error during token decoding:', error);
        return 'error';
    }
};

module.exports = { codeParam, decode }