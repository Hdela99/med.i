const signupHandler = async (event) => {
  event.preventDefault();

  const first_name= document.querySelector("#userFirst").value.trim();

  const last_name= document.querySelector("#userLast").value.trim();

  const user_name= document.querySelector("#userName").value.trim();

  const email = document.querySelector("#userEmail").value.trim();

  const password = document.querySelector("#floatingPassword").value.trim();

  //need to get right fetch info below here
  if (first_name && last_name && user_name && email && password) {
    const loginResponse = await fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, user_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (loginResponse.ok) {
      let new_user = true;
      document.location.replace("/");
    } else {
      
      alert("Sign up Failure!");
    }
  }
};
document.getElementById("signupForm").addEventListener("submit", signupHandler);
