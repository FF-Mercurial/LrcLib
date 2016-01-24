import config from './config'
import fs from 'fs'
import { MongoClient } from 'mongodb'

MongoClient.connect(config.mongoConnectionString, (err, db) => {
  if (err) throw err

  db.collection('lrcs').find({}).toArray((err, lrcs) => {
    lrcs.forEach((lrc) => {
      let pos = 1000 * parseInt(lrc._id.toString().slice(0, 8), 16)
      db.collection('lrcs').updateOne({ _id: lrc._id }, {
        $set: { pos: pos }
      }, (err, data) => {
        if (err) throw err
        console.log(lrc._id)
      })
    })
  })
})