process.env.NODE_DEBUG = 'crypto';
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

exports.handler = async (event, context) => {
  // parse the request body to get the email address
  const { email } = JSON.parse(event.body);

  // connect to the MongoDB database
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db('news-email-list');
  const collection = db.collection('subscribed-user');

  // insert the email address into the database
  await collection.insertOne({ email });

  // return a success response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Successfully subscribed!' }),
  };
};
