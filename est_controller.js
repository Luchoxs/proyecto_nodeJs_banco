var config = require('./configuration');
const sql = require('mssql');
const estu = require('./estudiantes')

async function getEstudiantes() {
    try {
      let pool = await sql.connect(config);
      let products = await pool
        .request()
        .query(
          "SELECT ID,CODIGO,NOMBRE,SEMESTRE,CARRERA,CODASIGNATURA FROM ESTUDIANTES order by ID"
        );
      return products.recordset;
    } catch (error) {
      console.log(error);
    }
  }
  async function buscarPorId(ID) {
    try {
      let pool = await sql.connect(config);
      let espera = await pool
        .request()
        .input("ID", sql.Int, ID)
  
        .query("SELECT * FROM ESTUDIANTES WHERE ID = @ID");
      return espera.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  async function post(estu) {
    try {
      let pool = await sql.connect(config);
  
      let insertar_est = await pool
        .request()
        .input("CODIGO", sql.NVarChar, estu.CODIGO)
        .input("NOMBRE", sql.NVarChar, estu.NOMBRE)
        .input("APELLIDOS",sql.NVarChar,estu.APELLIDOS)
        .input("SEMESTRE",sql.NVarChar,estu.SEMESTRE)
        .input("CARRERA",sql.NVarChar,estu.CARRERA)
        .input("CODASIGNATURA",sql.NVarChar,estu.CODASIGNATURA)
        .query(
          "INSERT INTO ESTUDIANTES (CODIGO, NOMBRE,APELLIDOS,SEMESTRE,CARRERA,CODASIGNATURA) VALUES(@CODIGO,@NOMBRE,@APELLIDOS,@SEMESTRE,@CARRERA,@CODASIGNATURA)"
        );
      return insertar_est.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  async function putEstudiante(estu, ID) {
    try {
      let pool = await sql.connect(config);
  
      let act_estudiante = await pool
        .request()
        .input("ID", sql.Int, estu.ID)
        .input("CODIGO", sql.NVarChar, estu.CODIGO)
        .input("NOMBRE", sql.NVarChar, estu.NOMBRE)
        .input("APELLIDOS",sql.NVarChar,estu.APELLIDOS)
        .input("SEMESTRE",sql.NVarChar,estu.SEMESTRE)
        .input("CARRERA",sql.NVarChar,estu.CARRERA)
        .input("CODASIGNATURA",sql.NVarChar,estu.CODASIGNATURA)
        .query(
          "UPDATE ESTUDIANTES SET CODIGO = @CODIGO, NOMBRE = @NOMBRE,APELLIDOS = @APELLIDOS,SEMESTRE = @SEMESTRE,CARRERA = @CARRERA, CODASIGNATURA = @CODASIGNATURA WHERE ID = @ID"
        );
      //.execute();
      return act_estudiante.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteXId(estu, id) {
    try {
      let pool = await sql.connect(config);
  
      let deleteEstudiantes = await pool
        .request()
        .input("ID", sql.Int, estu.ID)
  
        .query("DELETE ESTUDIANTES WHERE ID = @ID");
  
      return deleteEstudiantes.recordset;
    } catch (error) {
      console.log(error);
    }
  }
  module.exports = {
    getEstudiantes: getEstudiantes,
     buscarPorId: buscarPorId,
     post: post,
     putEstudiante: putEstudiante,
     deleteXId: deleteXId,
   }