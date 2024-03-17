const { exec } = require( 'child_process' );

const ARCHIVO = 'key.pem';
const COMANDO = `openssl rsa -in ${ ARCHIVO } -outform der -pubout | openssl dgst -sha256 -binary | openssl enc -base64`;

module.exports = ( generador ) =>
{
    exec( COMANDO, ( error, stdout, stderr ) =>
    {
        if (error)       generador.throw( error );
        else
        {
            const sha256 = stdout.trim();

            if (sha256) generador.next( sha256 );
            else        generador.throw( new Error( 'No hubo SHA en la linea de comando' ));
        }
    });
};
