import { Router } from "express";
import jwt from "jsonwebtoken";
import "node-fetch";
import Swal from "sweetalert2";


const dash = Router();

dash.get("/", (req, res) => {
    if (req.cookies.ckeon) {
        try {
            const token = jwt.verify(
                req.cookies.ckeon, 
                process.env.TOKEN_SECRET
                )
                res.render("dashboard.ejs", {
                    "nombre": token.nombre,
                    "correo": token.correo,
                    "foto": token.foto,
                    "title": "Inicio",
                    "men": 1
                })
        } catch (error) {
            res.redirect("/")
        }


    } else {
        res.redirect("/")
    }
    
})

// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS// PRODUCTOS

dash.get("/products",async(req, res) =>{
    if (req.cookies.ckeon) {
        try {
            const token = jwt.verify(
                req.cookies.ckeon, 
                process.env.TOKEN_SECRET
                )
                let info= "";
                let url = "http://localhost:5000/api/product"
                await fetch(url, {method:"GET"})
                .then(res=>res.json())
                .then(data=>{
                    info = data
                })
                if(!req.cookies.mTipo){
                res.render("dashboard.ejs", {
                    "nombre": token.nombre,
                    "correo": token.correo,
                    "foto": token.foto,
                    "title": "Productos",
                    "productos": info,
                    "men": 2,
                    "mTipo": ""
                })
                } else {
                    let mTipo = req.cookies.mTipo;
                    res.clearCookie("mTipo");
                    res.render("dashboard.ejs",{
                        "nombre": token.nombre,
                        "correo": token.correo,
                        "foto": token.foto,
                        "title": "Productos",
                        "productos": info,
                        "men": 2,
                        "mTipo": mTipo
                    })
                }
        } catch (error) {
            res.redirect("/")
        }


    } else {
        res.redirect("/")
    }
})





dash.post("/save-product", (req, res)=>{
    // res.json(req.body);
    if(req.body.descripcion){

        if(req.body.precio > 0){
            const producto = req.body.producto;
            const imagen = req.body.imagen;
            const descripcion = req.body.descripcion;
            const precio = req.body.precio;
            let estado = req.body.estado

            if ( typeof(estado) == "string" || typeof(estado)=="undefined"){
                estado = req.body.estado =="on"? 1 : 0;
            };

                let datos = {
                "producto": producto,
                "imagen": imagen,
                "descripcion": descripcion,
                "precio": precio,
                "estado": estado                                                 
            }

            let ruta = "http://localhost:5000/api/product"
            let metodo = "post"

            if (req.body.id){
                ruta="http://localhost:5000/api/product";
                metodo="PUT"

                datos = {
                    "id": req.body.id,
                    "producto": producto,
                    "imagen": imagen,
                    "descripcion": descripcion,
                    "precio": precio,
                    "estado": estado                                                
                }
            }

            const respo = fetch(ruta, {
                "method": metodo,
                "body": JSON.stringify(datos),
                "headers":{
                    "Content-type":"application/json; charset=UTF-8"
                }
            })
            .then(resp => resp.json())
            .then(data => {
            })
            .catch(err=>console.error(err))

            res.redirect("/v1/products")
            // location.reload()
        }
    }
})

dash.get("/edit-product", async (req, res)=>{
    if (req.cookies.ckeon) {
        try {
            const id = req.query.id;
            const token = jwt.verify(
                req.cookies.ckeon, 
                process.env.TOKEN_SECRET
                )
                let info= "";
                let url = "http://localhost:5000/api/product/"+id
                await fetch(url, {method:"GET"})
                .then(res=>res.json())
                .then(data=>{
                    info = data
                })
                if(!req.cookies.mTipo){
                res.render("dashboard.ejs", {
                    "nombre": token.nombre,
                    "correo": token.correo,
                    "foto": token.foto,
                    "title": "Modificar Productos",
                    "productos": info,
                    "men": 4,
                    "mTipo": ""
                })
                } else {
                    let mTipo = req.cookies.mTipo;
                    res.clearCookie("mTipo");
                    res.render("dashboard.ejs",{
                        "nombre": token.nombre,
                        "correo": token.correo,
                        "foto": token.foto,
                        "title": "Modificar Productos",
                        "productos": info,
                        "men": 4,
                        "mTipo": mTipo
                    })
                }
        } catch (error) {
            res.redirect("/")
        }


    } else {
        res.redirect("/")
    }
})

dash.get("/delete-product", async (req, res)=>{
    if (req.cookies.ckeon) {
        try {
            const id = req.query.id;
            const token = jwt.verify(
                req.cookies.ckeon, 
                process.env.TOKEN_SECRET
                )
                let mensa= "";
                let url = "http://localhost:5000/api/product/"+id
                await fetch(url, {method:"DELETE"})
                .then(resp=>resp.json())
                .then(data=>{
                    mensa = data
                res.redirect("products")
                })

                let info= "";
                url = "http://localhost:5000/api/product/"+id
                await fetch(url, {method:"GET"})
                .then(resp=>resp.json())
                .then(data=>{
                    info = data
                })

                if(!req.cookies.mTipo){
                res.render("dashboard.ejs", {
                    "nombre": token.nombre,
                    "correo": token.correo,
                    "foto": token.foto,
                    "title": "Mostrar Productos",
                    "productos": info,
                    "men": 2,
                    "mTipo": ""
                })
                } else {
                    let mTipo = req.cookies.mTipo;
                    res.clearCookie("mTipo");
                    res.render("dashboard.ejs",{
                        "nombre": token.nombre,
                        "correo": token.correo,
                        "foto": token.foto,
                        "title": "Mostrar Productos",
                        "productos": info,
                        "men": 2,
                        "mTipo": mTipo
                    })
                }
        } catch (error) {
            res.redirect("/")
        }


    } else {
        res.redirect("/")
    }
})


// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS// USUARIOS

dash.get("/users", async(req, res) =>{
    if (req.cookies.ckeon) {
        try {
            const token = jwt.verify(
                req.cookies.ckeon, 
                process.env.TOKEN_SECRET
                ) 
            let info= "";
            let url = "http://localhost:5000/api/user"
            await fetch(url, {method:"GET"})
            .then(res=>res.json())
            .then(data=>{
                info = data
            })
            res.render("dashboard.ejs", {
                "nombre": token.nombre,
                "correo": token.correo,
                "foto": token.foto,  
                "title": "Usuarios",
                "users": info,
                "men": 3  
            })  
        } catch (error) {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }
})

// dash.post("/save-user", (req, res)=>{
//     // res.json(req.body);
//     if(req.body.descripcion){

//         if(req.body.precio > 0){
//             const producto = req.body.producto;
//             const imagen = req.body.imagen;
//             const descripcion = req.body.descripcion;
//             const precio = req.body.precio;
//             let estado = req.body.estado

//             if ( typeof(estado) == "string" || typeof(estado)=="undefined"){
//                 estado = req.body.estado =="on"? 1 : 0;
//             };

//                 let datos = {
//                 "producto": producto,
//                 "imagen": imagen,
//                 "descripcion": descripcion,
//                 "precio": precio,
//                 "estado": estado                                                 
//             }

//             let ruta = "http://localhost:5000/api/user"
//             let metodo = "post"

//             if (req.body.id){
//                 ruta="http://localhost:5000/api/user";
//                 metodo="PUT"

//                 datos = {
//                     "id": req.body.id,
//                     "producto": producto,
//                     "imagen": imagen,
//                     "descripcion": descripcion,
//                     "precio": precio,
//                     "estado": estado                                                
//                 }
//             }

//             const respo = fetch(ruta, {
//                 "method": metodo,
//                 "body": JSON.stringify(datos),
//                 "headers":{
//                     "Content-type":"application/json; charset=UTF-8"
//                 }
//             })
//             .then(resp => resp.json())
//             .then(data => {
//             })
//             .catch(err=>console.error(err))

//             res.redirect("/v1/products")
//             // location.reload()
//         }
//     }
// })

// dash.get("/edit-user", async (req, res)=>{
//     if (req.cookies.ckeon) {
//         try {
//             const id = req.query.id;
//             const token = jwt.verify(
//                 req.cookies.ckeon, 
//                 process.env.TOKEN_SECRET
//                 )
//                 let info= "";
//                 let url = "http://localhost:5000/api/user/"+id
//                 await fetch(url, {method:"GET"})
//                 .then(res=>res.json())
//                 .then(data=>{
//                     info = data
//                 })
//                 if(!req.cookies.mTipou){
//                 res.render("dashboard.ejs", {
//                     "nombre": token.nombre,
//                     "correo": token.correo,
//                     "foto": token.foto,
//                     "title": "Modificar Productos",
//                     "productos": info,
//                     "men": 4,
//                     "mTipou": ""
//                 })
//                 } else {
//                     let mTipou = req.cookies.mTipou;
//                     res.clearCookie("mTipo");
//                     res.render("dashboard.ejs",{
//                         "nombre": token.nombre,
//                         "correo": token.correo,
//                         "foto": token.foto,
//                         "title": "Modificar Productos",
//                         "productos": info,
//                         "men": 4,
//                         "mTipou": mTipou
//                     })
//                 }
//         } catch (error) {
//             res.redirect("/")
//         }


//     } else {
//         res.redirect("/")
//     }
// })

// dash.get("/delete-user", async (req, res)=>{
//     if (req.cookies.ckeon) {
//         try {
//             const id = req.query.id;
//             const token = jwt.verify(
//                 req.cookies.ckeon, 
//                 process.env.TOKEN_SECRET
//                 )
//                 let mensa= "";
//                 let url = "http://localhost:5000/api/user/"+id
//                 await fetch(url, {method:"DELETE"})
//                 .then(resp=>resp.json())
//                 .then(data=>{
//                     mensa = data
//                 res.redirect("products")
//                 })

//                 let info= "";
//                 url = "http://localhost:5000/api/user/"+id
//                 await fetch(url, {method:"GET"})
//                 .then(resp=>resp.json())
//                 .then(data=>{
//                     info = data
//                 })

//                 if(!req.cookies.mTipou){
//                 res.render("dashboard.ejs", {
//                     "nombre": token.nombre,
//                     "correo": token.correo,
//                     "foto": token.foto,
//                     "title": "Mostrar Productos",
//                     "productos": info,
//                     "men": 2,
//                     "mTipo": ""
//                 })
//                 } else {
//                     let mTipou = req.cookies.mTipou;
//                     res.clearCookie("mTipo");
//                     res.render("dashboard.ejs",{
//                         "nombre": token.nombre,
//                         "correo": token.correo,
//                         "foto": token.foto,
//                         "title": "Mostrar Productos",
//                         "productos": info,
//                         "men": 3,
//                         "mTipou": mTipou
//                     })
//                 }
//         } catch (error) {
//             res.redirect("/")
//         }


//     } else {
//         res.redirect("/")
//     }
// })


dash.get("/salir", (req, res)=>{
    res.clearCookie("ckeon")
    res.redirect("/")
})

export default dash;