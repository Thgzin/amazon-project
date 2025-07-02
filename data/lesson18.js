function getMessageXHR() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
  });
  xhr.open("GET", "https://supersimplebackend.dev/greeting");
  xhr.send();
}
//getMessageXHR();

function getMessageFetch() {
  try {
    fetch("https://supersimplebackend.dev/greeting")
      .then((response) => response.text())
      .then((data) => console.log(data));
  } catch (error) {
    console.log(error);
  }
}
//getMessageFetch();

async function getMessageAsyncAwait() {
  try {
    await new Promise((resolve) => {
      fetch("https://supersimplebackend.dev/greeting")
        .then((response) => response.text())
        .then((data) => console.log(data));
      resolve();
    });
  } catch (error) {
    console.log(error);
  }
}
//getMessageAsyncAwait();

async function getName(name) {
  const url = "https://supersimplebackend.dev/greeting";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });

  const data = await res.text();
  console.log(data);
}
//getName("th");

async function corsError() {
  try {
    const res = await fetch("https://amazon.com");
    const text = res.text;
    console.log(text);
  } catch (error) {
    console.log("CORS error");
  }
}
//corsError();

async function postError() {
  try {
    const url = "https://supersimplebackend.dev/greeting";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status >= 400) {
      throw res;
    }

    const data = await res.text();
    console.log(data);
  } catch (error) {
    if (error.status === 400) {
      const errorMessage = await error.json();
      console.log(errorMessage);
    } else {
      console.log("Network error. Please try again later.");
    }
  }
}
postError();
