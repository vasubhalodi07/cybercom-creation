const BASEURL = "https://reqres.in/api/users";

function handleError(xhr, message) {
  if (xhr.status >= 400 && xhr.status < 600) {
    console.error(message, xhr.status, xhr.statusText);
  } else {
    console.error("Network error occurred:", xhr.statusText);
  }
}

function fetchAllRecords() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${BASEURL}?page=2`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
      } else {
        handleError(xhr, "Response error:");
      }
    }
  };
  xhr.onerror = function () {
    handleError(xhr, "Network error occurred:");
  };
  xhr.send();
}

function fetchRecordById(recordId) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${BASEURL}/${recordId}`, true);
  xhr.onload = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      if (xhr?.responseText) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
      }
    }
  };
  xhr.send();
}

function addRecord(body) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", `${BASEURL}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
    }
  };
  xhr.send(body);
}

function updateRecord(newBody, id) {
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", `${BASEURL}/${id}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
    }
  };
  xhr.send(newBody);
}

function updateParticularRecord(newBody, id) {
  let xhr = new XMLHttpRequest();
  xhr.open("PATCH", `${BASEURL}/${id}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
    }
  };
  xhr.send(newBody);
}

function removeRecord(id) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", `${BASEURL}/${id}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 204) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
}

fetchAllRecords();
fetchRecordById(2);
addRecord({
  name: "morpheus",
  job: "leader",
});
updateRecord(
  {
    name: "morpheus",
    job: "zion resident",
  },
  2
);
updateParticularRecord(
  {
    name: "morpheus",
    job: "zion resident",
  },
  2
);
removeRecord(2);
