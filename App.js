import "./App.css";
import Header from "./components/Header";
import UserInput from "./components/Inputs/UserInput";
import WeightInput from "./components/Inputs/WeightInput";
import HeightInput from "./components/Inputs/HeightInput";
import Result from "./components/Result";
import Info from "./components/Info";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./components/UI/Button";
function App() {
  //Local Storage data
  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const [localUser, setLocalUser] = useState(null);
  // User datas
  const [user, setUser] = useState("");
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();

  // Info button
  const [info, setInfo] = useState(false);

  const handleUser = (name) => {
    setUser(name);
  };

  const handleWeight = (data) => {
    setWeight(data);
  };

  const handleHeight = (data) => {
    setHeight(data);
  };

  const toggleInfo = () => {
    setInfo(!info);
  };

  // Set local storage data
  const handleLocal = (bmi) => {
    var obj = {
      name: user,
      bmi,
    };
    localStorage.setItem("user", JSON.stringify(obj));
  };
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          exact
          element={
            localUser === null ? (
              <UserInput handleUser={handleUser} />
            ) : (
              <>
                <h4>Welcome Back {localUser.name}</h4>
                <h3 className="bmi_title">Your last BMI: {localUser.bmi}</h3>
                <Button onClick={() => setLocalUser(null)}>Recalculate</Button>
              </>
            )
          }
        />
        <Route
          path="/weight"
          element={<WeightInput handleWeight={handleWeight} />}
        />
        <Route
          path="/height"
          element={<HeightInput handleHeight={handleHeight} />}
        />
        <Route
          path="/result"
          element={
            <Result
              user={user}
              weight={weight}
              height={height}
              handleLocal={handleLocal}
            />
          }
        />
      </Routes>

      {info && <Info onClick={toggleInfo} />}
      <Button className="info_btn" onClick={toggleInfo}>
        What's BMI?
      </Button>
    </div>
  );
}

export default App;
