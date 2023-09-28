const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, './build')));

const apiProxy = createProxyMiddleware({ target: 'http://localhost:8081', changeOrigin: true })
app.use('/api', apiProxy);

app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, './build')});
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
