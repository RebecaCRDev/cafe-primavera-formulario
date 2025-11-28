/* Hecho por Rebeca Cristóbal */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-inscripcion");
    const modal = document.getElementById("modal-ok");
    const cerrarModal = document.getElementById("cerrar-modal");

    function mostrarError(input, mensaje) {  /* Añade clase y mensaje de error */
        input.classList.add("invalid");
        input.classList.remove("valid");
        const error = input.parentElement.querySelector(".error-msg");
        if (error) error.textContent = mensaje;
    }

    function limpiarError(input) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        const error = input.parentElement.querySelector(".error-msg");
        if (error) error.textContent = "";
    }

    function esMayorEdad(fechaString) {
        const hoy = new Date();
        const fecha = new Date(fechaString);
        let edad = hoy.getFullYear() - fecha.getFullYear();
        const m = hoy.getMonth() - fecha.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
            edad--;
        }
        return edad >= 18;
    }

    function palabrasReales(texto) {
        return texto
            .trim()
            .split(/\s+/)
            .filter(p => p.length >= 3).length;
    }

    /* Nombre */
    function validarNombre() {
        const input = document.getElementById("nombre");
        const ok = /^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ]{3,}$/.test(input.value.trim());
        ok ? limpiarError(input) : mostrarError(input, "El nombre debe tener al menos 3 letras.");
        return ok;
    }

    /* Apellidos */
    function validarApellidos() {
        const input = document.getElementById("apellidos");
        const partes = input.value.trim().split(/\s+/);
        const ok = partes.length >= 2 && partes.every(p => p.length >= 3);
        ok ? limpiarError(input) : mostrarError(input, "Debe poner dos apellidos de mínimo 3 letras cada uno.");
        return ok;
    }

    /* DNI */
    function validarDNI() {
        const input = document.getElementById("dni");
        const ok = /^[0-9]{8}[A-Za-z]$/.test(input.value.trim());
        ok ? limpiarError(input) : mostrarError(input, "Debe tener 8 números y 1 letra.");
        return ok;
    }

    /* Fecha */
    function validarFecha() {
        const input = document.getElementById("fecha-nac");
        const ok = input.value && esMayorEdad(input.value);
        ok ? limpiarError(input) : mostrarError(input, "Debe ser mayor de 18 años.");
        return ok;
    }

    /* EMAIL */
    function validarEmail() {
        const input = document.getElementById("email");
        const ok = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(input.value.trim());
        ok ? limpiarError(input) : mostrarError(input, "Debe introducir un correo válido.");
        return ok;
    }

    /* Teléfono */
    function validarTelefono() {
        const input = document.getElementById("telefono");
        const ok = /^[0-9]{6,}$/.test(input.value.trim());
        ok ? limpiarError(input) : mostrarError(input, "Debe tener al menos 6 números.");
        return ok;
    }

    /* Dirección */
    function validarDireccion() {
        const input = document.getElementById("direccion");
        const ok = input.value.trim().length >= 3;
        ok ? limpiarError(input) : mostrarError(input, "Introduce una dirección válida.");
        return ok;
    }

    /* Ciudad */
    function validarCiudad() {
        const input = document.getElementById("ciudad");
        const ok = input.value.trim().length >= 2;
        ok ? limpiarError(input) : mostrarError(input, "Introduce una ciudad válida.");
        return ok;
    }
 
    /* Código Postal */
    function validarCP() {
        const input = document.getElementById("cp");
        const ok = /^[0-9]{5}$/.test(input.value.trim());
        ok ? limpiarError(input) : mostrarError(input, "Debe tener exactamente 5 dígitos.");
        return ok;
    }

    /* Altura */
    function validarAltura() {
        const input = document.getElementById("altura");
        const n = Number(input.value);
        const ok = n >= 120 && n <= 230;
        ok ? limpiarError(input) : mostrarError(input, "Debe estar entre 120 y 230.");
        return ok;
    }

    /* Peso */
    function validarPeso() {
        const input = document.getElementById("peso");
        const n = Number(input.value);
        const ok = n >= 35 && n <= 250;
        ok ? limpiarError(input) : mostrarError(input, "Debe estar entre 35 y 250.");
        return ok;
    }

    /* Nivel */
    function validarNivel() {
        const input = document.getElementById("nivel");
        const ok = input.value !== "";
        ok ? limpiarError(input) : mostrarError(input, "Debe seleccionar un nivel.");
        return ok;
    }

    /* Objetivos */
    function validarObjetivos() {
        const input = document.getElementById("objetivos");
        const ok = palabrasReales(input.value) >= 3;
        ok ? limpiarError(input) : mostrarError(input, "Debe escribir mínimo 3 palabras reales.");
        return ok;
    }

    /* Reserva del plan */
    function validarPlan() {
        const input = document.getElementById("plan");
        const ok = input.value !== "";
        ok ? limpiarError(input) : mostrarError(input, "Debe elegir una actividad.");
        return ok;
    }

    /* Días */
    function validarDias() {
        const dias = document.querySelectorAll("fieldset:nth-of-type(4) .chip input[type='checkbox']");
        const alguno = Array.from(dias).some(c => c.checked);

        const contenedor = dias[0].closest(".control");
        let error = contenedor.querySelector(".error-msg");

        if (!error) {
            error = document.createElement("p");
            error.className = "error-msg";
            contenedor.appendChild(error);
        }

        if (!alguno) {
            error.textContent = "Seleccione al menos un día.";
        } else {
            error.textContent = "";
        }

        return alguno;
    }

    /* Hora */
    function validarHora() {
        const input = document.getElementById("hora");
        const ok = input.value !== "";
        ok ? limpiarError(input) : mostrarError(input, "Debe elegir una franja.");
        return ok;
    }

    /* IBAN */
    function validarIBAN() {
        const input = document.getElementById("iban");
        const ok = /^[0-9]{4}$/.test(input.value.trim());
        ok ? limpiarError(input) : mostrarError(input, "Debe introducir 4 dígitos.");
        return ok;
    }

 /* Facturación */
    function validarFacturacion() {
        return true; 
    }

    /* Consentimientos */
    function validarConsentimientos() {
        return document.getElementById("tos").checked &&
               document.getElementById("rgpd").checked;
    }

    /* Validación general */
    function validar() {
        let ok = true;

        if (!validarNombre()) ok = false;
        if (!validarApellidos()) ok = false;
        if (!validarDNI()) ok = false;
        if (!validarFecha()) ok = false;
        if (!validarEmail()) ok = false;
        if (!validarTelefono()) ok = false;
        if (!validarDireccion()) ok = false;
        if (!validarCiudad()) ok = false;
        if (!validarCP()) ok = false;
        if (!validarAltura()) ok = false;
        if (!validarPeso()) ok = false;
        if (!validarNivel()) ok = false;
        if (!validarObjetivos()) ok = false;
        if (!validarPlan()) ok = false;
        if (!validarDias()) ok = false;
        if (!validarHora()) ok = false;
        if (!validarIBAN()) ok = false;

        if (!validarConsentimientos()) ok = false;

        return ok;
    }

    const realtimeInputs = [
        "nombre","apellidos","dni","fecha-nac","email","telefono",
        "direccion","ciudad","cp","altura","peso","nivel",
        "objetivos","plan","hora","iban"
    ];

    /* Validación con colores rojo y verde */
    realtimeInputs.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        input.addEventListener("input", validar);
        input.addEventListener("change", validar);
    });

    /* Envío del formulario */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validar()) {
            alert("Por favor, corrige o completa los campos marcados en rojo.");
            return;
        }

        modal.style.display = "flex";
    });

    cerrarModal.addEventListener("click", () => {
        modal.style.display = "none";
        form.reset();
        window.scrollTo(0, 0);
    });

});