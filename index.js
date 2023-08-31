import express  from "express" // si no se utiliza type mode se deberia de declarar como const express = require('express');
import { crud_students } from "./controller/crud_students.js"
//Paso 7


//Paso 1
const app_e = express() // crear variable para acceder al expressjs
app_e.use(express.urlencoded({extended:false}));
app_e.use(express.json());
// Paso 4 (directorios estaticas)
app_e.use(express.static('./view'))
app_e.use(express.static('./controller'))
app_e.use(express.static('./model'))
// Paso 5 configurar el motor vistas
app_e.set('views','./view')
app_e.set('view engine','ejs')
//Paso 2
app_e.listen('5000',function(){
    console.log('Aplicacion Iniciada : http://localhost:5000/')
})
// Paso 3
app_e.get('/',crud_students.leer);
app_e.post('/crud_s',crud_students.cud);