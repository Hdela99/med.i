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
      document.location.replace("/");
    } else {
      alert("Login Failure!");
    }
  }
  // console.log(email)
  // console.log(password)
};
document.getElementById("loginForm").addEventListener("submit", loginHandler);

//Ava - need to validate response object, user sends request, server says no
//models is where we validate info from user.

// document.queryselector('input')
// //make for each input field
// function api-call () ->
// 	fetch('/api/user/login', {object, body includes the information}
// response -> anthony's truthie or falsie verification
// for each input, assign 'is-valid' or 'is-invalid' to style the object using DOM manipulation
// //use module 14 as example.
// //post request, backend Anthony will do check for each of them, email exists, then if password matches will give Boolean value for is-valid or is-invalid

// //this function is for bootstrap to validate the login/sign up form
// var userLogin = true;
// var userPw = true;

// (function () {
//   "use strict";

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll(".needs-validation");

//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms).forEach(function (form) {
//     form.addEventListener(
//       "submit",
//       function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault();
//           event.stopPropagation();
//         }

//         form.classList.add("was-validated");
//       },
//       false
//     );
//   });
// })();

// // //how to hookup this validation to display properly using booleans
// // //needs call to API to send info to /
// // // userLogin = true;
// // // userPw = true;
// // // use if statements to determine how validation appears.
// // //use document.querySelector for each query field, once pull values, have access to inputs.
