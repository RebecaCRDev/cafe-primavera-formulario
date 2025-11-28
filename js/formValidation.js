/* Hecho por Rebeca Cristóbal */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form-inscripcion");
  const modal = document.getElementById("modal-ok");
  const cerrarModal = document.getElementById("cerrar-modal");

  const campos = form.querySelectorAll("input, select, textarea");

  campos.forEach(campo => {
    if (!campo.parentElement.querySelector(".error-msg")) {
      const p = document.createElement("p");
      p.classList.add("error-msg");
      campo.parentElement.appendChild(p);
    }
  });

  function mostrarError(input, mensaje) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    input.parentElement.querySelector(".error-msg").textContent = mensaje;
  }

  function limpiarError(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    input.parentElement.querySelector(".error-msg").textContent = "";
  }

  function esMayorEdad(fechaString) {
    const hoy = new Date();
    const fecha = new Date(fechaString);
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
    return edad >= 18;
  }

  function palabrasReales(texto) {
    return texto.trim().split(/\s+/).filter(p => p.length >= 3).length;
  }

  function validarCampo(input) {
    const id = input.id;
    const value = input.value.trim();

    switch (id) {

      case "nombre":
        if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ]{3,}$/.test(value))
          return mostrarError(input, "Mínimo 3 letras.");
        break;

      case "apellidos":
        const partes = value.split(/\s+/);
        if (partes.length < 2 || !partes.every(p => p.length >= 3))
          return mostrarError(input, "Dos apellidos, mínimo 3 letras cada uno.");
        break;

      case "dni":
        if (!/^[0-9]{8}[A-Za-z]$/.test(value))
          return mostrarError(input, "8 números + letra.");
        break;

      case "fecha-nac":
        if (!value || !esMayorEdad(value))
          return mostrarError(input, "Debe ser mayor de edad.");
        break;

      case "email":
        if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value))
          return mostrarError(input, "Email inválido.");
        break;

      case "telefono":
        if (!/^[0-9]{6,}$/.test(value))
          return mostrarError(input, "Solo números, mínimo 6 dígitos.");
        break;

      case "direccion":
        if (value.length < 3)
          return mostrarError(input, "Dirección demasiado corta.");
        break;

      case "ciudad":
        if (value.length < 2)
          return mostrarError(input, "Ciudad inválida.");
        break;

      case "cp":
        if (!/^[0-9]{5}$/.test(value))
          return mostrarError(input, "El CP debe tener 5 números.");
        break;

      case "altura":
        if (value < 120 || value > 230)
          return mostrarError(input, "Entre 120 y 230 cm.");
        break;

      case "peso":
        if (value < 35 || value > 250)
          return mostrarError(input, "Entre 35 y 250 kg.");
        break;

      case "nivel":
        if (value === "")
          return mostrarError(input, "Selecciona una opción.");
        break;

      case "objetivos":
        if (palabrasReales(value) < 3)
          return mostrarError(input, "Mínimo 3 palabras reales.");
        break;

      case "plan":
        if (value === "")
          return mostrarError(input, "Selecciona una actividad.");
        break;

      case "hora":
        if (value === "")
          return mostrarError(input, "Selecciona una franja.");
        break;

      case "iban":
        if (!/^[0-9]{4}$/.test(value))
          return mostrarError(input, "4 últimos números del IBAN.");
        break;
    }

    limpiarError(input);
  }

  // Activar validación en tiempo real
  campos.forEach(input => {
    input.addEventListener("input", () => validarCampo(input));
    input.addEventListener("change", () => validarCampo(input));
  });

  function validarFormulario() {
    let ok = true;

    campos.forEach(campo => {
      validarCampo(campo);
      if (campo.classList.contains("invalid")) ok = false;
    });

    // Días preferidos
    const dias = document.querySelectorAll(
      "fieldset:nth-of-type(4) input[type='checkbox']"
    );
    const algunDia = Array.from(dias).some(d => d.checked);

    if (!algunDia) {
      alert("Selecciona al menos un día preferido.");
      ok = false;
    }

    // Consentimientos
    if (!document.getElementById("tos").checked ||
        !document.getElementById("rgpd").checked) {
      alert("Debes aceptar los términos y la política de privacidad.");
      ok = false;
    }

    return ok;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!validarFormulario()) {
      alert("Corrige los campos marcados en rojo.");
      return;
    }

    modal.style.display = "flex";
  });

  // Cierra modal
  cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
    window.scrollTo(0,0);

    // Limpiar colores
    campos.forEach(campo => {
      campo.classList.remove("valid", "invalid");
      campo.parentElement.querySelector(".error-msg").textContent = "";
    });
  });

});