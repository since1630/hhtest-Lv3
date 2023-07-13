const express = require('express');
const app = express();
const postRouter = require('./routes/posts.router.js');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use('/', postRouter);
const PORT = 3000;

/** (구현) **/

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`);
});
