function addRecord() {
  let id = document.getElementById("id").value.trim();
  let model = document.getElementById("model").value.trim();
  let price = document.getElementById("price").value.trim();

  if (id.length != 0 && model.length != 0 && price.length != 0 ) {
      fetch("http://localhost:3000/vehicleRepository").then(
          res => {
              res.json().then(data => {
                  data.forEach((d) => {
                      if (d.id == id) {
                          alert("The ID is already existed!");
                      }
                  })
                  var record = {
                      "id": id.trim(),
                      "Model": model,
                      "Price": price,
                  }

                  fetch("http://localhost:3000/vehicleRepository", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(record)
                  })
              })
          }
      )
  
     
  }
  else {
      alert("Fields cannot be empty!")
    
  }

}

function updateRecord() {
  var idOfUpdate = document.getElementById("id").value;
  if (idOfUpdate.length == 0) {
    alert("If you want to update must be specify id of record !!....");
  } else {
    fetch("http://localhost:3000/vehicleRepository/" + idOfUpdate).then(
      (res) => {
        res.json().then((data) => {
          var model = document.getElementById("model").value;
          var price = document.getElementById("price").value;
          if (model != "" && price != "") {
            let record = {
              id: idOfUpdate,
              Model: model,
              Price: price,
            };
            fetch("http://localhost:3000/vehicleRepository/" + idOfUpdate, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(record),
            }).then((jSonData) => {
              console.log(jSonData);
            });
          } else if (model == "" && price != "") {
            let record = {
              id: idOfUpdate,
              Model: data.Model,
              Price: price,
            };
            fetch("http://localhost:3000/vehicleRepository/" + idOfUpdate, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(record),
            }).then((jSonData) => {
              console.log(jSonData);
            });
          } else if (model != "" && price == "") {
            let record = {
              id: idOfUpdate,
              Model: model,
              Price: data.Price,
            };
            fetch("http://localhost:3000/vehicleRepository/" + idOfUpdate, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(record),
            }).then((jSonData) => {
              console.log(jSonData);
            });
          }
        });
      }
    );
  }
}

