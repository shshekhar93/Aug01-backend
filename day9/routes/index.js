const bcrypt = require('bcryptjs');

var express = require('express');
var router = express.Router();

require('../lib/db');
const UserModel = require('../models/user');
const TodoModel = require('../models/todo');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn !== true) {
    return res.redirect('/login');
  }

  const userEmail = req.session.user.email;

  TodoModel.find({ userEmail }, function(err, todos) {
    if(err) {
      throw err;
    }
    
    todos = todos.map(function(document) {
      return document.toJSON();
    });

    res.render('index', {
      title: 'ToDo List',
      todos
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
  const emailFromUser = req.body.email;
  const password = req.body.password;

  // const user = DB.getUserByEmail(email);

  UserModel.findOne({ email: emailFromUser }, function(err, user) {
    if(err || !user) {
      return res.redirect('/login');
    }
  
    bcrypt.compare(password, user.password, function(err, isSame) {
      if(err) {
        throw err;
      }
  
      if(isSame) {
        req.session.loggedIn = true;
        req.session.user = user;
        res.redirect('/');
      }
      else {
        res.redirect('/login');
      }
    });
  });
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  // req.body contains the user information.
  const password = req.body.password;

  bcrypt.hash(password, 8, function(err, passHash) {
    if(err) {
      throw err;
    }
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: passHash
    });

    user.save(function(err) {
      if(err) {
        console.log('Unable to save in DB', err.stack);
        throw err;
      }

      res.redirect('/login');
    });
  });
});

// Todo routes
router.post('/todo', function(req, res) {
  const todoText = req.body.todoText;
  const userEmail = req.session.user.email;
  const todoDoc = new TodoModel({
    todoText,
    userEmail
  });

  todoDoc.save(function(err) {
    if(err) {
      throw err;
    }
    res.redirect('/');
  })
});

router.post('/todo/delete', function(req, res) {
  const todoId = req.body.todoId;

  TodoModel.deleteOne({ _id: todoId }, function(err) {
    if(err) {
      console.log('An error occured');
      console.log(err.stack);
      return;
    }

    res.redirect('/');
  });
});

module.exports = router;
