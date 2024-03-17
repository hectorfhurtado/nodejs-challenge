import mongoose from 'mongoose';

const FabricaSchema = new mongoose.Schema(
{
    Id:          mongoose.Schema.Types.BigInt,
    Description: String,
    Productos:   [ mongoose.Schema.Types.BigInt ],
});

export default mongoose.model( 'Fabrica', FabricaSchema );
