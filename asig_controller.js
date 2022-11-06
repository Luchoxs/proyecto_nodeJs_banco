var config = require('./configuration');
const sql = require('mssql');
const Asig = require('./asignatura')

async function getAsig(){
    try{
        let pool =await sql.connect(config);
        let products = await pool.request()
        .query('SELECT ID,CODIGO,NOMBRE,CREDITOS FROM ASIGNATURA order by ID');
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function buscarPorId(ID) {
    try {
      let pool = await sql.connect(config);
      let espera = await pool
        .request()
        .input("ID", sql.Int, ID)
  
        //   .execute("SP_MostrarOrdenesXId");
        .query("SELECT * FROM ASIGNATURA WHERE ID = @ID");
      return espera.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  async function post(Asig) {
    try {
        let pool = await sql.connect(config);
        
        let insertar_asig = await pool.request()
       .input('CODIGO', sql.NVarChar,Asig.CODIGO)
        .input('NOMBRE', sql.NVarChar, Asig.NOMBRE)
        .input('CREDITOS', sql.TinyInt,Asig.CREDITOS)
        //.execute('sp_Insertar');
        .query("INSERT INTO ASIGNATURA (CODIGO, NOMBRE, CREDITOS) VALUES(@CODIGO,@NOMBRE,@CREDITOS)")
         return insertar_asig.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function putAsignatura(Asig,ID) {
    try {
        let pool = await sql.connect(config);
        
        let act_asignatura = await pool.request()
        .input('ID', sql.Int,Asig.ID)
       .input('CODIGO', sql.NVarChar,Asig.CODIGO)
        .input('NOMBRE', sql.NVarChar, Asig.NOMBRE)
        .input('CREDITOS', sql.TinyInt,Asig.CREDITOS)
         .query("UPDATE ASIGNATURA SET CODIGO = @CODIGO, NOMBRE = @NOMBRE, CREDITOS = @CREDITOS WHERE ID = @ID")
         //.execute();
         return act_asignatura.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteXId(Asig,id) {
    try {
        let pool = await sql.connect(config);
        
        let deleteProducts = await pool.request()
        .input('ID', sql.Int,Asig.ID)
       
        //.execute('SP_ELIMINAR')
         .query("DELETE ASIGNATURA WHERE ID = @ID")
         
         return deleteProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAsig: getAsig,
     buscarPorId: buscarPorId,
     post: post,
     putAsignatura: putAsignatura,
     deleteXId: deleteXId,
   }