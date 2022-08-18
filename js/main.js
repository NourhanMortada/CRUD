
var nameInput = document.getElementById("ProductName");
var categoryInput = document.getElementById("ProductCategory");
var priceInput = document.getElementById("ProductPrice");
var descInput = document.getElementById("ProductDescription");
var tbody = document.getElementById("tbody");
var pnameAlert = document.getElementById("pnameAlert");



if (localStorage.getItem("allproducts") == null) {
  //new user
  productsList = [];
} else {
  //old user
  productsList = JSON.parse(localStorage.getItem("allproducts"));

  displayProducts();
}

function addProduct() {
  if (
    valditaeProductName() &&
    priceInput.value != "" &&
    categoryInput.value != "" &&
    descInput.value != ""
  ) {
    var oneProduct = {
      pname: nameInput.value,
      price: priceInput.value,
      category: categoryInput.value,
      description: descInput.value,
    };

    

    productsList.push(oneProduct);

    var x = JSON.stringify(productsList); 

    
    localStorage.setItem("allproducts", JSON.stringify(productsList)); 

    console.log(x.length);
    console.log(x);

    

    console.log(productsList);

    displayProducts(); //call
  } else {
    alert("please enter all fields");
  }

  //clearForm();
}

function clearForm() {
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  descInput.value = "";
}

function displayProducts() {
  var trs = "";

  for (var i = 0; i < productsList.length; i++) {
    trs += `<tr>
    <td>${i}</td>
    <td>${productsList[i].pname}</td>
    <td>${productsList[i].category}</td>
    <td>${productsList[i].price}</td>
    <td>${productsList[i].description}</td>
    <td>
      <button class="btn btn-outline-success">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
    </td>
    <td>
      <button  onclick='deleteProduct(${i})' class="btn btn-outline-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>`;
  }
  // :10 break

  tbody.innerHTML = trs;
}

function searchProduct() {
  var searchInput = document.getElementById("searchInput");
  console.log(searchInput.value);

  var trs = "";

  for (var i = 0; i < productsList.length; i++) {
    
    if (
      productsList[i].pname
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      trs += `<tr>
    <td>${i}</td>
    <td>${productsList[i].pname}</td>
    <td>${productsList[i].category}</td>
    <td>${productsList[i].price}</td>
    <td>${productsList[i].description}</td>
    <td>
      <button class="btn btn-outline-success">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
    </td>
    <td>
      <button class="btn btn-outline-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>`;
    }
  }

  tbody.innerHTML = trs;
}



function deleteProduct(index) {
  // alert("deleted!!!");

  productsList.splice(index, 1); 

  localStorage.setItem("allproducts", JSON.stringify(productsList));

  console.log(productsList);

  displayProducts(); 


}



function valditaeProductName() {
  var pnameRegex = /^[A-Z][a-z0-9 ]{3,20}$/;

 

  var pname = nameInput.value;

  if (/^[A-Z]/.test(pname) == true) {
    

    if (/[a-z0-9 ]{3,20}$/.test(pname) == true) {
      pnameAlert.classList.add("d-none");
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
      return true;
    } else {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
      pnameAlert.classList.remove("d-none");
      pnameAlert.innerHTML = "product name must between 3 : 20 char ";
      return false;
    }
  } else {
    //error
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    pnameAlert.classList.remove("d-none");
    pnameAlert.innerHTML = "please start width capital letter";

    

    return false;
  }
}


