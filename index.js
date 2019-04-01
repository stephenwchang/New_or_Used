const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const app = express()
const port = process.env.PORT || 3000
const html_dir = './public/html/'

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.listen(port, () => console.log(`App is running. Visit localhost:${port} in chrome.`))
app.get('/', (req, res) => res.sendFile(html_dir + 'index.html', { root: __dirname }))
