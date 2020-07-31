// variables :

let presupuestoUser = prompt("Ingrese su presupuesto para la semana");
let cantidadPresupuesto;
const formulario = document.getElementById("agregar-gasto");
// clases :

// Presupuesto 💰

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }

  //metodo resta 💰
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}

// interfaz 💻

class Interfaz {
  insertarPresupuesto(cantidad) {
    const presupuestoSpan = document.querySelector("span#total");
    const restanteSpan = document.querySelector("span#restante");

    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }

  mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.appendChild(document.createTextNode(mensaje));
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    setTimeout(function () {
      document.querySelector(".primario .alert").remove();
      formulario.reset();
    }, 3000);
  }

  insertaGasto(nombre, cantidad) {
    const gastosLista = document.querySelector("#gastos ul");
    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill" >$ ${cantidad} </span>
        `;
    gastosLista.appendChild(li);
  }

  presupuestoRestante(cantidad) {
    let restante = document.getElementById("restante");

    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(
      cantidad
    );

    restante.innerHTML = `${presupuestoRestanteUsuario}`;
    this.estadoPresupuesto();
  }

  estadoPresupuesto() {
    const presTotal = cantidadPresupuesto.presupuesto;
    const presRestante = cantidadPresupuesto.restante;

    if (
      presRestante < (presTotal * 50) / 100 &&
      presRestante > (presTotal * 10) / 100
    ) {
      const restante = document.querySelector(".restante");
      restante.classList.remove("alert-success", "alert-warning");
      restante.classList.add("alert-warning");
    } else if (presRestante < (presTotal * 10) / 100) {
      const restante = document.querySelector(".restante");
      restante.classList.remove("alert-success");
      restante.classList.add("alert-danger");
    }
  }
}

// listeners :

document.addEventListener("DOMContentLoaded", function () {
  if (presupuestoUser === "" || presupuestoUser === null) {
    window.location.reload();
  } else {
    cantidadPresupuesto = new Presupuesto(presupuestoUser);

    const ui = new Interfaz();
    ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombreGasto = document.getElementById("gasto").value;
  const cantGasto = document.getElementById("cantidad").value;

  const ui = new Interfaz();

  if (nombreGasto === "" || cantGasto == "") {
    ui.mostrarMensaje("Hubo un error de carga de datos.", "error");
  } else {
    ui.mostrarMensaje("Gasto Agregado", "correcto");
    ui.insertaGasto(nombreGasto, cantGasto);
    ui.presupuestoRestante(cantGasto);
  }
});
