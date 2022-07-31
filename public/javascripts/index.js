if (document.readyState !== "loading") {
  initializeCodeIndex();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCodeIndex();
    // loadPosts();
  });
}

function initializeCodeIndex() {
  const token = window.localStorage.getItem("auth_token"); /// -!!!!!!!
  let btnLOGOUT = document.getElementById("logout");
  btnLOGOUT.addEventListener("click", () => {
    window.localStorage.removeItem("auth_token");
    window.location.reload();
  });
  let textareaIndex = document.getElementById("add-item");
  textareaIndex.addEventListener("keypress", function (k) {
    if (k.key === "Enter") {
      let value = k.target.value;
      fetch("/api/todos", {
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
          ["Content-Type"]: "application/json",
        },
        method: "POST",
        body: JSON.stringify({ items: [value] }),
      }).then(() => {
        let divFromIndex = document.getElementById("listOfItems");
        let divToIndex = document.createElement("div");
        divToIndex.innerHTML = value;
        divFromIndex.appendChild(divToIndex);
        k.target.value = "";
      });
    }
  });

  // Search a recipe in a DB
  let bar = document.getElementById("search");
  if (bar) {
    bar.addEventListener("keypress", function (k) {
      if (k.key === "Enter") {
        console.log(bar.value);
        let c = bar.value;
        k.preventDefault();
        search(c);
        bar.value = "";
        let del = document.getElementById("images");
        del.innerHTML = "";
      }
    });
  }

  if (!token) {
    console.log("no token");
    return;
  }
  fetch("/api/private", {
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => (response.ok ? response.json() : undefined))
    .then((data) => {
      if (data && data.email) {
        console.log(data.email);
        let vvv = document.getElementById("links");
        vvv.classList.add("hidden");
        let bbb = document.getElementById("buttonLogout");
        bbb.classList.remove("hidden");
        let ddd = document.getElementById("displayEmail");
        ddd.innerText = "Registered user : " + data.email + " User ID :";
        // listOfItems();
      } else {
        window.localStorage.removeItem("auth_token");
        console.log("token deleted");
      }
    });
}

async function search(food) {
  let findRecipe = await fetch("/api/recipe/" + food, {
    method: "GET",
    headers: { "content-type": "application/json" },
  }).then((response) => response.json());
  console.log(findRecipe);
  console.log(findRecipe.images);

  let imagefromDB = findRecipe.images; // getting image id from db
  let b = fetchPhotoFromDB(imagefromDB);
  toIndex(findRecipe.name, findRecipe.ingredients, findRecipe.instructions, b);
  b = "";
}

/*function loadPosts () {
 
    let postCardDiv = document.createElement("div");
    let post = document.createElement("h3");
    post.innerText = " Post title";
    postCardDiv.appendChild.post
    let postTitle = document.createElement('h2');

    let main = document.getElementById('posts');
    console.log(main);
    main.appendChild(postCardDiv);

  }*/

/*function onSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    fetch("/api/user/login", {
        method: "POST",
        body: formData
    })  
    
        .then((response) => response.json())
        .then((data) => {
            if(data.token) {
                storeToken(data.token);
                window.location.href="/";
            } else {
                if (data.message) {
                    document.getElementById("error").innerHTML = data.message;
                }  else {
                    document.getElementById("error").innerHTML = "Very strange error!";
                }
            }

        })

}

function storeToken(token) {
    localStorage.setItem("auth_token", token);
}*/
