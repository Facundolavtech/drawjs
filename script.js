const submit = document.getElementById('btnSubmit'),
    nombreParticipante = document.getElementById('name'),
    listaParticipantes = document.getElementById('listaParticipantes'),
    sortear = document.getElementById('sortear'),
    cuentaRegresiva = document.getElementById('cuentaRegresiva')
    ganadorTitle = document.getElementById('ganador'),
    counter = document.getElementById('counter'),
    numeroParticipantes = document.getElementById('cantidadParticipantes'),
    errorMsg = document.querySelector('.errorMsg')


let index = 1

let nParticipantes = 0

let arrParticipantes = []


//Funcion que Agrega participante
const agregarParticipante = (name) => {
    if(name.length > 13){
        mostrarError(errorMsg, 'El nombre debe tener menos de 13 caracteres')
        nombreParticipante.value = ''
        return
    }        

    if(name.length > 2){


        if(arrParticipantes.includes(name)){
            mostrarError(errorMsg, 'El participante ya existe')
            return
        } else{
            arrParticipantes.push(name)
        }
        


        const participante = document.createElement('li')
        participante.classList.add('participante')
        participante.innerHTML = `${index} - ${name}`

        const eliminarBtn = document.createElement('button')
        eliminarBtn.setAttribute('id', `${index}`)
        eliminarBtn.setAttribute('class', 'eliminarBtn')
        eliminarBtn.innerHTML = `Eliminar`
    
        participante.insertAdjacentElement('beforeend', eliminarBtn)
        
        listaParticipantes.appendChild(participante)

        nombreParticipante.value = ''
        index++
        nParticipantes++
        numeroParticipantes.textContent = `Participantes: ${nParticipantes}`


        //Elimina participante//
        eliminarBtn.addEventListener('click', (e) => {
            eliminarParticipante(e.target)
        })
    } 
    else {
        mostrarError(errorMsg, 'El nombre debe tener mas de 2 caracteres')
        nombreParticipante.value = ''
        return;
    }
}

//Funcion que elimina participante
const eliminarParticipante = (target) => {

    let eliminarRepetido = (target.parentElement.textContent.toString().replace('Eliminar', '').replace(`${target.id}`, '').replace('-', '').replace('  ', ''))

    function eliminar(array, elemento) {
        let resultado = []
        for (let i = 0; i < array.length; i++) {
          if (array[i] !== elemento) {
            resultado.push(array[i]);
          }
        }
        return resultado;
      }
      
      arrParticipantes = eliminar(arrParticipantes, eliminarRepetido);

    target.parentElement.remove()
    index--
    nParticipantes--
    numeroParticipantes.textContent = `Participantes: ${nParticipantes}`
}


//Boton agregar participante
submit.addEventListener('click', () => {
    agregarParticipante(nombreParticipante.value)
})

document.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter') {
        agregarParticipante(nombreParticipante.value)
    }
})





sortear.addEventListener('click', () => {

    if(listaParticipantes.childNodes.length > 1){

    //Iniciar cuenta regresiva
    countdown()
    const botonesEliminar = document.querySelectorAll('.eliminarBtn')
    botonesEliminar.forEach(e => e.disabled=true)
    ganadorTitle.textContent = ''
    sortear.disabled=true
    sortear.style.cursor=('initial')
    sortear.style.backgroundColor=('rgb(158, 157, 157)')

    //Resultado del sorteo
    setTimeout(() => {
        let ganador = Math.floor(Math.random() * listaParticipantes.childNodes.length)
        if(ganador === -1) ganador++
        ganadorTitle.textContent = `EL GANADOR ES: ${listaParticipantes.childNodes[ganador].textContent.replace('Eliminar', '')}`
        counter.classList.remove('counter')
        sortear.disabled=false
        sortear.style.cursor=('pointer')
        sortear.style.backgroundColor=('rgb(177, 69, 69)')
        sortear.textContent= "Volver a Sortear"
        botonesEliminar.forEach(e => e.disabled=false)
    }, 3000);
}
})


//Funcion que muestra errores
const mostrarError = (component, mensaje) => {
    component.textContent = (mensaje)
    component.classList.remove('errorHidden')
    const ocultarError = setTimeout(() => {
        component.classList.add('errorHidden')
    }, 2000);
}


//Funcion para cuenta regresiva
const countdown = () => {
    counter.classList.add('counter')
    let contador = 3
    cuentaRegresiva.textContent = `${contador}`
    let interval = setInterval(() => {
        contador--
        cuentaRegresiva.textContent = `${contador}`
        if(contador <= 0) {
            clearInterval(interval)
            cuentaRegresiva.textContent = ''
        } 
    }, 1000);
}
