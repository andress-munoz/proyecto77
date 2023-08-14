import app from "./app/app.js";


app.listen(app.get("port"), ()=>{
    console.log(`Estas conectado al endpoint http:/localhost:${app.get("port")}`);
})