const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
const medicalProobj = require('../model/systemadmin.js');
/**
 * Constructor of the system Admin Repository
 */
function UserAccess(dbConnection)
{
  //fetches the database client connection
  this.db = dbConnection;
}
/**
 * This is the function to get one system admin documents
 * within the mongo database
 * @param {*} username the system admin that is needed to be queried for information
 * returns a promise in order to ensure that the data is received before doing
 * any other operation
 */
UserAccess.prototype.GetOne = function(username)
{
  const collection = this.db.collection('System Admin');
  return new promise(function(fullfill,reject)
  { 
    collection.find({username : username}).toArray(function(err, docs) 
    {
      if(err)
      {
        console.log("Failed to get query");
        reject(err);
      }
      else
      {
        console.log("Successfully got query");
        fullfill(docs);
      }
    });
  });
};

module.exports = UserAccess;