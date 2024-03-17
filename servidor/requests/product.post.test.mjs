import assert from 'node:assert';
import { connect, disconnect } from '../mongo.mjs';
import { describe, it } from 'node:test';
import querystring from 'node:querystring';

import getProduct from './product.get.mjs';
import addProduct from './product.post.mjs';

connect();

const { JWT_TOKEN } = process.env;

const query = querystring.stringify({
    Descripcion: 'Producto de prueba',
    Existencias: '100',
    Precio:      '150',
    IdFab:       '2',
});

const req = {
    headers: {
        authorization: 'Bearer ' + JWT_TOKEN,
    },
    on( event, callback ) {
        if ( event === 'data' )
            callback( Buffer.from( query, 'utf-8' ));
        else if ( event === 'end' )
            callback();
    },
}

describe('POST /product', () =>
{
    it( '2 should add a product', async () => {
        let productsForFabrica2 = 0
        let productsAfterPost = 0

        const resGet1 = {
            setHeader() {},
            async end( data ) {
                const productos = JSON.parse( data );
                productsForFabrica2 = productos[ '2' ].length;

                const resPost = {
                    setHeader() {},
                    async end( data ) {
                        const status = JSON.parse( data );
                        assert.strictEqual( status.Status, true );

                        const resGet2 = {
                            setHeader() {},
                            end( data ) {
                                const productos = JSON.parse( data );
                                productsAfterPost = productos[ '2' ].length;

                                assert.strictEqual( productsAfterPost, productsForFabrica2 + 1 );

                                disconnect();
                            },
                        }

                        await getProduct( req, resGet2 );
                    },
                }

                await addProduct( req, resPost );
            },
        }
                

        

        await getProduct( req, resGet1 );
    })
})
