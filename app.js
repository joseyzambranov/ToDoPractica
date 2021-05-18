console.log("Hello World")

const formulario = document.getElementById('formulario')
const listaTarea = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragmanet = document.createDocumentFragment()
const input = document.getElementById('input')
/*let tareas = {
    1621344596196: {
        id: 1621344596196,
        texto: 'Tarea #1',
        estado: false
    },
    1621344705424: {
        id: 1621344705424,
        texto: 'Tarea #2',
        estado: false
    }
}*/
let tareas={}

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

listaTarea.addEventListener('click', e => {
    btnAction(e)
})

formulario.addEventListener('submit', e => {
    e.preventDefault()
    /*console.log(e.target[0].value)
    console.log(e.target.querySelector('input').value)
    console.log(input.value)*/
    setTareas(e)
})
//console.log(Date.now())
const setTareas = e => {
    if (input.value.trim() === '') {
        console.log('esta vacio')
        return
    }
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    tareas[tarea.id] = tarea
    //console.log(tareas)
    formulario.reset()
    input.focus()
    pintarTareas()
}


const pintarTareas = () => {
    localStorage.setItem('tareas',JSON.stringify(tareas))

    if(Object.values(tareas).length===0){
        listaTarea.innerHTML = `<div class="alert alert-dark text-center">
        No Hay Tareas Pendientes &#128525
    </div>`
        return
    }
    listaTarea.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragmanet.appendChild(clone)
    })
    listaTarea.appendChild(fragmanet)
}

const btnAction = (e) => {

    if (e.target.classList.contains('fa-check-circle')) {
        console.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
        console.log(tareas)

    }
    if (e.target.classList.contains('fa-minus-circle')) {
        delete tareas[e.target.dataset.id]
        pintarTareas()
        console.log(tareas)
    }
    if (e.target.classList.contains('fa-undo-alt')) {
        console.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
        console.log(tareas)

    }
    
    e.stopPropagation()
}