import { conectar } from "../model/db_conection.js";

var crud_students = {};

crud_students.leer = (req, res) => {
    let estudiantesData, sangreData;

    conectar.query('SELECT e.id_estudiante, e.carne, e.nombres, e.apellidos, e.direccion, e.telefono, e.correo_electronico, DATE_FORMAT(e.fecha_nacimiento,"%Y-%m-%d") as fecha_nacimiento, s.id_tipo_sangre, s.sangre FROM estudiantes as e INNER JOIN tipos_sangre as s ON e.id_tipo_sangre = s.id_tipo_sangre;', (error, estudiantesResults) => {
        if (error) {
            throw error;
        } else {
            estudiantesData = estudiantesResults;

            conectar.query('SELECT id_tipo_sangre, sangre FROM tipos_sangre;', (error, sangreResults) => {
                if (error) {
                    throw error;
                } else {
                    sangreData = sangreResults;

                    res.render('students/index', { resultado: estudiantesData, resultadoSangre: sangreData });
                }
            });
        }
    });
};

crud_students.cud = (req,res)=>{
    const btn_agregar = req.body.btn_agregar;
    const btn_modificar = req.body.btn_modificar;
    const btn_eliminar = req.body.btn_eliminar;
    if (btn_agregar){
        const carne = req.body.txt_carne;
        const nombres = req.body.txt_nombres;
        const apellidos = req.body.txt_apellidos;
        const direccion = req.body.txt_direccion;
        const telefono = req.body.txt_telefono;
        const email = req.body.txt_email;
        const fecha_nacimiento = req.body.txt_fn;
        const tipo_sangre = req.body.txt_tipo_sangre;
        conectar.query('insert into estudiantes SET ?',{carne:carne,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,correo_electronico:email,fecha_nacimiento:fecha_nacimiento,id_tipo_sangre:tipo_sangre}, (error, results)=>{
            if(error){
                console.log(error);
            }else{
                //console.log(results);   
                res.redirect('/');         
            }
        });
       
    }
    if (btn_modificar){
        const id = req.body.txt_id2;
        const carne = req.body.txt_carne2;
        const nombres = req.body.txt_nombres2;
        const apellidos = req.body.txt_apellidos2;
        const direccion = req.body.txt_direccion2;
        const telefono = req.body.txt_telefono2;
        const email = req.body.txt_email2;
        const fecha_nacimiento = req.body.txt_fn2;
        const tipo_sangre = req.body.txt_tipo_sangre2;
        conectar.query('update estudiantes SET ? where id_estudiante = ?',[{carne:carne,nombres:nombres, apellidos:apellidos,direccion:direccion,telefono:telefono,fecha_nacimiento:fecha_nacimiento,correo_electronico:email, id_tipo_sangre:tipo_sangre},id], (error, results)=>{
            if(error){
                console.log(error);
            }else{   
                res.redirect('/');         
            }
        });
       
    }
    if (btn_eliminar){
        const id = req.body.txt_id2;
            conectar.query('delete from estudiantes  where id_estudiante = ?',[id], (error, results)=>{
                if(error){
                    console.log(error);
                }else{   
                    res.redirect('/');         
                }
            });     
    }
};

export {crud_students}