const signupHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#userFirst").value.trim();

  const lastName = document.querySelector("#userLast").value.trim();

  const userName = document.querySelector("#userName").value.trim();

  const email = document.querySelector("#floatingEmail").value.trim();

  const password = document.querySelector("#floatingPassword").value.trim();

  //need to get right fetch info below here
  if (firstName && lastName && userName && email && password) {
    const loginResponse = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, userName, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (loginResponse.ok) {
      document.location.replace("/");
    } else {
      alert("Sign up Failure!");
    }
  }
};
document.getElementById("signupForm").addEventListener("submit", loginHandler);
