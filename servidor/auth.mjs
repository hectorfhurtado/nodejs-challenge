import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

export default function ( req, res )
{
    const bearer = req.headers.authorization;
    if (bearer === undefined)
    {
        res.statusCode = 401;
        res.end( JSON.stringify({ Message: 'No se suministró un token' }));
    
        return 1;
    }

    const token = bearer.split(' ')[1];
    let decoded;
    try
    {
        decoded = jwt.verify( token, TOKEN_SECRET );
    }
    catch (e)
    {
        console.error( e );

        res.statusCode = 401;
        res.end( JSON.stringify({ Message: 'El token suministrado es inválido' }));
    
        return 1;
    }

    return 0;
}
