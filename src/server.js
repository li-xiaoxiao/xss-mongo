const express = require('express')
const bodyParse = require('body-parser')
const model = require('./mongo//model.js')
const cheerio = require('cheerio')
const whiteList = {
  'img': ['src']
}
const escapeHtml = (str) => {
  if (!str) return ''
  str = str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quto;')
            .replace(/'/g, '&#39;')
            .replace(/ /g, '&#32;')
  return str
}
const xssFilter = (html) => {
  if (!html) return
  const $ = cheerio.load(html, {
    normalizeWhitespace: true,
    xmlMode: true
  })
  $('*').each((index, elem) => {
    if (!whiteList[elem.name]) {
      $(elem).remove()
      return
    }
    for (var attr in elem.attribs) {
      if (whiteList[elem.name].indexOf(attr) === -1) {
        $(elem).attr(attr, null)
      }
    }
  })
  console.log(html, $.html())
  return $.html()
}
const app = express()
app.use(bodyParse.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.set({
    'X-XSS-Protection': '0',
    'Content-Security-Policy': "default-src 'self'"
  })
  next()
})

app.get('/index', (req, res) => {
  const id = req.query.id || ''
  res.send(`<textarea>${id}</textarea>`)
})

app.get('/api', (req, res) => {
  const cb = (result) => {
    result = result.map(item => {
      const { comment, name, time } = item
      return {
        name,
        time,
        comment: comment
      }
    })
    res.send({
      data: result,
      message: 'success',
      status: 1
    })
  }
  model.find({}, cb)
})
app.post('/api/submit', (req, res) => {
  const data = req.body
  const cb = (result) => {
    res.send({
      data: 'success',
      message: 'success',
      status: 1
    })
  }
  model.insert({ ...data }, cb)
})
app.listen(3001)
console.log('3000端口启动')
