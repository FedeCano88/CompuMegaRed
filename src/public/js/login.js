document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Email y contraseña son obligatorios",
      });
      return;
    }

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Guardar en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirigir automáticamente a la tienda con su email
        Swal.fire({
          title: `Bienvenido ${data.user.first_name}!`,
          icon: "success",
          confirmButtonText: "Ir a la tienda",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(() => {
          const encodedEmail = encodeURIComponent(data.user.email);
          console.log("Redireccionando a /shop con email:", data.user.email);
          window.location.href = `/shop?email=${encodedEmail}`;
        });

      } else {
        Swal.fire("Error", data.detail || "Credenciales incorrectas", "error");
      }
    } catch (err) {
      console.error("❌ Error en login:", err);
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  });
});




