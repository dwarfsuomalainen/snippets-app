if (document.readyState !== "loading") {
  initializeCodePosts();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCodePosts();
  });
}

function initializeCodePosts() {
  loadPost();
}

function loadPost() {
  const id = getPostId();

  fetch(`/api/recipe/${id}`)
    .then((response) => response.json())
    .then((post) => {
      const conatiner = document.getElementById("post");
      renderPost(conatiner, post);
      const commentsConatiner = document.getElementById("comments");
      renderComments(commentsConatiner, post.comments);
    });

  document
    .getElementById("comment-form")
    .addEventListener("submit", submitComment);
}

function getPostId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function submitComment(event) {
  const id = getPostId();
  const token = window.localStorage.getItem("auth_token");

  event.preventDefault();
  const formData = new FormData(event.target);
  fetch(`/api/recipe/${id}/comments`, {
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
      ["Content-Type"]: "application/json",
    },
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  }).then(() => {
    loadPost();
  });
}

function renderPost(container, postData) {
  container.innerHTML = "";
  let postCardDiv = document.createElement("div");
  let postTitle = document.createElement("h3");
  postTitle.innerText = postData.name || "Untitled Post";
  postCardDiv.appendChild(postTitle);

  if (postData.categories.length) {
    const categories = document.createElement("p");
    categories.innerText =
      "Categories: " +
      postData.categories.map((category) => category.name).join(", ");
    postCardDiv.appendChild(categories);
  }

  if (postData.ingredients.length) {
    const ingredients = document.createElement("p");
    ingredients.innerText = "Ingredients: " + postData.ingredients.join(", ");
    postCardDiv.appendChild(ingredients);
  }

  if (postData.instructions.length) {
    const instructions = document.createElement("p");
    instructions.innerText =
      "Instructions: " + postData.instructions.join(", ");
    postCardDiv.appendChild(instructions);
  }

  if (postData.images.length) {
    const imagesContainer = document.createElement("div");

    for (image of postData.images) {
      const img = document.createElement("img");
      img.src = `/api/images/${image}`;
      imagesContainer.appendChild(img);
    }

    postCardDiv.appendChild(imagesContainer);
  }

  container.appendChild(postCardDiv);
}

function renderComments(container, comments) {
  container.innerHTML = "";
  for (const comment of comments) {
    renderComment(container, comment);
  }
}

function renderComment(container, comment) {
  const commentContainer = document.createElement("div");
  commentContainer.innerText = `${comment.createdBy.email} on ${new Date(
    comment.commentedOn
  ).toLocaleString()} said: "${comment.commentBody}"`;
  container.appendChild(commentContainer);
}
