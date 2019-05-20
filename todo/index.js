let express = require('express');
let app = express();
let controller = require('./controller/controller.js');

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controller
controller(app);

// listen to port
app.listen(3000);
console.log('app port 3000!');


// 이미 있는 todolist element 는 어떻게?
// 날짜가 지난 todolist element 를 추가하면?
