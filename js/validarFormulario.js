const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const email = document.querySelector('#email');
const password = document.querySelector('#password')
const fechaNacimiento = document.querySelector('#fechaNacimiento');
const pais = document.querySelector('#pais');
const terminos = document.querySelector('#terminos')
const infoLabel = document.querySelector('#issue');


const validarCampos = () => {
    const errores = [];
    if(nombre.value === "") {
        errores.push("Campo NOMBRE debe ser completado")
    }
    if(apellido.value === ""){
        errores.push("Campo APELLIDO debe ser completado")
    }
    if(email.value === ""){
        errores.push("Campo EMAIL debe ser completado")
    }
    if(password.value === "") {
        errores.push("Campo CONTRASEÑA debe ser completado")
    }
    if(fechaNacimiento.value === ""){
        errores.push("Campo FECHA DE NACIMIENTO debe ser completado")
    }
   
    if(pais.value === ""){
        errores.push("Campo PAIS debe ser seleccionado")
    }
    if(terminos.checked === false){
        errores.push("Debe ACEPTAR los Términos y Condiciones")
    }
    return errores;
}
