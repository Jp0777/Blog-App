const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;


const connection = " mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();
// console.log(id.getTimestamp());
MongoClient.connect(connection, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("Something went wrong");
    }

    const db = client.db(databaseName)
    db.collection("tasks").insertMany([{
        description: 'Task1',
        completed: true,
    }, {
        description: 'Task2',
        completed: false,
    },
    {
        description: 'Task3',
        completed: true,
    }], (err, res) => {
        if (err)
            return console.log("Error inserting");

        console.log(res.ops);
    })


    // db.collection('tasks').findOne({}, (err, res) => {
    //     if (err)
    //         return console.log("Unable to fetch");

    //     console.log(res);
    // })

    // db.collection('tasks').find({ completed: true }).toArray((err, res) => {
    //     if (err)
    //         return console.log("Unable to fetch");

    //     console.log(res);
    // })
    // db.collection('tasks').find({ completed: true }).count((err, res) => {
    //     if (err)
    //         return console.log("Unable to fetch");

    //     console.log(res);
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }).then((res) => {
    //         console.log(res)
    //     }).catch((err) => {
    //         console.log(err)
    //     })

    // db.collection('tasks').deleteMany({ completed: true }).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })

})