import express from 'express'
import fs from 'fs'
import path from 'path'
import meta from '../package.json'
import searchLrcs from './search-lrcs'
import { ObjectID } from 'mongodb'

let router = express.Router()
let indexDoc = fs.readFileSync(path.join(__dirname, '..', 'public', meta.name, meta.version, 'index.html')).toString()
let db, now

// boot

function boot(req, res) {
  res.end(indexDoc)
}

router.get('/', boot)
router.get('/p/*', boot)

// put-now

router.put('/now', (req, res) => {
  let _now = req.body.now

  now = _now
  resEmpty(res)
})

// get-now

router.get('/now', (req, res) => {
  resData(res, { now: now })
})

// search

const SEARCH_LIMIT = 30

router.get('/search/:searchEngine/:keyword', (req, res) => {
  let params = req.params
  
  searchLrcs({
    keyword: params.keyword,
    limit: SEARCH_LIMIT,
    searchEngine: params.searchEngine,
    onProgress: (progress) => res.write(JSON.stringify({ type: 'progress', value: progress })),
    onLrc: (lrc) => res.write(JSON.stringify({ type: 'lrc', value: lrc })),
    onEnd: () => res.end()
  })
})

// remove lrc

router.delete('/lrc/:_id', (req, res) => {
  let _idStr = req.params._id
  let _id

  try {
    _id = ObjectID(_idStr)
  } catch (e) {
    return resErr(res, '403', '歌词id不合法')
  }

  db.collection('lrcs').deleteOne({ _id: _id }, (err, result) => {
    if (err) res500(res)
    else if (result.result.n === 1) return resEmpty(res)
    else return resErr(res, '404', '要删除的歌词不存在')
  })
})

// patch lrc

router.patch('/lrc/:_id', (req, res) => {
  let data = req.body
  let _idStr = req.params._id
  let _id

  try {
    _id = ObjectID(_idStr)
  } catch (e) {
    return resErr(res, '403', '歌词id不合法')
  }

  db.collection('lrcs').updateOne({ _id: _id }, { $set: data }, (err, result) => {
    if (err) res500(res)
    else if (result.result.n === 1) return resEmpty(res)
    else return resErr(res, '404', '要编辑的歌词不存在')
  })
})

// get lrc

router.get('/lrc/:_id', (req, res) => {
  let _idStr = req.params._id
  let _id

  try {
    _id = ObjectID(_idStr)
  } catch (e) {
    return resEmpty(res)
  }

  db.collection('lrcs').find({ _id: _id }).toArray((err, docs) => {
    if (err) res500(res)
    else resData(res, { lrc: docs[0] })
  })
})

// get lrcs

router.get('/lrcs', (req, res) => {
  db.collection('lrcs').find({}, {
    isImg: 0,
    content: 0,
  }).sort({ pos : -1 }).toArray((err, docs) => {
    if (err) res500(res)
    else resData(res, { lrcs: docs })
  })
})

// post lrc

router.post('/lrc', (req, res) => {
  let lrc = req.body
  lrc.pos = Date.now()

  db.collection('lrcs').insert(lrc, (err, data) => {
    if (err) res500(res)
    else resData(res, { _id: data.ops[0]._id})
  })
})

export default function (options) {
  db = options.db
  return router
}

function res500(res) {
  resErr(res, '500', '服务器炸啦 @_@')
}

function resErr(res, id, msg) {
  res.json({
    err: {
      id: id,
      msg: msg,
    },
  })
}

function resData(res, data) {
  res.json({ data: data })
}

function resEmpty(res) {
  res.json({})
}