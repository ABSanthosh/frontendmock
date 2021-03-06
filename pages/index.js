import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export default function Home() {
  const [data, setData] = useState([]);

  var myHeaders = new Headers();
  myHeaders.append("X-API-Key", "J58PETue.wUPK28VtZCNnCCVxbtoFM7-UrvAANSTQb");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const fetchScore = () => {
    fetch(`https://nnbphj.deta.dev/get`, requestOptions)
      .then((response) => response.text())
      .then((result) => setData(JSON.parse(result)["allItems"]))
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   fetch("https://nnbphj.deta.dev/get", requestOptions)
  // .then((response) => response.text())
  //     .then((result) => {
  //       setData(JSON.parse(result)["allItems"]);
  //       console.log(JSON.parse(JSON.parse(result)["allItems"][0].Responses));
  //     })
  //     .catch((error) => console.log("error", error));

  // }, []);

  useEffect(() => {
    const timer = setInterval(fetchScore, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="HomeWrapper">
      <h1>LeaderBoard</h1>
      <h5>
        <i>
          {`The results are shown with a 8 sec interval. If you want current
          score, press "Fetch Data"`}
        </i>
      </h5>
      <button
        onClick={() => {
          fetchScore();
        }}
      >
        Fetch Data
      </button>
      <table>
        <thead>
          <tr>
            <td>Mail</td>
            <td>Responses</td>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.Mail}</td>
              <td>
                {/* Object data.Responses has Item and Response keys */}
                {JSON.parse(data.Responses).map((item, index) => (
                  <div key={index}>
                    <div>{item.Item}</div>
                    <div>{item.Response}</div>
                    <br />
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
