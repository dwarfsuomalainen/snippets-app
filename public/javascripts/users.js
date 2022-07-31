if (document.readyState !== "loading") {
    initializeCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
  }
  
  function initializeCode() {
    let private1 = document.getElementById("private");
    private1.addEventListener("click", privatePart);
    console.log(private1);
    document.getElementById("logout").addEventListener("click", logout);
}

function privatePart(event) {
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");
    if(!authToken) return;

    fetch("/api/private", {
        method: "GET",
        headers: {
            "authorization": "Bearer " + authToken
        }
    })
        .then((response) => response.text())
        .then((page) => {
            document.getElementById("content").innerHTML = page;
        })
        .catch((e) => {
            console.log("error" + e);
        })

}

function logout(){
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}
