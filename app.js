var cors=require('cors')
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router=require('./routes/route');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/db', router);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// if (process.env.NODE_ENV === "production") {
  // app.use(express.static("notesApp-frontend/dist/white-board"));
  // app.get("*", (req, res) => {
  //   res.sendFile(
  //     path.resolve(__dirname, "notesApp-frontend", "dist", "white-board", "index.html")
  //   );
  // });
// }

app.listen(process.env.PORT || 3000,()=>{
  console.log(`Server running @ ${process.env.PORT || 3000}`);
})
module.exports = app;
