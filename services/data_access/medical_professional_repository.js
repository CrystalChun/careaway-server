const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
const medicalProobj = require('../model/medicalprofessional');
/**
 * Constructor of the Repository
 */
function UserAccess(dbConnection)
{
  //fetches the database client connection
  this.db = dbConnection;
}
/**
 * This function inserts a new medicalPro into the 
 * mongodb database with received information
 * 
 * @param {*} medicalPro is the medicalPro object that 
 * is going to be inserted into the database 
 */
UserAccess.prototype.Create = function(medicalPro)
{     
  if(medicalPro instanceof medicalProobj)
  {
   const collection = this.db.collection('Medical Professionals');
   collection.insertOne(medicalPro, function(err, result)
   {
        console.log("Inserted medicalPro");
   });
  }
  else
  {
    console.log("Object is not a Medical Professional type")
  }
};
/**
 * This function edits an existing medicalPro document 
 * within the database
 * @param {*} username the medicalPro object in the database that needs to
 * be edited 
 * @param {*} user the edits to the medicalPro object
 * 
 * @TODO test what happens if you put in a invalid username 
 */
UserAccess.prototype.Edit = function(username, user)
{
  if(medicalPro instanceof medicalProobj)
  {
    const collection = this.db.collection('Medical Professionals');
    collection.updateOne({'username' : username}, { $set: user} , 
    function(err, result)
    {
     console.log("Updated Document");
    });
  }
  else
  {
    console.log("Object is not a Medical Professional type")
  }
};
/** 
* This is the function to get all medicalPro documents
* within the mongo database
*/
UserAccess.prototype.GetAll = function(){
  const collection = this.db.collection('Medical Professionals');
  return new promise(function(fullfill,reject)
  {
    collection.find({}).toArray(function(err, docs)
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
/**
 * This is the function to get one medicalPro documents
 * within the mongo database
 * @param {*} username the medicalPro that is needed to be queried for information
 * returns a promise in order to ensure that the data is received before doing
 * any other operation
 */
UserAccess.prototype.GetOne = function(username)
{
  const collection = this.db.collection('Medical Professionals');
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