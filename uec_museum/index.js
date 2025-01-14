const express = require('express');
const app = express();
const port = 3000;

// 静的ファイルを提供
app.use(express.static('public'));

// ルートページ
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
