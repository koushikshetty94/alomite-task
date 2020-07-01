var submitButton = document.querySelector("#submitAdvData");
var select = document.querySelector("select");
var addSel = document.querySelector(".add_select");
var append = document.querySelector(".select_append");
var selects = [];

addSel.addEventListener("click", select1);
function select1() {
  if (select.options[select.selectedIndex].value == "Others") {
    var othersInput = document.querySelector(".otherSel");
    othersInput.style.display = "block";
    if (othersInput.childNodes[1].childNodes[1].value !== "") {
      if (selects.includes(othersInput.childNodes[1].childNodes[1].value)) {
      } else {
        selects.push(othersInput.childNodes[1].childNodes[1].value);
        append.innerHTML = "";
        selects.map((a) => {
          var input = document.createElement("input");
          input.className = "selected";
          input.type = "button";
          input.value = a;
          input.addEventListener("click", (e) => {
            filter(e);
          });
          append.append(input);
        });
        othersInput.childNodes[1].childNodes[1].value = "";
        othersInput.style.display = "none";
        function filter(e) {
          selects = selects.filter((x) => {
            if (x != e.target.value) {
              return x;
            }
          });
          append.innerHTML = "";
          selects.map((a) => {
            var input = document.createElement("input");
            input.className = "selected";
            input.type = "button";
            input.value = a;
            input.addEventListener("click", (e) => {
              filter(e);
            });
            append.append(input);
          });
        }
      }
    }
  } else if (select.options[select.selectedIndex].value !== "") {
    if (selects.includes(select.options[select.selectedIndex].value)) {
    } else {
      selects.push(select.options[select.selectedIndex].value);
      append.innerHTML = "";
      selects.map((a) => {
        var input = document.createElement("input");
        input.className = "selected";
        input.type = "button";
        input.value = a;
        input.addEventListener("click", (e) => {
          filter(e);
        });
        append.append(input);
      });
      function filter(e) {
        selects = selects.filter((x) => {
          if (x != e.target.value) {
            return x;
          }
        });
        append.innerHTML = "";
        selects.map((a) => {
          var input = document.createElement("input");
          input.className = "selected";
          input.type = "button";
          input.value = a;
          input.addEventListener("click", (e) => {
            filter(e);
          });
          append.append(input);
        });
      }
    }
  }
}

function handleSubmit() {
  var input = Array.from(document.querySelectorAll("input "));

  var data = input.map((a) => {
    var obj = {};
    obj[`${a.parentElement.parentElement.childNodes[1].id}`] = a.value;
    return obj;
  });
  var newObj = Object.assign(...data);
  delete newObj["Address"];
  delete newObj[""];
  newObj["gender"] = `${
    Array.from(document.querySelectorAll("input[type=radio]")).filter((a) => {
      if (a.checked) {
        return a;
      }
    })[0].value
  }`;
  var addressNode = document.querySelector(".address").childNodes;
  newObj["address"] = `${
    addressNode[3].children[0].value +
    "\n" +
    addressNode[7].children[0].value +
    "\n" +
    addressNode[11].children[0].value +
    "\n" +
    addressNode[15].children[0].value
  }`;

  newObj["specialization"] = selects;
  return newObj;
}

submitButton.addEventListener("click", (e) => {
  var arr = [];
  e.preventDefault();
  var input = Array.from(document.querySelectorAll("input"));
  input.forEach((a) => {
    if (a.value == "") {
      var submitFinal = document.querySelector(".submit_final");
      submitFinal.style.color = "red";
      submitFinal.innerText = "Input all Fields First";
      arr.push(false);  
    } else {
      arr.push(true);
    }
  });
  if (!arr.includes(false)) {
    if (selects[0]) {
      var submitFinal = document.querySelector(".submit_final");
      var url = "https://cors-anywhere.herokuapp.com/https://fox-legum.herokuapp.com/api/v1";
      fetch(url, {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(handleSubmit()),
      }).then(res => res.json()).then((res) => {
        if (res.status != 200) {
          submitFinal.style.color = "Red";
          submitFinal.innerText = "Duplicate Email/Data";
        } else if (res.status == 200) {
          submitFinal.style.color = "green";
          submitFinal.innerText = "Success";
        }
      });
    } else {
      var submitFinal = document.querySelector(".submit_final");
      submitFinal.style.color = "red";
      submitFinal.innerText = "Add any Specialized Practitions";
    }
  } else {
    var submitFinal = document.querySelector(".submit_final");
    submitFinal.style.color = "red";
    submitFinal.innerText = "Input all Fields First";
  }
});
