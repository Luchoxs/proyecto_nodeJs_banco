var config = require('./configuration');
const sql = require('mssql');
const docen = require('./docente')

// imprimir docentes

async function getDocentes() {
    try {
      let pool = await sql.connect(config);
      let products = await pool
        .request()
        .query(
          "SELECT ID,CODIGO,NOMBRE,CODIGOASIGNATURA FROM DOCENTES order by ID"
        );
      return products.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  ///buscar por id doc

async function buscarPorId(ID) {
    try {
      let pool = await sql.connect(config);
      let espera = await pool
        .request()
        .input("ID", sql.Int, ID)
  
        .query("SELECT * FROM DOCENTES WHERE ID = @ID");
      return espera.recordset;
    } catch (error) {
      console.log(error);
    }
  }
// insertar
  async function post(docen) {
    try {
      let pool = await sql.connect(config);
  
      let insertar_doc = await pool
        .request()
        .input("CODIGO", sql.NVarChar, docen.CODIGO)
        .input("NOMBRE", sql.NVarChar, docen.NOMBRE)
        .input("APELLIDOS",sql.NVarChar,docen.APELLIDOS)
        .input("CODIGOASIGNATURA", sql.NVarChar, docen.CODIGOASIGNATURA)
        .query(
          "INSERT INTO DOCENTES (CODIGO, NOMBRE,APELLIDOS, CODIGOASIGNATURA) VALUES(@CODIGO,@NOMBRE,@APELLIDOS,@CODIGOASIGNATURA)"
        );
      return insertar_doc.recordset;
    } catch (error) {
      console.log(error);
    }
  }
  /// actualizar docente
async function putDocente(docen, ID) {
    try {
      let pool = await sql.connect(config);
  
      let act_docente = await pool
        .request()
        .input("ID", sql.Int, docen.ID)
        .input("CODIGO", sql.NVarChar, docen.CODIGO)
        .input("NOMBRE", sql.NVarChar, docen.NOMBRE)
        .input("APELLIDOS",sql.NVarChar,docen.APELLIDOS)
        .input("CODIGOASIGNATURA", sql.NVarChar, docen.CODIGOASIGNATURA)
        .query(
          "UPDATE DOCENTES SET CODIGO = @CODIGO, NOMBRE = @NOMBRE,APELLIDOS = @APELLIDOS, CODIGOASIGNATURA = @CODIGOASIGNATURA WHERE ID = @ID"
        );
      //.execute();
      return act_docente.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  //eliminar
  async function deleteXId(docen, id) {
    try {
      let pool = await sql.connect(config);
  
      let deleteProducts = await pool
        .request()
        .input("ID", sql.Int, docen.ID)
  
        .query("DELETE DOCENTES WHERE ID = @ID");
  
      return deleteProducts.recordset;
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports = {
    getDocentes: getDocentes,
     buscarPorId: buscarPorId,
     post: post,
     putDocente: putDocente,
     deleteXId: deleteXId,
   }