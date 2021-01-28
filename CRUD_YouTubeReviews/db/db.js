const MongoClient = require('mongodb').MongoClient;
const api = require('./dbKey');
const uri = api.getDB();
const client = new MongoClient(uri, { useNewUrlParser: true });

const dbName = 'Reviews';


async function insertReview() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection('Reviews');


        let review = {
            '_id' : 0,
            'title': 'Title',
            'url': '/123123',                                                                                                                           
            "review": 'I didnt like this video',
            'rating': 2
        }

        // const p = await col.insertOne(review)

        const review1 = await col.findOne();

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

async function getReviews(){
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection('Reviews');
        const review =  await col.find({});
        const reviews = [];

        review.forEach(element => {
            reviews.push(element);
        })
        return reviews;

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

module.exports = {
    getReviews,
    insertReview
};