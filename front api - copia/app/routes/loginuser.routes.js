import { Router } from "express";
import bcrypt from 'bcryptjs';
import session from 'express-session';
import mysql from 'mysql';

const loginUser = Router();

loginUser.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

const connection = mysql.createConnection({
    //Con variables de entorno
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
});

connection.connect((error)=>{
    if (error) {
      console.error('El error de conexión es: ' + error);
      return;
    }
    console.log('¡Conectado a la Base de Datos!');
  });


//9 - establecemos las rutas
loginUser.get('/login',(req, res)=>{
    res.render('login');
})

loginUser.get('/register',(req, res)=>{
    res.render('register');
})




//10 - Método para la REGISTRACIÓN
loginUser.post('/register', async (req, res)=>{
const user = req.body.user;
const name = req.body.name;
const rol = req.body.rol;
const pass = req.body.pass;
let passwordHash = await bcrypt.hash(pass, 8);
connection.query('INSERT INTO users SET ?',{user:user, name:name, rol:rol, pass:passwordHash}, async (error, results)=>{
    if(error){
        console.log(error);
    }else{            
        res.render('register', {
            alert: true,
            alertTitle: "Registration",
            alertMessage: "¡Successful Registration!",
            alertIcon:'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'loginUser/login'
        });
        //res.redirect('/');         
    }
});
})



//11 - Metodo para la autenticacion
loginUser.post('/lauth', async (req, res)=> {
const user = req.body.user;
const pass = req.body.pass;    
let passwordHash = await bcrypt.hash(pass, 8);
if (user && pass) {
    connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results, fields)=> {
        if( results.length == 0 || !(await bcrypt.compare(pass, results[0].pass)) ) {    
            res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "USUARIO y/o PASSWORD incorrectas",
                    alertIcon:'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'loginUser/login'    
                });
            
            //Mensaje simple y poco vistoso
            //res.send('Incorrect Username and/or Password!');				
        } else {         
            //creamos una var de session y le asignamos true si INICIO SESSION       
            req.session.loggedin = true;                
            req.session.name = results[0].name;
            res.render('login', {
                alert: true,
                alertTitle: "Conexión exitosa",
                alertMessage: "¡LOGIN CORRECTO!",
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'loginUser'
            });        			
        }			
        res.end();
    });
} else {	
    res.send('Please enter user and Password!');
    res.end();
}
});

//12 - Método para controlar que está auth en todas las páginas
loginUser.get('/', (req, res)=> {
if (req.session.loggedin) {
    res.render('menulogin',{
        login: true,
        name: req.session.name			
    });		
} else {
    res.render('menulogin',{
        login:false,
        name:'Debe iniciar sesión',			
    });				
}
res.end();
});


//función para limpiar la caché luego del logout
loginUser.use(function(req, res, next) {
if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
next();
});

//Logout
//Destruye la sesión.
loginUser.get('/logout', function (req, res) {
req.session.destroy(() => {
  res.redirect('/loginUser/login') // siempre se ejecutará después de que se destruya la sesión
})
});


export default loginUser;