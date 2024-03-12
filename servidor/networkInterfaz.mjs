
import os from 'os';

export default function ( PUERTO )
{
    const networkInterfaces = os.networkInterfaces();
    console.assert( !!networkInterfaces, 'networkInterfaces', networkInterfaces );

    /* eslint no-console: off */
    console.log( 'Intenta acceder a traves de cualquiera de las siguientes direcciones: ' );

    let direcciones = [];

    /* eslint guard-for-in: off */
    for (const interfaz in networkInterfaces)
    {
        for (const subinterfaz of networkInterfaces[ interfaz ])
        {
            if (subinterfaz.internal === false && subinterfaz.family === 'IPv4')
            {
                const direccion = `https://${ subinterfaz.address }:${ PUERTO }`;

                console.log( direccion );
                direcciones.push( direccion );
            }
        }
    }

    return direcciones;
};
