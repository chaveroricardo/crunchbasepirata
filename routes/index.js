const express = require('express');
const router  = express.Router();
// const Empresa = require('../models/empresas')
const Books = require('../models/books')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/libros', (req, res)=>{
  Books.find()
    .then(empresas =>{
      res.render('books', {libros})
    })
    .catch(err =>{
      console.log(err)
    })
})

router.get('/libros/:id', (req, res)=>{
  let empresaId = req.params.id
  console.log(libroId);
  Empresa.findOne({'_id': libroId})
  .then((libro)=>{
    res.render('book-detalle', { libro })
  })
  .catch((err)=>{
    console.log(err);
  })
})

router.post('/buscar', (req, res)=>{
  let nombreEmpresa = req.body.empresa;
  Empresa.findOne({name: {$regex: nombreEmpresa, $options: 'i'}})
  .then((empresa)=>{
    res.redirect(301, `/empresas/${empresa._id}`)
  })
  .catch(err=>{
    console.log(err);
  })
})
module.exports = router;
