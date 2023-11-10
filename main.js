const botonAnadir = document.querySelector(".btn-add");
const resultado = document.querySelector("ul");
const agregarTarea = document.querySelector("input");
const mensajeTareaVacia = document.querySelector(".empty");
const contador = document.querySelector(".task-count");

let tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareasEnLocalStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));
}

function cargarTareasDesdeLocalStorage() {
    resultado.innerHTML = "";

    tareasGuardadas.forEach(tarea => {
        anadirElemento(tarea);
    });
}

function anadirElemento(elemento) {
    let crearApartado = document.createElement("li");
    let resultadoTexto = document.createElement("p");
    let span = document.createElement("span");
    span.textContent = elemento;
    resultadoTexto.appendChild(span);
    crearApartado.appendChild(resultadoTexto);
    crearApartado.appendChild(eliminarElemento(elemento));
    resultado.appendChild(crearApartado);
    mensajeTareaVacia.style.display = "none";
    contador.children[1].textContent = resultado.children.length;
}

function eliminarElemento(elemento) {
    const eliminarTarea = document.createElement("button");
    eliminarTarea.textContent = "X";
    eliminarTarea.className = "btn-delete";
    eliminarTarea.addEventListener("click", () => {
        let tareaIndex = tareasGuardadas.indexOf(elemento);
        if (tareaIndex !== -1) {
            tareasGuardadas.splice(tareaIndex, 1);
            guardarTareasEnLocalStorage();
        }

        let clicarBorrarTarea = eliminarTarea.parentElement;
        resultado.removeChild(clicarBorrarTarea);
        resultado.children.length === 0 && (mensajeTareaVacia.style.display = "block");
        contador.children[1].textContent = resultado.children.length;
    });
    return eliminarTarea;
}

botonAnadir.addEventListener("click", () => {
    if (agregarTarea.value !== "") {
        anadirElemento(agregarTarea.value);
        tareasGuardadas.push(agregarTarea.value);
        guardarTareasEnLocalStorage();
        agregarTarea.value = "";
    }
});

cargarTareasDesdeLocalStorage();
