var elemName = document.getElementById('imie');
var elemSecName = document.getElementById('nazwisko');
var elemPlace = document.getElementById('miejsce');
var elemRadio1 = document.getElementById('flexRadioDefault1');
var elemRadio2 = document.getElementById('flexRadioDefault2');
var feedbackRadio2 = document.getElementById('feedback-radio2');
var opony = document.getElementById('oponyZimowe');
var gwarancja = document.getElementById('gwarancja2');
var autoDetailing = document.getElementById('autoDetailing');
var totalPrice = document.getElementById('total-price');

const carsList = document.querySelector('.cars-list');

let cartItemID = 1;

eventListeners();

function eventListeners() {
    carsList.addEventListener('click', purchaseCar);
}

fetch("cars.json")
    .then(response => response.json())
    .then(data => {
        let html = '';
        data.forEach(myCar => {
            html += `
                <div>
                    <img id="imgTop" class="card-img-top" src="${myCar.imgSRC}" alt="Card image" style="width: 100%; height: 10rem;">
                    <div class="card-body border p-2">
                        <h4 class="card-title car-name">${myCar.name}</h4>
                        <h5 id="car-price" class="card-subtitle mt-1 text-muted">${myCar.price} zł</h5>
                        <ul class="list-group list-group-flush p-2">
                            <li class="list-group-item bg-light text-start" style="font-size: 14px;">${myCar.distance}</li>
                            <li class="list-group-item bg-light" style="font-size: 14px;">${myCar.year}</li>
                            <li class="list-group-item bg-light" style="font-size: 14px;">${myCar.power}</li>
                        </ul>
                        <button type="button" class="btn btn-primary buynow-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Kup teraz
                        </button>
                    </div>
                </div>
            `;
        });
        carsList.innerHTML = html;
    })

// 1. purchase car
function purchaseCar(e) {
    if (e.target.classList.contains('buynow-btn')) {
        let car = e.target.parentElement.parentElement;
        getCarInfo(car);
        addAccessoriesPrice();
    }
}

// 1.1 get car info after buynow-btn click
function getCarInfo(car) {
    let carInfo = {
        id: cartItemID,
        name: car.querySelector('.car-name').textContent,
        price: car.querySelector('#car-price').textContent,
    }
    cartItemID++;
    console.log(carInfo)
    addToForm((carInfo));
}

// 1.1.1 add to form car info (name, price, accessories)
function addToForm(car) {
    const nameItem = document.getElementById('select-name');
    nameItem.innerHTML = `${car.name}`;
    localStorage.setItem("carPrice", parseFloat(`${car.price}`));
}



// set current date + 14 days in form
let targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 14);
let dd = targetDate.getDate();
let mm = targetDate.getMonth() + 1;
let yyyy = targetDate.getFullYear();
if (mm < 10) {
    mm = "0" + mm;
}
if (dd < 10) {
    dd = "0" + dd;
}

let dateString = dd + "." + mm + "." + yyyy;
document.getElementById('date').setAttribute('value', dateString)



// validation form
function checkInvalid() {
    if (elemName.value == "" || elemName.value == null || /^[a-zA-Z]+$/.test(elemName.value) == false) {
        elemName.classList.add("is-invalid");
    } else {
        elemName.classList.remove("is-invalid");
    }
    if (elemSecName.value == "" || elemSecName.value == null || /^[a-zA-Z]+$/.test(elemSecName.value) == false) {
        elemSecName.classList.add("is-invalid");
    } else {
        elemSecName.classList.remove("is-invalid");
    }
    if (elemPlace.value == "" || elemPlace.value == null) {
        elemPlace.classList.add("is-invalid");
    } else {
        elemPlace.classList.remove("is-invalid");
    }
    if (elemRadio1.checked == false && elemRadio2.checked == false) {
        elemRadio1.classList.add("is-invalid");
        elemRadio2.classList.add("is-invalid");
        feedbackRadio2.innerHTML = ` * Proszę wybrać metodę płatności `;
    } else {
        elemRadio1.classList.remove("is-invalid");
        elemRadio2.classList.remove("is-invalid");
    }
}




// save data in local storage
function saveCarInStorage() {
    localStorage.setItem("firstName", elemName.value);
    localStorage.setItem("secondName", elemSecName.value);
    localStorage.setItem("place", elemPlace.value);
    if (flexRadioDefault1.checked == true) {
        localStorage.setItem("payment", 'leasing');
    }
    if (flexRadioDefault2.checked == true) {
        localStorage.setItem("payment", 'cash');
    }
}

//get data from storage
window.onload = function getCarFromStorage() {
    let getName = localStorage.getItem("firstName");
    let getsecName = localStorage.getItem("secondName");
    let getPlace = localStorage.getItem("place");
    let getPayment = localStorage.getItem("payment");
    if (getName == null) {
        return false;
    } else {
        elemName.setAttribute('value', getName);
    }
    if (getsecName == null) {
        return false;
    } else {
        elemSecName.setAttribute('value', getsecName);
    }
    if (getPlace == null) {
        return false;
    } else {
        elemPlace.setAttribute('value', getPlace);
    }
    if (getPayment == null) {
        return false;
    }
    if (getPayment == 'leasing') {
        elemRadio1.setAttribute('checked', '');
        elemRadio2.removeAttribute('checked', '');
    } else {
        elemRadio2.setAttribute('checked', '');
        elemRadio1.removeAttribute('checked', '');
    }
}




// add accessories price to total-price
function addAccessoriesPrice() {
    localStorage.setItem("opony", 0);
    localStorage.setItem("gwarancja2", 0);
    localStorage.setItem("autoDetailing", 0);
    if (opony.checked == true) {
        localStorage.setItem("opony", 2000);
    }
    if (gwarancja.checked == true) {
        localStorage.setItem("gwarancja2", 7000);
    }
    if (autoDetailing.checked == true) {
        localStorage.setItem("autoDetailing", 5000);
    }
    let getCarPrice = localStorage.getItem("carPrice");
    let getOpony = localStorage.getItem("opony");
    let getGwarancja = localStorage.getItem("gwarancja2");
    let getAutoDet = localStorage.getItem("autoDetailing");
    let getCarPriceAdd = parseFloat(getCarPrice) + parseFloat(getOpony) + parseFloat(getGwarancja) + parseFloat(getAutoDet);
    totalPrice.innerHTML = `${getCarPriceAdd} zł`;
}



// go to final form
function goToFinal() {
    if (elemName.value == "" || elemName.value == null || /^[a-zA-Z]+$/.test(elemName.value) == false || elemSecName.value == "" || elemSecName.value == null || /^[a-zA-Z]+$/.test(elemSecName.value) == false || elemPlace.value == "" || elemPlace.value == null || elemRadio1.checked == false && elemRadio2.checked == false) {
        console.log("zleeeeeeeeee");
    } else {
        openFinalForm();
    }
}

function openFinalForm() {
    let elemFinalBuy = document.getElementById('final-buy-btn');
    elemFinalBuy.setAttribute('data-bs-target', '#finalModal');
    elemFinalBuy.setAttribute('data-bs-toggle', 'modal');
    elemFinalBuy.click();
    let selectName = document.getElementById('select-name').textContent
    let deliveryDate = document.getElementById('date').value
    const elemHeaderFinal = document.getElementById('headerFinalModal');
    const elemDescFinal = document.getElementById('descFinal');
    elemHeaderFinal.innerHTML = `Dziękujemy za zakup ${selectName}!`;
    elemDescFinal.innerHTML = `Samochód zostanie dostarczony w dniu ${deliveryDate}`;


    localStorage.clear();
}