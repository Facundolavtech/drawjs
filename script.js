const submit = document.getElementById('btnSubmit'),
    participante = document.getElementById('name'),
    participantes = document.getElementById('listaParticipantes'),
    sortear = document.getElementById('sortear'),
    ganadorTitle = document.getElementById('ganador'),
    counter = document.getElementById('counter'),
    numeroParticipantes = document.getElementById('cantidadParticipantes')


let lista = []

let index = 1

let nParticipantes = 0


const eliminarParticipante = () => {
    removeElement()
} 


document.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter') {
        if(participante.value.length > 2){
            lista.push(participante.value)
            participantes.innerHTML += `<li>${index} - ${participante.value}</li>`
            participante.value = ''
            index++
            nParticipantes++
            numeroParticipantes.textContent = `Participantes: ${nParticipantes}`
        }
    }
})

submit.addEventListener('click', () => {
    if(participante.value.length > 2){
        lista.push(participante.value)
        participantes.innerHTML += `<li>${index} - ${participante.value}</li>`
        participante.value = ''
        index++
        nParticipantes++
        numeroParticipantes.textContent = `Participantes: ${nParticipantes}`
    }
})


const reloj = () => {
    let contador = 3
    ganadorTitle.textContent = `${contador}`
    let interval = setInterval(() => {
        contador--
        ganadorTitle.textContent = `${contador}`
        if(contador <= 0) clearInterval(interval)
    }, 1000);
}


sortear.addEventListener('click', () => {
    if(lista.length > 1){
    counter.classList.add('counter')
    reloj()
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
    }, 3000);
}
})


