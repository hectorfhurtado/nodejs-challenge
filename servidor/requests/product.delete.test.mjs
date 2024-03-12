import assert from 'node:assert';
import { connect, disconnect } from '../mongo.mjs';
import { describe, it } from 'node:test';
import querystring from 'node:querystring';

import Indexes from '../models/Indexes.mjs';

import getProduct from './product.get.mjs';
import deleteProduct from './product.delete.mjs';
import Productos from '../models/Productos.mjs';

connect();

const { JWT_TOKEN } = process.env;

describe('DELETE /product', () =>
{
    it( '3 should delete a product', async () => {
        const { ProductoId } = await Indexes.findOne( {} );
        const productoBefore = await Productos.findOne({ Id: ProductoId });

        const query = querystring.stringify({
            Id: ProductoId.toString(),
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

        if ( productoBefore === null )
            assert.strictEqual( true, false );

        const res = {
            setHeader() {},
            async end( data ) {
                const status = JSON.parse( data );
                assert.strictEqual( status.Status, true );

                const productoAfter = await Productos.findOne({ Id: ProductoId });
                assert.strictEqual( productoAfter, null );

                disconnect();              
            },
        }
                
        await deleteProduct( req, res );
    })
})
