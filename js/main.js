let mainData = document.getElementById("mainData");
let areaMain = document.getElementById("areaMain");
let ingredientsMain = document.getElementById("ingredientsMain");
let searchData = document.getElementById("searchData");
let searchSection = document.getElementById("search");
let detailsSec = document.getElementById("details");
let detailsMainSec = document.getElementById("mainDetails");
let searchNameInput = document.getElementById("searchName");
let searchLetterInput = document.getElementById("searchLetter");
const navSideWidth = $(".nav-side").outerWidth();
// let loadingSec = document.getElementById('loading');


$(".nav-side").css({ marginLeft: -navSideWidth });

const navLiWidth = $(".links li").innerWidth();
$(".links li").css({ left: -(navLiWidth + 50) });

// open side navbar
function openSideNav() {
  $(".nav-side").animate({ marginLeft: "0" }, 1000);
  $("#open-nav-side").css({ display: "none" });
  $("#close-nav-side").css({ display: "block" });

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          left: "0",
        },
        (i + 5) * 200
      );
  }
}

// close side navbar
function closeSideNav() {
  // console.log('ahmed');
  $(".nav-side").animate({ marginLeft: -navSideWidth }, 1000);
  $("#open-nav-side").css({ display: "block" });
  $("#close-nav-side").css({ display: "none" });

  $(".links li").animate({ left: -navLiWidth }, 1000);
}

$("#open-nav-side").click(openSideNav);

$("#close-nav-side").click(closeSideNav);

// get main meals
let finalData;
async function getMainData() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let data = await response.json();
  // loadingSec.classList.add('d-none');
  $(document).ready(function () {
    $("#loading").fadeOut(5000, function () {
      $("body").css("overflow", "visible");
    });
  });
  finalData = data.meals;
  // console.log(data)
  console.log(finalData);
  displayMainMeals(finalData);
}
getMainData();

//display main meals
function displayMainMeals(list) {
  let cartoona = "";

  for (let i = 0; i < list.length; i++) {
    cartoona += `
    <div class="col-md-3 ">
    <figure onclick="getMealDetails('${list[i].idMeal}')" class="position-relative rounded rounded-3 overflow-hidden c-pointer">
      <img src="${list[i].strMealThumb}" class="w-100" alt="">
      <figcaption class="position-absolute top-0 end-0 start-0 bottom-0 bg-white-70 text-dark d-flex align-items-center">
          <h3>${list[i].strMeal}</h3>
      </figcaption>
    </figure>
  </div> `;
  }

  mainData.innerHTML = cartoona;
  // console.log(cartoona);

  searchData.innerHTML = "";
  areaMain.innerHTML = "";
  ingredientsMain.innerHTML = "";
}

// get all categories

let finalCategories;
async function getCategories() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await response.json();
  finalCategories = data.categories;

  // console.log(data)
  // console.log(finalCategories)
  // displayCategories(finalCategories)
}
getCategories();

// categories
function displayCategories(list) {
  let cartoona = "";

  for (let i = 0; i < list.length; i++) {
    cartoona += `
      <div class="col-md-3 ">
      <figure onclick="filterByCategeries('${list[i].strCategory}')" class="position-relative rounded rounded-3 overflow-hidden c-pointer">
        <img src="${list[i].strCategoryThumb}" class="w-100" alt="">
        <figcaption class="position-absolute top-0 end-0 start-0 bottom-0 bg-white-70 text-dark d-flex align-items-center flex-column">
            <h3>${list[i].strCategory}</h3>
            <p class="meal-desc lead px-3">${list[i].strCategoryDescription}</p>
        </figcaption>
      </figure>
    </div> `;
  }

  mainData.innerHTML = cartoona;

  // search.innerHTML = "";
  areaMain.innerHTML = "";
  ingredientsMain.innerHTML = "";
}

// categories link inside navbar
$("#categories-link").click(function () {
  // console.log('ahmed');
  displayCategories(finalCategories);
  closeSideNav();
});

// search link inside navbar
$("#search-link").click(function () {
  searchSection.classList.remove("d-none");
  // displayCategories(finalCategories)
  mainData.innerHTML = "";
  // searchData.innerHTML = "";
  ingredientsMain.innerHTML = "";
  closeSideNav();
});

// get area

let finalArea;
async function getArea() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a="
  );
  let data = await response.json();
  finalArea = data.meals;
  // console.log(data)
  console.log("finalArea", finalArea);
  displayArea(finalArea);
}
// getArea();

//  display area
function displayArea(list) {
  let cartoona = "";

  for (let i = 0; i < list.length; i++) {
    cartoona += `
    <div onclick="filterByAreas('${list[i].strArea}')" class="col-lg-3 col-md-4 col-sm-6">
            <div class="inner rounded bg-info text-center c-pointer">
              <i class="fa-solid fa-house-laptop fa-4x mb-2"></i>
              <h3>${list[i].strArea}</h3>
            </div>
          </div>`;
  }

  areaMain.innerHTML = cartoona;

  mainData.innerHTML = "";
  // searchData.innerHTML = "";
  ingredientsMain.innerHTML = "";
}

