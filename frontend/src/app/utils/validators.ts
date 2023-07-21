export const REGEX_FORM = {
  isNumber: /^\d+$/,
  isValidYear: /^2\d{3}$/,
  isValidText: /^[a-zA-Z0-9áéíóúñÁÉÍÓÚ\,\_\-]+( [a-zA-Z0-9áéíóúñÁÉÍÓÚ\,\_\-]+)*$/,
  isValidNumber: /^[1-9]\d*$/,
  isValidAge: /^(2[0-9]|[3-9][0-9])$/,
  isValidDNI: /^\d{10}$/,
  isValidTelephone: /^0[0-9]{9}$/,
  isValidNAME: /^[a-zA-ZáéíóúñÁÉÍÓÚ]+( [a-zA-ZáéíóúñÁÉÍÓÚ]+)*$/,
  isValidLASTNAME: /^[a-zA-ZáéíóúñÁÉÍÓÚ]+( [a-zA-ZáéíóúñÁÉÍÓÚ]+)*$/,
  isDecimal: /^([0-9]|10|[1-9](\.[0-9]{0,2})?|10(\.0{0,2})?|10\.0|0(\.0{0,2})?|0\.[0-9]{1,2})$/,
  isWeightValid: /^(0*[1-9]\d*(\.\d+)?|0+\.\d*[1-9]\d*)$/,
  isValidProvincia: /^(Azuay|Bolívar|Cañar|Carchi|Chimborazo|Cotopaxi|El Oro|Esmeraldas|Galápagos|Guayas|Imbabura|Loja|Los Ríos|Manabí|Morona Santiago|Napo|Orellana|Pastaza|Pichincha|Santa Elena|Santo Domingo de los Tsáchilas|Sucumbíos|Tungurahua|Zamora-Chinchipe)$/,
  isValidEmail : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}
