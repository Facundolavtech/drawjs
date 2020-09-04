const submit = document.getElementById('btnSubmit'),
    participante = document.getElementById('name'),
    participantes = document.getElementById('listaParticipantes'),
    sortear = document.getElementById('sortear'),
    ganadorTitle = document.getElementById('ganador'),
    counter = document.getElementById('counter')


let lista = []

let index = 1

document.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter') {
        if(participante.value.length > 2){
        lista.push(participante.value)
        participantes.innerHTML += `<li>${index} - ${participante.value}</li>`
        participante.value = ''
        index++
        }
    }
})

submit.addEventListener('click', () => {
    if(participante.value.length > 2){
    lista.push(participante.value)
    participantes.innerHTML += `<li>${index} - ${participante.value}</li>`
    participante.value = ''
    index++
    }
})


const reloj = () =>{
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
    setTimeout(() => {
        const ganador = Math.floor(Math.random() * lista.length)
        ganadorTitle.textContent = `EL GANADOR ES: (${ganador + 1}) - ${lista[ganador]}`
        counter.classList.remove('counter')
    }, 3000);
}
})


