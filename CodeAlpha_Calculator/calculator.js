let input = document.getElementById("inputbox");
let buttons = document.querySelectorAll("button");
let string = "";
let arr = Array.from(buttons);
// prints clicking operators on display
arr.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      string = eval(string);
      input.value = string;
    } else if (e.target.innerHTML == "AC") {
      string = "";
      input.value = string;
    } else if (e.target.innerHTML == "C") {
      string = string.substring(0, string.length - 1);
      input.value = string;
    } else {
      let value = e.target.innerHTML;
      if (value == "x") {
        string += "*";
      } else if (value == "÷") {
        string += "/";
      } else {
        string += value;
      }
      input.value = string;
    }
  });
});
// for getting result
document.addEventListener("keydown", function (event) {
  let key = event.key;
  if (key === "Enter") {
    event.preventDefault();
    if (string !== "") {
      string = eval(string);
      input.value = string;
    }
    return;
  }
  // operators events
  if (key === "Backspace") {
    event.preventDefault();
    string = string.substring(0, string.length - 1);// for delete last element on the display
    input.value = string;
    return;
  }
  if (key === "Escape") {
    event.preventDefault();
    string = "";
    input.value = string;
    return;
  }
  if (key === "Delete") {
    event.preventDefault();
    string = "";
    input.value = string;
    return;
  }
  if (key >= "0" && key <= "9") {
    event.preventDefault();
    string += key;
    input.value = string;
    return;
  }
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    event.preventDefault();
    string += key;
    input.value = string;
    return;
  }
  if (key === ".") {
    event.preventDefault();
    string += key;
    input.value = string;
    return;
  }
  if (key === "%") {
    event.preventDefault();
    string += key;
    input.value = string;
    return;
  }
});
