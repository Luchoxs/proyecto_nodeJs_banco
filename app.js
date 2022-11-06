var asig_controller = require('./asig_controller');
var Asig = require('./asignatura');
var doc_controller=require ('./doc_controller');
var docen =require('./docente');
var est_controller =require('./est_controller');
var estu =require('./estudiantes');
var R_controller =require('./R_controller');
var racademico=require('./R_academico');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
//const { application } = require('express');
//const { connect } = require('mssql');
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

// configuracion servidor 
var port = process.env.port || 8090;
app.listen(port);
console.log('running in the port '+ port);

router.use((request,response,next) =>{
console.log('Welcome, Time:', Date.now());
next();
});

// ruta asignatura
router.route('/registros').get((request, response)=>{
    R_controller.getRegistro().then(result =>{
        response.json(result);
        console.log(result)
    })
})
// ruta por id
router.route("/buscarID/:ID").get((request, response) => {
    R_controller.buscarPorId(request.params.ID).then((result) => {
      response.json(result);
      console.log(result);
    });
  });

// insertar
router.route('/insertar').post((request, response)=>{
    let order = {...request.body}
    R_controller.post(order).then(result =>{
        response.status(201).json(result);        
        console.log(result)
       console.log('Creado!!!')
    })
})

//editar
router.route('/edit/:ID').put((request, response)=>{
    let order = {...request.body}
    R_controller.putRacademico(order,request.params.ID).then(result =>{
       response.json(result)     
       console.log('editado!!!')
    })
})

// ELIMINAR
router.route('/delete/:id').delete((request, response)=>{
    let order = {...request.body}
     R_controller.deleteXId(order,request.params.id).then(result =>{
        response.json(result)     
        // console.log(result)
        console.log('Eliminado!!!')
     })
 })
 