import React from "react";

localStorage.setItem("usuario", JSON.stringify({ role: "admin", nombre: "Fernando" }));

function Login() {
  return <div>este es el login</div>;
}

export default Login;
