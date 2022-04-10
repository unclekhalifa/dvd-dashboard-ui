import "./App.css";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `http://api.worldbank.org/v2/countries/GB/indicators/SP.POP.TOTL?per_page=5000&format=json`
    )
      .then((response) => response.json())
      .then((result) => {
        let sortedData = result[1]
          .sort((a, b) => +a.date - +b.date)
          .map((entry) => ({ ...entry, date: +entry.date }));
        setData(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App dark:bg-slate-900">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold dark:text-white text-center">
          Hello world!
        </h1>
        {data.length === 0 ? <p>Loading data ...</p> : <BarChart data={data} />}
      </div>
    </div>
  );
}

export default App;
