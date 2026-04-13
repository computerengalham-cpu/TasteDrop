//  Home JS - main.js
document.addEventListener("DOMContentLoaded", function () {

  //  Load Popular Dishes
  fetch("data/data.json")
    .then(res => res.json())
    .then(data => {
      const dishesDiv = document.getElementById("dishes");
      data.menu.slice(0, 4).forEach(item => {
        dishesDiv.innerHTML += `
          <div class="col-md-3">
            <div class="card p-3 mb-3">
            <img src="${item.image}" class="card-img-top mb-2" style="height:150px; object-fit:cover;" alt="${item.name}">
              <h5>${item.name}</h5>
              <span class="badge bg-primary">${item.category}</span>
              <p>${item.price} OMR</p>
              <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})" class="btn btn-success">
                Add to Cart
              </button>
            </div>
          </div>
        `;
      });
    })
    .catch(err => console.log("ERROR:", err));

  //  Init Cart Count
  updateCartCount();

});

//  Add to Cart
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1; 
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

//  Update Cart Count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalItems;
}

//  Dark Mode
function toggleDark() {
  document.body.classList.toggle("dark");
  const icon = document.getElementById("theme-icon");
  if (document.body.classList.contains("dark")) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
}

//  Load Dark Theme if saved
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
