const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = global.Promise; 
const db = mongoose.connection;

//데이터베이스 접속 확인
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("mongo DB connected...")
});

