class racademico {
    constructor(
      ID,
      CODIGO,
      NOMBRE,
      FECHA,
      PERIODO,
      COESTUDIANTE,
      CODOCENTE,
      NOTA1,
      NOTA2,
      PROMEDIO
    ) {
      this.ID = ID;
      (this.CODIGO = CODIGO),
        (this.NOMBRE = NOMBRE),
        (this.FECHA = FECHA),
        (this.PERIODO = PERIODO),
        (this.COESTUDIANTE = COESTUDIANTE),
        (this.CODOCENTE = CODOCENTE),
        (this.NOTA1 = NOTA1),
        (this.NOTA2 = NOTA2),
        (this.PROMEDIO = PROMEDIO);
    }
  }
  
  module.exports = racademico;