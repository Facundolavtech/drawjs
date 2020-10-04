const submit = document.getElementById('btnSubmit'),
    nombreParticipante = document.getElementById('name'),
    listaParticipantes = document.getElementById('listaParticipantes'),
    sortear = document.getElementById('sortear'),
    cuentaRegresiva = document.getElementById('cuentaRegresiva')
    ganadorTitle = document.getElementById('ganador'),
    counter = document.getElementById('counter'),
    numeroParticipantes = document.getElementById('cantidadParticipantes'),
    errorMsg = document.querySelector('.errorMsg')


let lista = []

let index = 1

let nParticipantes = 0


function mostrarError() {
    errorMsg.classList.remove('errorHidden')
    const ocultarError = setTimeout(() => {
        errorMsg.classList.add('errorHidden')
    }, 2000);
}


const agregarParticipante = (name) => {
    if(nombreParticipante.value.length > 13){
        mostrarError()
        nombreParticipante.value = ''
        return
    } 

    if(nombreParticipante.value.length > 2){
        lista.push(nombreParticipante.value)

        const participante = document.createElement('li')
        participante.innerHTML = `${index} - ${nombreParticipante.value}`

        const eliminarBtn = document.createElement('button')
        eliminarBtn.setAttribute('id', `${index-1}`)
        eliminarBtn.setAttribute('class', 'eliminarBtn')
        eliminarBtn.innerHTML = `Eliminar`
    
        participante.insertAdjacentElement('beforeend', eliminarBtn)

        eliminarBtn.addEventListener('click', (e) => {
            console.log(e.target.id)
            let nuevaLista = lista.filter(part => part !== lista[e.target.id])
            lista = nuevaLista
            participante.remove()
            nParticipantes--
            if(nParticipantes === 0) numeroParticipantes.textContent = ``
            else numeroParticipantes.textContent = `Participantes: ${nParticipantes}`
            console.log(nuevaLista)
            console.log(e.target)
        })
        

        listaParticipantes.appendChild(participante)
        nombreParticipante.value = ''
        index++
        nParticipantes++
        numeroParticipantes.textContent = `Participantes: ${nParticipantes}`
    } 
    else {
        mostrarError()
        nombreParticipante.value = ''
        return
    }
}


submit.addEventListener('click', () => {
    agregarParticipante(nombreParticipante)
})

document.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter') agregarParticipante(nombreParticipante)
})


const reloj = () => {
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

sortear.addEventListener('click', () => {
    if(lista.length > 1){
    counter.classList.add('counter')
    reloj()
    const botonesEliminar = document.querySelectorAll('.eliminarBtn')
    botonesEliminar.forEach(e => e.disabled=true)
    ganadorTitle.textContent = ''
    sortear.disabled=true
    sortear.style.cursor=('initial')
    sortear.style.backgroundColor=('rgb(158, 157, 157)')
    setTimeout(() => {
        const ganador = Math.floor(Math.random() * lista.length)
        ganadorTitle.textContent = `EL GANADOR ES: (${ganador + 1}) - ${lista[ganador]}`
        counter.classList.remove('counter')
        sortear.disabled=false
        sortear.style.cursor=('pointer')
        sortear.style.backgroundColor=('rgb(177, 69, 69)')
        sortear.textContent= "Volver a Sortear"
        botonesEliminar.forEach(e => e.disabled=false)
    }, 3000);
}
})


