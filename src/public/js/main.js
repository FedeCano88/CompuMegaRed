// main.js

document.addEventListener("DOMContentLoaded", () => {
  const btnTienda = document.getElementById("btnTienda");

  if (btnTienda) {
    btnTienda.addEventListener("click", () => {
      const usuario = JSON.parse(localStorage.getItem("user"));
      if (usuario && usuario.email) {
        const encodedEmail = encodeURIComponent(usuario.email);
        window.location.href = `/shop?email=${encodedEmail}`;
      } else {
        Swal.fire("⚠️ Debes iniciar sesión", "Iniciá sesión para acceder a la tienda", "warning");
      }
    });
  }
});
