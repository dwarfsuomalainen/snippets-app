if (document.readyState !== "loading") {
  initializeCodeRegister();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCodeRegister();
  });
}

function initializeCodeRegister() {
  handleErrorParam();
}

const errors = {
  password: "Password is not strong enough",
  exists: "Email already in use",
};

function handleErrorParam() {
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");

  if (error && errors[error]) {
    const errorContainer = document.getElementById("error");
    errorContainer.classList.add('card-panel');
    errorContainer.innerText = errors[error];
  }
}
