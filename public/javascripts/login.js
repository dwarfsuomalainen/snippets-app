if (document.readyState !== "loading") {
  initializeCodeLogin();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCodeLogin();
  });
}

function initializeCodeLogin() {
  let form1 = document
    .getElementById("login-form")
    .addEventListener("submit", onSubmit);
  //console.log(form1);
}

function onSubmit(event) {
  event.preventDefault();
  console.log(event.target);
  const formData = new FormData(event.target);
  fetch("/api/user/login", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        storeToken(data.token);
        window.location.href = "/";
      } else {
        document.getElementById("error").innerHTML = "Invalid credentials";
      }
    });
}

function storeToken(token) {
  localStorage.setItem("auth_token", token);
}
