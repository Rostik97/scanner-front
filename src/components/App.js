import './App.css';
import Scan from "./ScanComponent/ScanComponent";
import TotalPrice from "./TotalPriceComponent/TotalPrice";
import React, {useState} from "react";

function App() {

    const [resultValue, setResultValue] = useState(null)


    return (
        <div className="App">
            <header className="App-header">
                <h1>SMART SCANNER</h1>
            </header>
            <div className="Content">
                <Scan setResultValue={setResultValue}/>
                <TotalPrice resultValue={resultValue}/>
            </div>
        </div>
    );
}

export default App;
