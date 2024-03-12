export default function ( req, res )
{
    if      ( /\/$|\.html$/.test(   req.url ))  res.setHeader( 'Content-type', 'text/html' );
    else if ( /\.json$/.test(       req.url ))  res.setHeader( 'Content-type', 'application/json' );
    else return
}
