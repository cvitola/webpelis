//Cuando carga el documento
document.body.onload = () => {
    const users = listarUsuarios();
}

const enviarDatos = async (event) => {
    event.preventDefault();
    infoLabel.innerHTML = ''
    errores = validarCampos();
    if(errores.length > 0){
        for(er in errores){
            infoLabel.innerHTML += `<li>${errores[er]}</li>`
        }        
    }else{
        let res = await sendUser(nombre.value,apellido.value,email.value,password.value,fechaNacimiento.value,pais.options[pais.selectedIndex].text,terminos.checked);
        infoLabel.innerHTML = `<li style="color: white">${res}</li>`
        
    }
}

const sendUser = async (nombre,apellido,email,password,fechaNacimiento,pais,terminos) => {
    const data ={nombre,apellido,email,password,fechaNacimiento,pais,terminos};
    console.log(data)
    const baseURL = 'http://localhost:8080/addUser';
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:  JSON.stringify(data)
        });
        if (!response.ok) {
            return (`HTTP error! Status: ${response.status}`);
        } else{
            return "Información enviada";
        }
        
        
        
    } catch (error) {
        console.log(error)
    }

}


const listarUsuarios = async() => {
    const baseURL = 'http://localhost:8080/getUsers';
    try {
        const response = await fetch(baseURL);
        const dataUsers = await response.json();
        mostrarUsers(dataUsers)
    } catch (error) {
        console.log(error)
    }
}

const mostrarUsers = (users) => {
    console.log(users)
    const divUSers = document.querySelector('.usuarios__lista');
    const user = {
        nombre: "Nombre",
        apellido: "Apellido",
        email: "Email",
        password: "Password",
        pais: "Pais",
        fechaNacimiento: "Nacimiento",
        terminos: "Terminos"
    }
    users.unshift(user);
    divUSers.innerHTML = users?.map((user,index) => {
        return `<div class="usuario__tarjeta">
                    ${index === 0 ? `<label style='font-weight: bold; font-size:14px;'>${user.nombre}</label>`:`<label>${user.nombre}</label>`}
                    ${index === 0 ? `<label style='font-weight: bold; font-size:14px;'>${user.apellido}</label>`:`<label>${user.apellido}</label>`}
                    ${index === 0 ? `<label style='font-weight: bold; font-size:14px;'>${user.email}</label>`:`<label style='color: blue; text-decoration: underline; cursor: pointer;'><span onClick='editarUser(${JSON.stringify(user)})'>${user.email}</span></label>`}
                    ${index === 0 ? `<label style='font-weight: bold; font-size:14px;'>${user.password}</label>`:`<label>${user.password}</label>`}
                    ${index === 0 ? `<label style='font-weight: bold; font-size:14px;'>${user.pais}</label>`:`<label>${user.pais}</label>`}
                    ${index === 0 ? `<label style='font-weight: bold; font-size:14px;'>${user.fechaNacimiento}</label>`:`<label>${user.fechaNacimiento}</label>`}
                    ${index === 0 ? `<label style='font-weight: bold; font-size:14px;'>${user.terminos}</label>`:`<label>${user.terminos}</label>`}
                </div>`;
    }).join('');
    
}

const editarUser = (user) => {
    const divEditUser = document.querySelector('.usuarios__edicion');
    divEditUser.style.display = 'flex'; //para que se vea
    divEditUser.style.zIndex = 1; 
    divEditUser.innerHTML = `
        <h5>Datos del Usuario</h5>
        <label>Nombre</label>
        <input value=${user.nombre} id='nombre' name='nombre' />
        <label>Apellido</label>
        <input value=${user.apellido} id='apellido' name='apellido' />
        <label>Email</label>
        <input value=${user.email} id='email' name='email'/>
        <label>Password</label>
        <input value=${user.password} id='password' name='password'/>
        <label>Pais</label>
        <input value=${user.pais} id='pais' name='pais'/>
        <label>Fecha Nacimiento</label>
        <input value=${user.fechaNacimiento} id='fechaNacimiento' name='fechaNacimiento'/>
        <label>Terminos</label>
        <input value=${user.terminos} id='terminos' name='terminos'/>
        <div class='usuarios__edicion__botonera'>
            <h5>Acciones</h5>
            <div>
                <button title='Eliminar' onClick='eliminarUser()'>⛔</button>
                <button title='Actualizar' onClick='updateUser()'>📄</button>
                <button title='Cerrar' onClick='cerrarUser()'>🔙</button>
            </div>
            <p id="issue"></p>

        </div>
        
        `
    
}

const cerrarUser = () => {
    const divEditUser = document.querySelector('.usuarios__edicion');
    divEditUser.style.display= 'none';
}

const updateUser = async() => {
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value;
    const pais = document.querySelector('#pais').value;
    const terminos = document.querySelector('#terminos').value;
    const infoLabel = document.querySelector('#issue');

    const userUpdated = {
        nombre,
        apellido,
        email,
        password,
        fechaNacimiento,
        pais,
        terminos
    }

    const baseURL = 'http://localhost:8080/updateUser';
    try {
        const response = await fetch(baseURL, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body:  JSON.stringify(userUpdated)
        })
        if (!response.ok) {
            infoLabel.innerHTML = `HTTP error! Status: ${response.status}`;
            setTimeout(() => {
                window.location.reload();
              }, 4000);
        } else{
            infoLabel.innerHTML= "Actualizando Usuario ...";
            setTimeout(() => {
                window.location.reload();
              }, 4000);
        }
    }
     catch (error) {
        console.log(error)
        }
}


const eliminarUser = async () => {
    const infoLabel = document.querySelector('#issue');
    const email = document.querySelector('#email').value;
    const baseURL = 'http://localhost:8080/deleteUser';
    try {
        const response = await fetch(`${baseURL}?email=${email}`, {
            method: 'DELETE'
        });
        console.log(response)
        if (!response.ok) {
            infoLabel.innerHTML = `HTTP error! Status: ${response.status}`;
            setTimeout(() => {
                window.location.reload();
              }, 4000);
        } else{
            infoLabel.innerHTML =  "Eliminando Usuario ...";
            setTimeout(() => {
                window.location.reload();
              }, 4000);
        }
    } catch (error) {
        console.log(error)
    }
}