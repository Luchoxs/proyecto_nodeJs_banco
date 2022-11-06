var config = require('./configuration');
const sql = require('mssql');
const racademico = require('./R_academico')

async function getRegistro() {
    try {
      let pool = await sql.connect(config);
      let products = await pool
        .request()
        .query(
          "SELECT ID,CODIGO,FECHA,PERIODO,COESTUDIANTE,CODOCENTE,NOTA1,NOTA2,PROMEDIO FROM RECORD_ACADEMICO order by ID"
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
  
        .query("SELECT * FROM RECORD_ACADEMICO WHERE ID = @ID");
      return espera.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  async function post(racademico) {
    try {
      let pool = await sql.connect(config);
  
      let insertar_est = await pool
        .request()
        .input("CODIGO", sql.NVarChar, racademico.CODIGO)
        .input("FECHA", sql.Date, racademico.FECHA)
        .input("PERIODO",sql.NVarChar,racademico.PERIODO)
        .input("COESTUDIANTE",sql.NVarChar,racademico.COESTUDIANTE)
        .input("CODOCENTE",sql.NVarChar,racademico.CODOCENTE)
        .input("NOTA1", sql.Decimal, racademico.NOTA1)
        .input("NOTA2", sql.Decimal, racademico.NOTA2)
        .query(
            "INSERT INTO RECORD_ACADEMICO (CODIGO,FECHA,PERIODO,COESTUDIANTE,CODOCENTE,NOTA1,NOTA2) VALUES(@CODIGO,@FECHA,@PERIODO,@COESTUDIANTE,@CODOCENTE,@NOTA1,@NOTA2)"
          );
      return insertar_est.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  async function putRacademico(racademico, ID) {
    try {
      let pool = await sql.connect(config);
  
      let act_racademico = await pool
        .request()
        .input("ID",sql.Int,racademico.ID)

        .input("CODIGO", sql.NVarChar, racademico.CODIGO)
        .input("FECHA", sql.Date, racademico.FECHA)
        .input("PERIODO", sql.NVarChar, racademico.PERIODO)
        .input("COESTUDIANTE", sql.NVarChar, racademico.COESTUDIANTE)
        .input("CODOCENTE", sql.NVarChar, racademico.CODOCENTE)
        .input("NOTA1", sql.Decimal(3,2), racademico.NOTA1)
        .input("NOTA2", sql.Decimal(3,2), racademico.NOTA2)
        .query(
          "UPDATE RECORD_ACADEMICO SET CODIGO = @CODIGO, FECHA = @FECHA,PERIODO = @PERIODO,COESTUDIANTE = @COESTUDIANTE,CODOCENTE = @CODOCENTE,NOTA1 = @NOTA1,NOTA2 = @NOTA2 WHERE ID = @ID"
        );
  
      return act_racademico.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteXId(racademico, id) {
    try {
      let pool = await sql.connect(config);
  
      let deleteRegistro = await pool
        .request()
        .input("ID", sql.Int, racademico.ID)
  
        .query("DELETE RECORD_ACADEMICO WHERE ID = @ID");
  
      return deleteRegistro.recordset;
    } catch (error) {
      console.log(error);
    }
  }
  module.exports = {
    getRegistro: getRegistro,
     buscarPorId: buscarPorId,
     post: post,
     putRacademico: putRacademico,
     deleteXId: deleteXId,
   }