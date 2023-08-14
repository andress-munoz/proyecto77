import { Router } from "express";
import jwt from "jsonwebtoken";
import "node-fetch";
import Swal from "sweetalert2";

const tienda = Router();

tienda.get("/", async(req, res) => {

    let info= "";
    let url = "http://localhost:5000/api/product"
    await fetch(url, {method:"GET"})
    .then(res=>res.json())
    .then(data=>{
        info = data
    })

    res.render("tienda.ejs", {
        "title": "Tienda",
        "menu": 1,
        "productos": info,
    })

})

tienda.get("/portatil", async(req, res) => {

    let info= "";
    let url = "http://localhost:5000/api/product"
    await fetch(url, {method:"GET"})
    .then(res=>res.json())
    .then(data=>{
        info = data
    })

    res.render("tienda.ejs", {
        "title": "Portatil",
        "menu": 2,
        "productos": info,
    })
       
})

tienda.get("/pc", async(req, res) => {
    let info= "";
    let url = "http://localhost:5000/api/product"
    await fetch(url, {method:"GET"})
    .then(res=>res.json())
    .then(data=>{
        info = data
    })

    res.render("tienda.ejs", {
        "title": "Pc",
        "menu": 3,
        "productos": info,
    })
})

tienda.get("/audio", async(req, res) => {

    let info= "";
    let url = "http://localhost:5000/api/product"
    await fetch(url, {method:"GET"})
    .then(res=>res.json())
    .then(data=>{
        info = data
    })

    res.render("tienda.ejs", {
        "title": "Audio",
        "menu": 4,
        "productos": info,
    })
       
})

tienda.get("/teclado", async(req, res) => {

    let info= "";
    let url = "http://localhost:5000/api/product"
    await fetch(url, {method:"GET"})
    .then(res=>res.json())
    .then(data=>{
        info = data
    })

    res.render("tienda.ejs", {
        "title": "Teclados",
        "menu": 5,
        "productos": info,
    })
       
})

tienda.get("/mouse", async(req, res) => {

    let info= "";
    let url = "http://localhost:5000/api/product"
    await fetch(url, {method:"GET"})
    .then(res=>res.json())
    .then(data=>{
        info = data
    })

    res.render("tienda.ejs", {
        "title": "Mouses",
        "menu": 6,
        "productos": info,
    })
       
})

tienda.get("/antenas", async (req, res) => {

    let info= "";
    let url = "http://localhost:5000/api/product"
    await fetch(url, {method:"GET"})
    .then(res=>res.json())
    .then(data=>{
        info = data
    })

    res.render("tienda.ejs", {
        "title": "Antenas",
        "menu": 7,
        "productos": info,
    })
       
})

tienda.get("/procesadores", async(req, res) => {

    let info= "";
    let url = "http://localhost:5000/api/product"
    await fetch(url, {method:"GET"})
    .then(res=>res.json())
    .then(data=>{
        info = data
    })

    res.render("tienda.ejs", {
        "title": "Procesadores",
        "menu": 8,
        "productos": info,
    })
       
})





export default tienda;