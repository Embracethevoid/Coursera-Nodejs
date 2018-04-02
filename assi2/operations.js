const assert = require('assert');
const MongoClient = require("mongodb").MongoClient

exports.insertDocument = (db,document,collection,callback) => {
  const coll = db.collection(collection);
  return coll.insert(document);
};

exports.findDocument = (db,collection,callback) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

exports.removeDocument = (db,document,collection,callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db,document,update,collection,callback) => {
  const coll = db.collection(collection);
  return coll.updateOne(document,{$set:update},null);
};
