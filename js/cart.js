//  Initialize cart and discount
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;
const deliveryFee = 1.5;

//  Render Cart
function renderCart() {
  const container = document.getElementById("cart-container");

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    updateTotals();
    updateCartCount();
    return;
  }

  let html = `<table class="table table-striped">
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Subtotal</th>
      <th>Action</th>
    </tr>`;

  cart.forEach(item => {
    html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>
          <button onclick="changeQty(${item.id}, -1)" class="btn btn-sm btn-danger">-</button>
          ${item.quantity}
          <button onclick="changeQty(${item.id}, 1)" class="btn btn-sm btn-success">+</button>
        </td>
        <td>${(item.price * item.quantity).toFixed(2)}</td>
        <td>
          <button onclick="removeItem(${item.id})" class="btn btn-danger btn-sm">Remove</button>
        </td>
      </tr>`;
  });

  html += "</table>";
  container.innerHTML = html;

  updateTotals();
  updateCartCount();
}

// Change Quantity
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity < 1) item.quantity = 1;

  saveCart();
}

//  Remove Item
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

//  Save Cart & Re-render
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

//  Update Totals
function updateTotals() {
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  let total = subtotal + deliveryFee;

  if (discount > 0) {
    total = total - (total * discount / 100);
  }

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);
}

//  Update Cart Count
function updateCartCount() {
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  document.getElementById("cart-count").innerText = totalItems;
}

//  Apply Promo
function applyPromo() {
  const code = document.getElementById("promo").value.trim().toUpperCase();
  if (code === "TASTE10") {
    discount = 10;
    alert("Promo applied! 10% off");
  } else {
    discount = 0;
    alert("Invalid promo code");
  }
  updateTotals();
}

//  Payment Radio Show/Hide Card
document.querySelectorAll("input[name='payment']").forEach(radio => {
  radio.addEventListener("change", () => {
    const cardInput = document.getElementById("card");
    if (radio.value === "card" && radio.checked) cardInput.classList.remove("d-none");
    else cardInput.classList.add("d-none");
  });
});

//  Checkout Form
document.getElementById("checkout-form").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const payment = document.querySelector("input[name='payment']:checked").value;
  const card = document.getElementById("card").value.trim();

  if (!name || !address || !phone) return alert("Fill all fields");
  if (!/^\d+$/.test(phone)) return alert("Phone must be numbers only");
  if (payment === "card" && !/^\d{16}$/.test(card)) return alert("Card must be 16 digits");
  if (cart.length === 0) return alert("Your cart is empty!");

  //  Confirmation
  const orderId = Math.floor(10000 + Math.random() * 90000);
  document.getElementById("confirmation").innerHTML = `
    <div class="alert alert-success">
      <h4>Order Confirmed!</h4>
      <p>Order ID: ${orderId}</p>
      <p>ETA: 35 minutes</p>
      <p>Items Ordered: ${cart.map(i => i.name + " x" + i.quantity).join(", ")}</p>
    </div>
  `;

  // Clear Cart
  localStorage.removeItem("cart");
  cart = [];
  discount = 0;
  renderCart();
});

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

//  Initial Render
document.addEventListener("DOMContentLoaded", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
});