import assert from 'node:assert';
import { connect, disconnect } from '../mongo.mjs';
import { describe, it } from 'node:test';
import getProduct from './product.get.mjs';

connect();

const { JWT_TOKEN } = process.env;

const req = {
    headers: {
        authorization: 'Bearer ' + JWT_TOKEN,
    },
}

describe('GET /product', () =>
{
    it( 'should always pass', async () => assert.strictEqual(1, 1));

    it( '1 should show all products', ( t, done ) =>
    {
        const res = {
            setHeader() {},

            end( data )
            {
                const productos = JSON.parse( data );
                assert.strictEqual( productos[ '1' ][ 0 ].Id, '1' );
                assert.strictEqual( productos[ '1' ][ 0 ].Descripcion, 'Primer producto' );
                assert.strictEqual( productos[ '1' ][ 0 ].Existencias, '100' );
                assert.strictEqual( productos[ '1' ][ 0 ].Precio, '150' );
                assert.strictEqual( productos[ '1' ][ 0 ].IdFab, '1' );
            },
        }

        getProduct( req, res ).then( () => {
            disconnect();
            done();
        });
    });
})
