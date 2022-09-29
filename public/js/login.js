const loginHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#floatingEmail").value.trim();
  const password = document.querySelector("#floatingPassword").value.trim();
  if (email && password) {
    const loginResponse = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (loginResponse.ok) {
      let new_user = false;
      let loggedIn = true;
      document.location.replace("/");
    } else {
      alert("Login Failure!");
    }
  }
  
};
document.getElementById("loginForm").addEventListener("submit", loginHandler);
