import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductsSchema = new mongoose.Schema(
{
    Id:          Schema.Types.BigInt,
    Descripcion: String,
    Precio:      Schema.Types.Decimal128,
    Existencias: Schema.Types.BigInt,
    IdFab:       Schema.Types.BigInt,
}, {

});

export default mongoose.model( "Productos", ProductsSchema );
