let recipe_fetched = document.createElement("div");

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    init();
  });
}

function init() {
  fetchPasta();
  fetchCategory();

  async function fetchPasta() {
    let getPasta = await fetch("/api/recipe/pasta");
    if (getPasta.ok) {
      let recipePasta = await getPasta.json();
      console.log(recipePasta);
      let nameI = recipePasta.name;
      let ingredientsI = recipePasta.ingredients;
      let instructionsI = recipePasta.instructions;
      toIndex(nameI, ingredientsI, instructionsI);
    }
  }

  function toIndex(x, y, p, k) {
    let recipeName = document.getElementById("recipename");
    recipeName.innerHTML = x;
    let recipeIngr = document.getElementById("reciepeIngredients");
    recipeIngr.innerHTML = y;
    let recipeInstr = document.getElementById("recipeInstructions");
    recipeInstr.innerHTML = p;
    let imagesToIndex = document.getElementById("images");
    console.log(imagesToIndex);
    console.log(k);
    //imagesToIndex.appendChild(k);
  }

  let btn = document.getElementById("add-ingredient");
  console.log(btn);
  btn.addEventListener("click", addIngredient);
  let ingrArr = [];

  function addIngredient() {
    let RecipeIngredients = document.getElementById("ingredients-text");
    console.log(RecipeIngredients.value);
    if (RecipeIngredients.value === "") {
      return;
    } else {
      ingrArr.push(RecipeIngredients.value);
      RecipeIngredients.value = "";
      console.log(ingrArr);
    }
  }

  let btn2 = document.getElementById("add-instruction");
  console.log(btn2);
  btn2.addEventListener("click", addInstruction);
  let insArr = [];

  function addInstruction() {
    let RecipeInstructions = document.getElementById("instructions-text");
    console.log(RecipeInstructions.value);
    if (RecipeInstructions.value === "") {
      return;
    } else {
      insArr.push(RecipeInstructions.value);
      RecipeInstructions.value = "";
      console.log(insArr);
    }
  }

  //var upload = new FormData(photos);

  // this function creates list of id's of categories for the POST new recipe
  let categories = [];
  function checked() {
    let boxes = document.querySelectorAll(".checkbox");
    console.log(boxes);
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].checked === true) {
        console.log(categories);
        let value1 = boxes[i].id;
        categories.push(value1);
        console.log(categories);
      } else {
        console.log("not checked");
      }
    }
  }

  //Fetching photo from db
  async function fetchPhotoFromDB(idFromSearch) {
    console.log(idFromSearch);
    let dbToDiv = document.getElementById("images");
    for (i = 0; i < idFromSearch.length; i++) {
      let imgX = document.createElement("img");
      imgX.src = "/images/" + idFromSearch;
      dbToDiv.appendChild(imgX);
      img.classList.add ("image-to-index");
    }
  }

  //let submitUpload = document.getElementById('submit');
  //submitUpload.addEventListener('click', uploadPhoto);
  let imagesArr = [];
  async function uploadPhoto() {
    let formData = new FormData();
    let photos = document.getElementById("camera-file-input");
    let files = photos.files;

    for (let img = 0; img < files.length; img++) {
      console.log(files);
      formData.append("camera-file-input", files[img]);
      //imagesArr.push(files[img]._id);
    }
    console.log(files);
    let ImagesIds = await fetch("/api/images", {
      method: "POST",
      body: formData,
    }).then((response) => response.json());
    console.log(ImagesIds);
    console.log(ImagesIds[0]);
    console.log(files.length);
    for (i = 0; i < files.length; i++) {
      imagesArr.push(ImagesIds[i]);
      console.log(imagesArr);
    }
    for (const valueFormdata of formData.values()) {
      console.log(valueFormdata);
    }
  }

  async function fetchCategory() {
    let categoryRec = await fetch("/api/category/", {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((response) => response.json());
    //let catJson = categoryRec.json();
    //console.log(catJson);
    console.log(categoryRec);
    //for (let i=0; i < categoryRec.length; i++) {
    for (var count in categoryRec) {
      let catChk = document.getElementById("catForm");
      console.log(catChk);
      let pCat = document.createElement("p");
      let lbl = document.createElement("label");
      let chkBox = document.createElement("input");
      chkBox.type = "checkbox";
      chkBox.classList.add("checkbox");
      chkBox.name = "category";
      chkBox.id = categoryRec[count]._id;
      let span1 = document.createElement("span");
      let catN = categoryRec[count].name;
      chkBox.innerHTML = categoryRec[count].name;
      console.log(catN);
      span1.innerHTML = catN;
      pCat.appendChild(lbl);
      lbl.appendChild(chkBox);
      lbl.appendChild(span1);
      catChk.appendChild(pCat);
    }

    // Submit
    document
      .getElementById("submit")
      .addEventListener("click", async (event) => {
        event.preventDefault();

        await uploadPhoto();
        let RecipeName = document.getElementById("name-text");
        console.log(ingrArr);
        console.log(insArr);
        console.log(categories);
        //console.log(imagesArr);
        checked();
        const token = window.localStorage.getItem("auth_token");
        await fetch("/api/recipe/", {
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token,
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            name: RecipeName.value,
            ingredients: ingrArr,
            instructions: insArr,
            categories: categories,
            images: imagesArr,
          }),
        }).then((response) => {
          if (response.ok) {
            document.location.href = "/";
          }
        });
        RecipeName.value = "";
        categories = [];
        imagesArr = [];
        uncheck();
      });
    // this function clears the checkboxes on Submit
    function uncheck() {
      let box = document.querySelectorAll(".checkbox");
      console.log(box);
      for (let i = 0; i < box.length; i++) {
        if (box[i].checked == true) {
          box[i].checked = false;
        }
      }
    }
  }
}
