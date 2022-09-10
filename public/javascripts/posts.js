if (document.readyState !== "loading") {
  initializeCodePosts();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCodePosts();
  });
}

function initializeCodePosts() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || undefined;

  loadPosts(page);
}

function loadPosts(page = 0) {
  fetch(`/api/recipes/${page}`)
    .then((response) => response.json())
    .then(({ items, page, pages }) => {
      renderPosts(items);
      renderPagination(page, pages);
    });
}

function renderPagination(currentPage, totalPageCount) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";
  for (let i = 0; i < totalPageCount; i++) {
    renderPageButton(container, i, i === currentPage);
  }
}

function renderPageButton(container, pageNumber, isCurrent) {
  const li = document.createElement("li");
  li.classList.add(isCurrent ? "active" : "waves-effect");
  const a = document.createElement("a");
  a.innerText = pageNumber + 1;
  a.href = pageNumber ? "/?page=" + pageNumber : "/";
  li.appendChild(a);
  container.appendChild(li);
}

function renderPosts(posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";
  for (const post of posts) {
    renderPost(container, post);
  }
}

function renderPost(container, postData) {
  let postCardDiv = document.createElement("div");
  postCardDiv.classList.add('post');
  let postTitle = document.createElement("div");
  postTitle.classList.add('post-title');
  const postTitleLink = document.createElement("a");
  postTitleLink.href = `/post.html?id=${postData._id}`;
  postTitleLink.innerText = postData.name || "Untitled Post";
  postTitle.appendChild(postTitleLink);
  postCardDiv.appendChild(postTitle);

  if (postData.categories.length) {
    const categories = document.createElement("div");
    categories.classList.add('categories');
    categories.innerText =
      "Categories: " +
      postData.categories.map((category) => category.name).join(", ");
    postCardDiv.appendChild(categories);
  }

  if (postData.ingredients.length) {
    const ingredients = document.createElement("p");
    ingredients.classList.add('ingredients');
    ingredients.innerText = "Snippet: " + postData.ingredients.join(", ");
    postCardDiv.appendChild(ingredients);
  }

  if (postData.instructions.length) {
    const instructions = document.createElement("p");
    instructions.classList.add('instructions');
    instructions.innerText =
      "Text description: " + postData.instructions.join(", ");
    postCardDiv.appendChild(instructions);
  }

  if (postData.images.length) {
    const imagesContainer = document.createElement("div");

    for (image of postData.images) {
      const img = document.createElement("img");
      img.src = `/api/images/${image}`;
      img.classList.add('image-to-index');
      imagesContainer.appendChild(img);
    }

    postCardDiv.appendChild(imagesContainer);
  }

  const commentsConatiner = document.createElement("div");
  commentsConatiner.classList.add('commentsConatiner');
  const commentsTitle = document.createElement("h5");
  commentsTitle.innerText = "Comments";
  commentsConatiner.appendChild(commentsTitle);

  renderComments(commentsConatiner, postData.comments);
  postCardDiv.appendChild(commentsConatiner);

  container.appendChild(postCardDiv);
}

function renderComments(container, comments) {
  for (const comment of comments) {
    renderComment(container, comment);
  }
}

function renderComment(container, comment) {
  const commentContainer = document.createElement("div");
  commentContainer.classList.add('commentContainer');
  commentContainer.innerText = `${comment.createdBy.email} on ${new Date(
    comment.commentedOn
  ).toLocaleString()} commented: \n ${comment.commentBody}`;
  container.appendChild(commentContainer);
}
