import fs from 'fs';
import path from 'path';

import productGet from './requests/product.get.mjs';
import addProduct from './requests/product.post.mjs';
import deleteProduct from './requests/product.delete.mjs';

const PUBLICO = '../publico';

export default async function ( req, res )
{
    const URL    = req.url;
    const METHOD = req.method;
    
    const __dirname = import.meta.dirname;

    // / o /index.html
    if (/\/$|\/index\.html$/.test( URL ))
        fs.createReadStream( path.join( __dirname, PUBLICO + URL + 'index.html' )).pipe( res );

    if ( /producto$/.test( URL ) && METHOD === 'GET')
        productGet( req, res );

    if ( /producto$/.test( URL ) && METHOD === 'POST' )
        addProduct( req, res )
    
    if ( /producto$/.test( URL ) && METHOD === 'DELETE' )
        deleteProduct( req, res )
    
}

// TODO: Add Postman collection and query type
