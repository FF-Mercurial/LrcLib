import config from './config'
import fs from 'fs'
import path from 'path'
import { MongoClient } from 'mongodb'

let localList = fs.readdirSync(path.resolve(__dirname, 'lrcs')).map((filename) => filename.replace(/\.pdf$/, ''))

// process.exit()

MongoClient.connect(config.mongoConnectionString, (err, db) => {
  if (err) throw err

  db.collection('lrcs').find({}, { title: 1 }).toArray((err, lrcs) => {
    let remoteList = lrcs.map((lrc) => lrc.title)
    let foo = []
    localList.forEach((item) => {
      if (remoteList.indexOf(item) === -1) foo.push(item)
    })
    console.log(foo)
  })
})