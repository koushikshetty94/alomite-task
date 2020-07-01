advocateData = () => {
  var firstName = document.querySelector("#data");
  var parent = document.querySelector(".wrapper");
  var url = "https://cors-anywhere.herokuapp.com/https://fox-legum.herokuapp.com/api/v1/admin/AdvocateDeatils";
  console.log("hi");
  var advocate = fetch(url, {
    method: "GET",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.json())
    .then((data) =>
      data.advocate.map((entry) => {
        var div = document.createElement("div");
        div.className = "container my-container";
        div.innerHTML = `<div class="card">
          <div class="card-body">
            <span class="tag tag-teal">${
              entry.fname + " " + entry.lname
            }</span><br>
            <p>Enrollment No. :${entry.enrollNumber} </p>
            <p>Email : ${entry.email}</p>
            <p>Contact Number : ${entry.primaryPhoneNumber}</p>
            <p>Alternate Number : ${entry.alternatePhoneNumber}</p>
            <p>Address : ${entry.address} </p>
            <p>Pincode : ${entry.pincode} </p>
            <p>specialization : ${entry.specialization.map(a => a)} </p>

          </div>
           </div>`;
        parent.append(div);
        console.log(entry);
      })
    );
};
advocateData();
