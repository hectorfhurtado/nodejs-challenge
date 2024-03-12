import mongoose from 'mongoose';

const IndexesSchema = new mongoose.Schema(
{
    ProductoId: { type: mongoose.Schema.Types.BigInt, default: 0 },
    FabricaId:  { type: mongoose.Schema.Types.BigInt, default: 0 },
});

export default mongoose.model( 'Indexes', IndexesSchema );
