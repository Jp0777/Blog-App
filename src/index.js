const express = require('express');
const app = express();
require('./db/mongoose');
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(userRouter)
app.use(blogRouter)



app.listen(port, () => {
    console.log("Server is up on ", port);
})