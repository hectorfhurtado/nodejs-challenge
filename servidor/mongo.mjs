import mongoose from "mongoose";

const { DB, DB_CONNECTION_RETRY_TIMEOUT } = process.env;

let closedProperly = false;

mongoose.connection.on('connecting', () => 
{
    console.log('Connecting to MongoDB...');
});

mongoose.connection.on('error', (error) => 
{
    console.error(`MongoDB connection error: ${error}`);
    
    mongoose.disconnect();
});

mongoose.connection.on('connected', () => 
{
    console.log('Connected to MongoDB!');
});

mongoose.connection.once('open', () => 
{
    console.log('MongoDB connection opened.');
});

mongoose.connection.on('reconnected', () => 
{
    console.log('MongoDB reconnected!');
});

mongoose.connection.on('disconnected', () => 
{
    if (closedProperly)
        return;
    
    console.error(`MongoDB disconnected. Reconnecting in ${DB_CONNECTION_RETRY_TIMEOUT / 1000}s...`);

    setTimeout(() => connectWithRetry(), DB_CONNECTION_RETRY_TIMEOUT);
});


const connectWithRetry = async () => 
{
    return await mongoose.connect(DB);
};

export { connectWithRetry as connect };

export function disconnect()
{
    closedProperly = true;

    return mongoose.connection.close();
}
