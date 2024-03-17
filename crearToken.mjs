import jwt from 'jsonwebtoken';

const baseToken = {
    pwd: '123456',
}

const { TOKEN_SECRET } = process.env;

console.log( jwt.sign( baseToken, TOKEN_SECRET ));