// area link inside navbar
$("#area-link").click(function () {
  // console.log('ahmed');
  getArea();
  closeSideNav();
});

// get ingredients

let finalIngredients;
async function getIngredients() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=`
  );
  let data = await response.json();
  finalIngredients = data.meals;
  // console.log(data)
  // console.log(finalIngredients)
  displayIngredients(finalIngredients);
}
// getIngredients();

//  display ingredients
function displayIngredients(list) {
  let cartoona = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].strDescription != null && list[i].strDescription != "") {
      cartoona += `<div class="col-lg-4">
      <div class="inner c-pointer text-center text-white overflow-hidden" onclick="filterByIngreduands('${list[i].strIngredient}')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${list[i].strIngredient}</h3>
        <p class="ingredients-desc">${list[i].strDescription}</p>
      </div>
    </div>`;
    }
  }

  ingredientsMain.innerHTML = cartoona;

  mainData.innerHTML = "";
  // searchData.innerHTML = "";
  areaMain.innerHTML = "";
}

// ingredients link inside navbar
$("#ingredients-link").click(function () {
  // console.log('ahmed');
  getIngredients(finalIngredients);
  closeSideNav();
});

async function getMealDetails(rId) {
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${rId}`
  );
  let data = await respone.json();
  // console.log(data.meals);
  displayMealDetails(data.meals[0]);
  // علشان اعرض سيكشن التفاصيل
  // detailsSec.removeClass('d-none')
}

function displayMealDetails(meal) {
  let ricepes = ``;
  let tagsDesc = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ricepes += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
      tagsDesc += `<li class="alert alert-danger m-2 p-1">${
        meal[`strMeasure${i}`]
      }</li>`;
    }
  }

  cartoona = "";

  cartoona = `
    <div class="container">
      <header class="d-flex justify-content-between align-items-center py-1">
        <h2 class="text-light">Recipes details</h2>
        <button id="CloseBtn" class="btn-close btn-close-white"></button>
      </header>
    <div id="mainDetails" class="row py-5 text-white">
    <div class="col-md-4">
      <figure>
        <img class="w-100 bg-danger rounded-3" src="${meal.strMealThumb}" alt="" />
        <h3 class="text-white">${meal.strMeal}</h3>
      </figure>
      
    </div>
    <div class="col-md-8 text-light fw-bold ps-4">
      <h4> Instructions</h4>
      <p>${meal.strMealInstructions}</p>
      <h4>Area:  ${meal.strMealArea}    </h4>
      <h4>Category:    ${meal.strMealCategory}   </h4>
      <h4>Recipe ingredients:       </h4>
        <ul class="list-unstyled d-flex flex-wrap mb-3">
          ${ricepes}
        </ul>
        
      <h4>Tags:       </h4>
        <ul class="list-unstyled d-flex flex-wrap mb-4">
          ${tagsDesc}
        </ul>
      
  
      <a href="${meal.strSource}" target="_Blank" class="btn btn-success text-white mb-5">Source</a>
      <a href="${meal.strYoutube}" target="_Blank" class="btn btn-danger text-white mb-5">Youtube</a>
  
    </div>
  </div>
 `;
  detailsSec.innerHTML = cartoona;
  detailsSec.classList.remove("d-none");
  mainData.innerHTML = "";
  $("#CloseBtn").click(function () {
    detailsSec.innerHTML = "";
    getMainData();
  });
}

async function filterByCategeries(category) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  finalData = data.meals;
  // console.log(data)
  console.log(finalData);
  displayMainMeals(finalData);
}

async function filterByAreas(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await response.json();
  finalData = data.meals;
  // console.log(data)
  console.log(finalData);
  displayMainMeals(finalData);
}
async function filterByIngreduands(ingredient) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await response.json();
  finalData = data.meals;
  // console.log(data)
  console.log(finalData);
  displayMainMeals(finalData);
}
// search by name
async function searchByName() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchNameInput.value}`
  );
  let data = await response.json();
  finalData = data.meals;
  // console.log(data);
  // console.log(finalData);
  let cartoona = "";

  for (let i = 0; i < finalData.length; i++) {
    cartoona += `
    <div class="col-md-3 ">
    <figure onclick="getMealDetails('${finalData[i].idMeal}')" class="position-relative rounded rounded-3 overflow-hidden c-pointer">
      <img src="${finalData[i].strMealThumb}" class="w-100" alt="">
      <figcaption class="position-absolute top-0 end-0 start-0 bottom-0 bg-white-70 text-dark d-flex align-items-center">
          <h3>${finalData[i].strMeal}</h3>
      </figcaption>
    </figure>
  </div> `;
  }

  searchData.innerHTML = cartoona;

  mainData.innerHTML = "";
  areaMain.innerHTML = "";
  ingredientsMain.innerHTML = "";
}

// search by letter
async function searchByLetter() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchLetterInput.value}`
  );
  let data = await response.json();
  finalData = data.meals;
  console.log(data);
  console.log(finalData);
  let cartoona = "";

  for (let i = 0; i < finalData.length; i++) {
    cartoona += `
    <div class="col-md-3 ">
    <figure onclick="getMealDetails('${finalData[i].idMeal}')" class="position-relative rounded rounded-3 overflow-hidden c-pointer">
      <img src="${finalData[i].strMealThumb}" class="w-100" alt="">
      <figcaption class="position-absolute top-0 end-0 start-0 bottom-0 bg-white-70 text-dark d-flex align-items-center">
          <h3>${finalData[i].strMeal}</h3>
      </figcaption>
    </figure>
  </div> `;
  }

  searchData.innerHTML = cartoona;

  mainData.innerHTML = "";
  areaMain.innerHTML = "";
  ingredientsMain.innerHTML = "";
}

