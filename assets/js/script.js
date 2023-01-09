const lista = [
    {
        identificador: 1,
        descripcion: "Almorzar con mi madre",
        estado: false
    },
    {
        identificador: 10,
        descripcion: "Analizar soluciones para el trabajo",
        estado: false
    },    {
        identificador: 6,
        descripcion: "Estudiar javascript unas 3 horas",
        estado: false
    },
];

const tbody = document.querySelector("tbody");
const inputTarea = document.querySelector("#input-tarea");
const inputBtn = document.querySelector("#input-button");

filas(lista);

//Para insertar la tarea en la lista
function filas(lista) {
    tbody.innerHTML = "";
    lista.forEach((tarea) => {
        tbody.innerHTML += `
            <tr>
                <td>${tarea.identificador}</td>
                <td>${tarea.descripcion}</td>
                <td><input type="checkbox" class="checkbox" onclick="realizadas(${tarea.identificador})"></td>
                <td><i class="fa-sharp fa-solid fa-xmark" onclick="eliminar(${tarea.identificador})"></i></td>
            </tr>`;
        });
    totales(lista)
    }

// Para revisar si está ocupado el ID
function revisarIDs(lista) {
    let numerosOcupados = [];
    for (let tareas of lista) {
        numerosOcupados.push(tareas.identificador);
    }
    return numerosOcupados
}

// funcion para el boton
inputBtn.addEventListener("click", () => {
    let id = 1;

    // comprueba si esta ocupado el ID
    while (revisarIDs(lista).includes(id) == true) {
        id = id + 1;
    }

    // crea una variable para la nueva tarea y la inserta en la lista
    const nuevaTarea = {identificador: id, descripcion: inputTarea.value, estado: false}
    lista.push(nuevaTarea)
    inputTarea.value = ""

    // reutilizo la funcion para que carguen las nuevas tareas
    filas(lista);
    totales(lista)
});

// Para eliminar la tarea
function eliminar(id) {
    const index = revisarIDs(lista).findIndex((pos) => pos == id)
    lista.splice(index, 1)
    filas(lista)
    totales(lista)
}

// mide la cantidad total de tareas
function totales(lista) {
    document.getElementById("total").innerHTML = revisarIDs(lista).length
}

// cuenta la cantidad de tareas en "true", no supe como mantener la checkbox luego de actualizar la página.
function realizadas(id) {
    const index = revisarIDs(lista).findIndex((pos) => pos == id)

    if (lista[index].estado == false) {
        lista[index].estado = true
    }
    else {
        lista[index].estado = false
    }

    let i = 0
    let contador = 0

    while (i < lista.length) {
        if (lista[i].estado == true) {
            contador = contador + 1
        }
        i = i + 1
    }
    console.log(contador)
    document.getElementById("realizadas").innerHTML = contador
}