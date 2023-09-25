import { getProduct, bugLength, renderProduct } from "./utils/getProduct.js";

let body = document.body;
let login = document.getElementById("login");
let box = document.createElement("div");
let form = document.createElement("form");
let user = document.createElement("input");
let pass = document.createElement("input");
let btnLog = document.createElement("button");
let error = document.createElement("p");
let userName;
let userPass;
let nick = document.createElement("a");
let userFromStorage = localStorage.getItem("user");
let userForRequest = JSON.parse(userFromStorage);
let btnOut = document.createElement("a");
let bug = document.createElement("a");
let bugCount = document.createElement("span");

export default bugCount;

bug.classList.add("bug");
bugCount.classList.add("bugCount");

bug.append(bugCount);

box.classList.add("box");
form.classList.add("form");
btnLog.classList.add("btnLog");

pass.type = "password";
btnLog.textContent = "Войти";
user.placeholder = "Введите логин";
pass.placeholder = "Введите пароль";

form.append(error, user, pass, btnLog);
box.append(form);

login.addEventListener("click", () => {
  body.prepend(box);
});

if (userForRequest) {
  userName = userForRequest;
  check();
}

function check() {
  box.remove();
  let log = document.getElementById("log");
  let img = document.createElement("img");

  log.innerHTML = "";
  nick.textContent = userName;
  img.src =
    "https://i.pinimg.com/1200x/d0/a2/e2/d0a2e243610bde1be54defdca162e47a.jpg";
  btnOut.textContent = "Выйти";
  btnOut.href = "./index.html";
  btnOut.classList.add("out");
  nick.classList.add("nick");
  img.classList.add("ava");

  log.append(bug, nick, img, btnOut);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userName = user.value.trim();
  userPass = pass.value.trim();

  try {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        for (const userInfo of json) {
          if (
            userInfo.username === userName &&
            userInfo.address.zipcode === userPass
          ) {
            check();
            localStorage.setItem("user", JSON.stringify(userName));
            app.style.display = "flex";
          }

          if (
            userInfo.username !== userName ||
            userInfo.address.zipcode !== userPass
          ) {
            error.textContent = "Неверный логин или пароль";
            error.style.color = "red";
          }
        }
      });
  } catch (errorFromServer) {
    console.log(errorFromServer);
  }
});

btnOut.addEventListener("click", () => {
  localStorage.clear();
  app.style.display = "none";
});

nick.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    fetch(`https://jsonplaceholder.typicode.com/users?username=${userName}`)
      .then((response) => response.json())
      .then((json) => {
        let title = document.head;
        console.log(title.children[2]);
        title.children[2].innerHTML = `${userName} profile`;
        console.log(json);
      });
  } catch (errorFromServer) {
    console.log(errorFromServer);
  } finally {
    console.log("success");
  }
});

let productResult = document.getElementById("productResult");
let categoriesBtn = document.querySelectorAll(".categories");

categoriesBtn.forEach((btn) =>
  btn.addEventListener("click", function () {
    categoriesBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");
    productResult.innerHTML = "";

    let request = `https://fakestoreapi.com/products/category/${this.id}`;
    getProduct(request);

    if (this.id == "") {
      getProduct("");
    }
  })
);

let find = document.getElementById("find");

find.addEventListener("input", function () {
  console.log(this.value);
});

let range = document.getElementById("range");

range.addEventListener("click", function () {
  console.log(this.value);
});

document.addEventListener("DOMContentLoaded", function () {
  getProduct("");
  bugLength();
});

bug.addEventListener("click", function () {
  app.innerHTML = "";
  let bugFromStorage = localStorage.getItem("bug");
  let tranformBug = JSON.parse(bugFromStorage);
  let keys = Object.values(tranformBug);
  console.log(keys);

  keys.map((item) => {
    renderProduct(item.product, item.quantity);
  });
});

/**
 * Реализовать функционал при котором если пользователь не авторизован то на экране он
 * видит приветсвенное сообщение с просьбой авторизоваться
 * после авторизации у него открывает наш магазин
 */
