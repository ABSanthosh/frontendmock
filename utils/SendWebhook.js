export default function sendWebhookMessage() {
  var myHeaders = new Headers();
  myHeaders.append("X-API-Key", "J58PETue.wUPK28VtZCNnCCVxbtoFM7-UrvAANSTQb");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ Data: "Mock" }),
    redirect: "follow",
  };

  fetch("https://nnbphj.deta.dev/webhook", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
