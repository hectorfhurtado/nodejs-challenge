import mongoose from 'mongoose';

const IndexesSchema = new mongoose.Schema(
{
    ProductoId: { type: mongoose.Schema.Types.BigInt, default: 0n },
    FabricaId:  { type: mongoose.Schema.Types.BigInt, default: 0n },
});

export default mongoose.model( 'Indexes', IndexesSchema );
