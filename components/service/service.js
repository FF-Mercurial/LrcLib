import loading from 'ui/loading'

export function getNow(cb) {
  GET('/now', defaultHandler(cb))
}

export function setNow(now, cb) {
  PUT('/now', {
    now: now
  }, defaultHandler(cb))
}

export function removeLrc(_id, cb) {
  DELETE(`/lrc/${_id}`, defaultHandler(cb))
}

export function patchLrc(_id, data, cb) {
  PATCH(`/lrc/${_id}`, data, defaultHandler(cb))
}

export function getLrc(_id, cb) {
  GET(`/lrc/${_id}`, defaultHandler(cb))
}

export function getLrcs(cb) {
  GET('/lrcs', defaultHandler(cb))
}

export function saveLrc(title, tags, content, cb) {
  POST('/lrc', {
    title: title,
    tags: tags,
    content: content,
  }, defaultHandler(cb))
}

export function search(wd, onProgress, onLrc, onEnd) {
  streamGet(
    `/search?wd=${wd}`,
    (chunk) => {
      switch (chunk.type) {
        case 'progress': return onProgress && onProgress(chunk.value)
        case 'lrc': return onLrc && onLrc(chunk.value.join('\n'))
      }
    },
    onEnd
  )
}

function DELETE(url, onLoad) {
  ajax('DELETE', url, {}, onLoad)
}

function POST(url, data, onLoad) {
  ajax('POST', url, data, onLoad)
}

function PUT(url, data, onLoad) {
  ajax('PUT', url, data, onLoad)
}

function PATCH(url, data, onLoad) {
  ajax('PATCH', url, data, onLoad)
}

function GET(url, onLoad) {
  ajax('GET', url, undefined, onLoad)
}

function streamGet(url, onChunk, onEnd) {
  streamAjax('GET', url, undefined, onChunk, onEnd)
}

function ajax(method, url, data, onLoad, noLoading) {
  let req = new XMLHttpRequest()
  let ptr = 0

  noLoading || loading.show()
  req.open(method, url)
  req.setRequestHeader('Content-type', "application/json")
  req.send(data ? JSON.stringify(data) : undefined)
  req.onload = function () {
    noLoading || loading.hide()
    onLoad && onLoad(this.response && JSON.parse(this.response))
  }
}

function streamAjax(method, url, data, onChunk, onEnd, showLoading) {
  let req = new XMLHttpRequest()
  let ptr = 0

  showLoading && loading.show()
  req.open(method, url)
  req.setRequestHeader('Content-type', "application/json")
  req.send(data ? JSON.stringify(data) : undefined)

  req.onload = () => {
    showLoading && loading.hide()
    onEnd && onEnd()
  }

  req.onprogress = () => {
    let chunk
    
    while (chunk = getChunk(req.response)) {
      onChunk && onChunk(chunk)
    }
  }

  function getChunk(stream) {
    let begin = ptr
    let braceDepth = 0
    let inString = false
    let escaping = false
    
    while (ptr < stream.length) {
      let ch = stream[ptr++]

      if (escaping) continue

      switch (ch) {
        case '{':
          if (inString) break
          braceDepth++
          break
        case '}':
          if (inString) break
          if (--braceDepth === 0) return JSON.parse(stream.slice(begin, ptr))
        case '\\':
          escaping = true
          break
        case '"':
          inString = !inString
      }
    }

    return
  }
}

function defaultHandler(cb) {
  return (ret) => cb(ret.err, ret.data)
}