const express = require('express');  //create istance of express package
const app = express();      //start express app from express library
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');


//Routers
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
});      

