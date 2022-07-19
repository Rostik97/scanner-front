import './App.css';
import TotalPrice from "./TotalPriceComponent/TotalPrice";
import React, {useState} from "react";
import ScanComponent from "./ScanComponent/ScanComponent";

function App() {

    const [resultValue, setResultValue] = useState(null)


    return (
        <div className="App">
            <div className="Content">
                <ScanComponent setResultValue={setResultValue}/>
                <TotalPrice resultValue={resultValue}/>
            </div>
        </div>
    );
}

export default App;
