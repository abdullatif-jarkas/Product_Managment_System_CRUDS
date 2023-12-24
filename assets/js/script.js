let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
// Get Total

let priceArr = [price, taxes, ads, discount];
priceArr.forEach((el) => {
  el.addEventListener("keyup", getTotal);
});
function getTotal() {
  if (price.value != "") {
    let result =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

// Create Product

let productArr;
if (localStorage.product != null) {
  productArr = JSON.parse(localStorage.product);
} else {
  productArr = [];
}
submit.addEventListener("click", create);
function create() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if(
    title.value != '' &&
    price.value != '' && 
    category.value != '' &&
    newProduct.count < 100
    ){
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productArr.push(newProduct);
        }
      } else {
        productArr.push(newProduct);
      }
    } else {
      productArr[tmp] = newProduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(productArr));
  showData();
}

// Clear inputs

function clearData() {
  let clearArr = [title, price, taxes, ads, discount, count, category];
  clearArr.forEach((el) => {
    el.value = "";
  });
  total.innerHTML = "";
}

// Read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < productArr.length; i++) {
    table += `
      <tr>
        <td>${i+1}</td>
        <td>${productArr[i].title}</td>
        <td>${productArr[i].price}</td>
        <td>${productArr[i].taxes}</td>
        <td>${productArr[i].ads}</td>
        <td>${productArr[i].discount}</td>
        <td>${productArr[i].total} $</td>
        <td>${productArr[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
    `;
  }
  let deleteAllBtn = document.getElementById("deleteAll");
  if (productArr.length > 0) {
    deleteAllBtn.innerHTML = `
        <button onclick="deleteAll()">delete All (${productArr.length})</button>
      `;
  } else {
    deleteAllBtn.innerHTML = "";
  }
  document.getElementById("tbody").innerHTML = table;
}
showData();

// Delete
function deleteData(i) {
  productArr.splice(i, 1);
  localStorage.product = JSON.stringify(productArr);
  showData();
}
function deleteAll() {
  localStorage.clear();
  productArr.splice(0);
  showData();
}
// Update

function updateData(i) {
  title.value = productArr[i].title;
  price.value = productArr[i].price;
  taxes.value = productArr[i].taxes;
  ads.value = productArr[i].ads;
  discount.value = productArr[i].discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  category.value = productArr[i].category;
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMood = "Title";
function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id === "search-title") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";

  for (let i = 0; i < productArr.length; i++) {
    if (searchMood == "Title") {
      if (productArr[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${productArr[i].title}</td>
            <td>${productArr[i].price}</td>
            <td>${productArr[i].taxes}</td>
            <td>${productArr[i].ads}</td>
            <td>${productArr[i].discount}</td>
            <td>${productArr[i].total}</td>
            <td>${productArr[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
        `;
      }
    } else {
      if (productArr[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${productArr[i].title}</td>
            <td>${productArr[i].price}</td>
            <td>${productArr[i].taxes}</td>
            <td>${productArr[i].ads}</td>
            <td>${productArr[i].discount}</td>
            <td>${productArr[i].total}</td>
            <td>${productArr[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// Clean Data