function deleteRecord() {
  if (
    id.value.length == 0 &&
    model.value.length == 0 &&
    price.value.length == 0
  ) {
    var result = confirm("You want to delete all the records");
    if (result) {
      fetch("http://localhost:3000/vehicleRepository").then((data) => {
        data.json().then((jsonData) => {
          for (var i = 0; i < jsonData.length; i++) {
            console.log(jsonData[i]["id"]);
            fetch(
              "http://localhost:3000/vehicleRepository/" + jsonData[i]["id"],
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }
        });
      });
    }
  } else {
    fetch("http://localhost:3000/vehicleRepository/" + id.value, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }
}
function findRecord() {
  if (
    id.value.length == 0 &&
    model.value.length == 0 &&
    price.value.length == 0
  ) {
    alert("You need to input specify property in order to search");
  } else if (
    id.value.length > 0 &&
    model.value.length == 0 &&
    price.value.length == 0
  ) {
    findById(document.getElementById("id").value);
  } else if (
    id.value.length == 0 &&
    model.value.length > 0 &&
    price.value.length == 0
  ) {
    findByModel(document.getElementById("model").value);
  } else if (
    id.value.length == 0 &&
    model.value.length == 0 &&
    price.value.length > 0
  ) {
    findByPrice(document.getElementById("price").value);
  }
  document.forms[0].reset();
}
function findById(proID) {
  fetch("http://localhost:3000/vehicleRepository/" + proID).then((data) => {
    data.json().then((jsonData) => {
      if (jsonData.id === undefined) {
        alert("Your data is not available in table");
      } else if (jsonData.id > 0) {
        var temp = "";
        temp += "<tr>";
        temp += "<td>" + jsonData.id + "</td>";
        temp += "<td>" + jsonData.Model + "</td>";
        temp += "<td>" + jsonData.Price + "</td>";
        temp += "</tr>";
        document.getElementById("data").innerHTML = temp;
      }
    });
  });
  document.forms[0].reset();
}
function findByModel(proModel) {
  fetch("http://localhost:3000/vehicleRepository?Model=" + proModel).then(
    (data) => {
      data.json().then((jsonData) => {
        if (jsonData[0] != undefined) {
          var temp = "";
          for (var i = 0; i < jsonData.length; i++) {
            temp += "<tr>";
            temp += "<td>" + jsonData[i]["id"] + "</td>";
            temp += "<td>" + jsonData[i]["Model"] + "</td>";
            temp += "<td>" + jsonData[i]["Price"] + "</td>";
            temp += "</tr>";
          }
          document.getElementById("data").innerHTML = temp;
        } else {
          alert("Your data is not available in table");
        }
      });
    }
  );
  document.forms[0].reset();
}
function findByPrice(proPrice) {
  fetch("http://localhost:3000/vehicleRepository?Price=" + proPrice).then(
    (data) => {
      data.json().then((jsonData) => {
        if (jsonData[0] != undefined) {
          var temp = "";
          for (var i = 0; i < jsonData.length; i++) {
            temp += "<tr>";
            temp += "<td>" + jsonData[i]["id"] + "</td>";
            temp += "<td>" + jsonData[i]["Model"] + "</td>";
            temp += "<td>" + jsonData[i]["Price"] + "</td>";
            temp += "</tr>";
          }
          document.getElementById("data").innerHTML = temp;
        } else {
          alert("Your data is not available in table");
        }
      });
    }
  );
  document.forms[0].reset();
}
function reviewAll() {
  fetch("http://localhost:3000/vehicleRepository").then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.length > 0) {
        var temp = "";
        data.forEach((info) => {
          temp += "<tr>";
          temp += "<td>" + info.id + "</td>";
          temp += "<td>" + info.Model + "</td>";
          temp += "<td>" + info.Price + "</td>";
          temp += "</tr>";
        });
        document.getElementById("data").innerHTML = temp;
      }
    });
  });
  document.forms[0].reset();
}
function modelSort() {
  fetch("http://localhost:3000/vehicleRepository?_sort=Model").then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.length > 0) {
        var temp = "";
        data.forEach((info) => {
          temp += "<tr>";
          temp += "<td>" + info.id + "</td>";
          temp += "<td>" + info.Model + "</td>";
          temp += "<td>" + info.Price + "</td>";
          temp += "</tr>";
        });
        document.getElementById("data").innerHTML = temp;
      }
    });
  });
}
function defaults() {
  fetch("http://localhost:3000/vehicleRepository").then((res) => {
    res.json().then((data) => {
      if (data.length > 0) {
        var temp = "";
        data.forEach((info) => {
          temp += "<tr>";
          temp += "<td>" + info.id + "</td>";
          temp += "<td>" + info.Model + "</td>";
          temp += "<td>" + info.Price + "</td>";
          temp += "</tr>";
        });
        document.getElementById("data").innerHTML = temp;
      }
    });
  });
}
function priceSort() {
  fetch("http://localhost:3000/vehicleRepository").then((res) => {
    res.json().then((data) => {
      const sortedResponse = data.sort(function (a, b) {
        return parseInt(a.Price) - parseInt(b.Price);
      });
      if (sortedResponse.length > 0) {
        var temp = "";
        sortedResponse.forEach((info) => {
          temp += "<tr>";
          temp += "<td>" + info.id + "</td>";
          temp += "<td>" + info.Model + "</td>";
          temp += "<td>" + info.Price + "</td>";
          temp += "</tr>";
        });
        document.getElementById("data").innerHTML = temp;
      }
    });
  });
}
function idSort() {
  fetch("http://localhost:3000/vehicleRepository").then((res) => {
    res.json().then((data) => {
      const sortedResponse = data.sort(function (a, b) {
        return parseInt(a.id) - parseInt(b.id);
      });
      if (sortedResponse.length > 0) {
        var temp = "";
        sortedResponse.forEach((info) => {
          temp += "<tr>";
          temp += "<td>" + info.id + "</td>";
          temp += "<td>" + info.Model + "</td>";
          temp += "<td>" + info.Price + "</td>";
          temp += "</tr>";
        });
        document.getElementById("data").innerHTML = temp;
      }
    });
  });
}
fetch("http://localhost:3000/vehicleRepository").then((res) => {
  res.json().then((data) => {
    if (data.length > 0) {
      var temp = "";
      data.forEach((info) => {
        temp += "<tr>";
        temp += "<td>" + info.id + "</td>";
        temp += "<td>" + info.Model + "</td>";
        temp += "<td>" + info.Price + "</td>";
        temp += "</tr>";
      });
      document.getElementById("data").innerHTML = temp;
    }
  });
});
