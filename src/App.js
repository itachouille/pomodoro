import { useState } from "react";
import Modal from "./Components/Modal";
import Timer from "./Components/Timer";
import Button from "./Components/Button";
import "./styles.css";

const App = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleModal = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <div className="App">
      <div className="App-container">
        {modalVisibility && <Modal handleModal={handleModal} />}
        <div className="header">
          <h1>Pomodoro</h1>
          <Button title="Settings" _callback={handleModal} />
        </div>
        <Timer />
      </div>
    </div>
  );
};

export default App;
