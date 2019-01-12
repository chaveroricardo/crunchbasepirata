const express = require('express');
const router  = express.Router();
//const Empresa = require('../models/empresas')
const Books = require('../models/books')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/libros', (req, res)=>{
  Books.find()
    .then(libros =>{
      res.render('books', {libros})
    })
    .catch(err =>{
      console.log(err)
    })
})

router.get('/libros/add', (req, res, next) => {
  res.render("libro-nuevo");
});

router.post('/libros/add', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  const newBook = new Books({ title, author, description, rating });
  newBook.save()
    .then((book) => {
      res.redirect(301,'/libros');
    })
    .catch((error) => {

    })
});

router.get('/libros/edit',(req,res)=>{
  Books.findOne({_id: req.query.book_id})
  .then((libro)=>{
    res.render('libro-edit',{libro})
  })
  .catch(err=>{console.log(err)})
})

router.post('/libros/edit', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  Books.updateOne({_id: req.query.book_id}, { $set: {title, author, description, rating }})
  .then(book => {
    res.redirect('/libros');
  })
  .catch((error) => {
    console.log(error);
  })
});

router.get('/libros/:id', (req, res)=>{
  let libroId = req.params.id
  console.log(libroId);
  Books.findOne({'_id': libroId})
  .then((libro)=>{
    res.render('book-detalle', { libro })
  })
  .catch((err)=>{
    console.log(err);
  })
})

router.post('/buscar', (req, res)=>{
  let nombreLibro = req.body.titulo;
  Books.findOne({title: {$regex: nombreLibro, $options: 'i'}})
  .then((libro)=>{
    res.redirect(301, `/libros/${libro._id}`)
  })
  .catch(err=>{
    console.log(err);
  })
})
module.exports = router;