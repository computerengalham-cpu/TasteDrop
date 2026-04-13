let menu = [];
let filteredMenu = [];

document.addEventListener("DOMContentLoaded", function () {

  //  Load Menu Data
  fetch("data/data.json")
    .then(res => res.json())
    .then(data => {
      menu = data.menu;
      filteredMenu = [...menu];
      renderMenu(menu);
    })
    .catch(err => console.log("ERROR:", err));

  //  Search
  document.getElementById("search").addEventListener("keyup", function () {
    const value = this.value.toLowerCase();
    const result = filteredMenu.filter(item => item.name.toLowerCase().includes(value));
    renderMenu(result);
  });

  //  Sort
  document.getElementById("sort").addEventListener("change", function () {
    const value = this.value;
    const sorted = [...filteredMenu];
    if (value === "low") sorted.sort((a, b) => a.price - b.price);
    else if (value === "high") sorted.sort((a, b) => b.price - a.price);
    renderMenu(sorted);
  });

  //  Init
  updateCartCount();
});

//  Render Menu Items
function renderMenu(items) {
  const container = document.getElementById("menu-items");
  container.innerHTML = "";

  items.forEach(item => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card p-3 mb-3">
        <img src="${item.image}" class="card-img-top mb-2" style="height:250px; object-fit:cover;" alt="${item.name}">
          <h5>${item.name}</h5>
          <p>${item.description}</p>
          <span class="badge bg-primary">${item.category}</span>
          <h6>${item.price} OMR</h6>

          <div class="d-flex align-items-center mb-2">
            <button onclick="changeQty(${item.id}, -1)" class="btn btn-sm btn-danger">-</button>
            <span id="qty-${item.id}" class="mx-2">1</span>
            <button onclick="changeQty(${item.id}, 1)" class="btn btn-sm btn-success">+</button>
          </div>

          <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})" class="btn btn-success">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

//  Change Quantity
function changeQty(id, change) {
  const el = document.getElementById(`qty-${id}`);
  let qty = parseInt(el.innerText);
  qty += change;
  if (qty < 1) qty = 1;
  el.innerText = qty;
}

//  Add to Cart
function addToCart(id, name, price) {
  const qty = parseInt(document.getElementById(`qty-${id}`).innerText);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += qty; // يزيد الكمية لو موجود
  } else {
    cart.push({ id, name, price, quantity: qty });
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

//  Filter by Category
function filterCategory(category) {
  filteredMenu = category === "All" ? [...menu] : menu.filter(item => item.category === category);
  renderMenu(filteredMenu);
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