let inputName = document.getElementById("inputName");
let inputEmail = document.getElementById("inputEmail");
let inputPhone = document.getElementById("inputPhone");
let inputAge = document.getElementById("inputAge");
let inputPass = document.getElementById("inputPass");
let inputRepass = document.getElementById("inputRepass");
let submitBtn = document.getElementById("submitBtn");
let contactSection = document.getElementById("contact");

// contact link inside navbar
$("#contact-link").click(function () {
  // console.log('ahmed');
  contactSection.classList.remove("d-none");

  mainData.innerHTML = "";
  areaMain.innerHTML = "";
  ingredientsMain.innerHTML = "";
  searchData.innerHTML = "";
  closeSideNav();
});

function validateName() {
  regexName = /^[A-Za-z]{3,20}$/;
  if (regexName.test(inputName.value)) {
    inputName.classList.add("is-valid");
    return true;
  } else {
    Swal.fire({
      title: "Enter your name",
      text: "Enter at least 3 character and not include special character",
      icon: "error",
    });
    inputName.classList.remove("is-valid");
  }
}
function validateEmail() {
  regexEmail = /^[a-zA-Z0-9]{3,}(@gmail.com)$/;
  if (regexEmail.test(inputEmail.value)) {
    inputEmail.classList.add("is-valid");
    return true;
  } else {
    inputEmail.classList.remove("is-valid");
    Swal.fire({
      title: "Enter Your Email",
      text: `Enter at least 3 character or number and not include special character
      you must end by "@gmail.com" 
      EX ==> a11@gmail.com`,
      icon: "error",
    });
  }
}
function validatePhone() {
  regexPhone = /^01[0125][0-9]{8}$/;
  if (regexPhone.test(inputPhone.value)) {
    inputPhone.classList.add("is-valid");
    return true;
  } else {
    Swal.fire({
      title: "Enter Your Phone",
      text: ` EX ==> 01094291525`,
      icon: "error",
    });
    inputPhone.classList.remove("is-valid");
  }
}
function validateAge() {
  regexAge = /^(0?[1-9]|[1-9][0-9]|[1][0-9][0-9])$/;
  if (regexAge.test(inputAge.value)) {
    inputAge.classList.add("is-valid");
    return true;
  } else {
    Swal.fire({
      title: "Enter Your Age",
      icon: "error",
    });
    inputAge.classList.remove("is-valid");
  }
}
function validatePass() {
  regexPass = /^[a-zA-Z0-9!@#$%^&*]{1,}$/;
  if (regexPass.test(inputPass.value)) {
    inputPass.classList.add("is-valid");
    return inputPass.value;
  } else {
    Swal.fire({
      title: "Enter valid Pass",
      text: "Enter at least 1 character or number or (!,@,#,$,%,^,&,*) ",
      icon: "error",
    });
    inputPass.classList.remove("is-valid");
  }
}
function validateRepass() {
  regexRepass = /^[a-zA-Z0-9!@#$%^&*]{1,}$/;
  if (regexRepass.test(inputRepass.value)) {
    inputRepass.classList.add("is-valid");
    return inputRepass.value;
  } else {
    Swal.fire({
      title: "Enter your Repassword",
      // text: "Enter at least 1 character or number or (!,@,#,$,%,^,&,*) ",
      icon: "error",
    });
    inputRepass.classList.remove("is-valid");
  }
}

function allInputsValidate() {
  if (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateAge() &&
    validatePass() &&
    validateRepass()
  ) 
  if(validatePass() === validateRepass()){
    clearInputs();
    Swal.fire({
      icon: "success",
      title: "Congratulations",
    });

  }else{
    Swal.fire({
      title: "Confirm your Password and Repassword are typical , identical",
      icon: "error",
    });
  }
  
}

function clearInputs() {
  inputName.value = "";
  inputEmail.value = "";
  inputPhone.value = "";
  inputAge.value = "";
  inputPass.value = "";
  inputRepass.value = "";
  inputName.classList.remove("is-valid");
  inputEmail.classList.remove("is-valid");
  inputPhone.classList.remove("is-valid");
  inputAge.classList.remove("is-valid");
  inputPass.classList.remove("is-valid");
  inputRepass.classList.remove("is-valid");
}
