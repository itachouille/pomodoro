import { useState, useContext } from "react";
import { SettingsContext } from "../Context/SettingsContext";
import Button from "./Button";

const Modal = ({ handleModal }) => {
  const { updateExecute } = useContext(SettingsContext);

  const [newTimer, setNewTimer] = useState({
    work: 25,
    short: 5,
    long: 20,
    interval: 4,
    active: "work"
  });

  const handleChange = (input) => {
    const { name, value } = input.target;
    setNewTimer((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const transformMinutes = (object) => {
    for (const name in object) {
      if (name === "work" || name === "short" || name === "long") {
        object[name] *= 60;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    transformMinutes(newTimer);
    updateExecute(newTimer);
    handleModal();
  };

  return (
    <div className="modal-background ">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">TIMER SETTING</div>
          <div>
            <Button title="X" _callback={handleModal} />
          </div>
        </div>
        <div className="modal-setter">
          <div>
            <span className="setting-span "> Times (minutes)</span>
          </div>
          <div className="setting-div">
            <div className="input-div">
              <label className="setting-label">Work</label>
              <input
                onChange={handleChange}
                name="work"
                className="setting-input"
                type="number"
                min="1"
                step="1"
                value={newTimer.work}
              />
            </div>
            <div className="input-div">
              <label className="setting-label">Short Break</label>
              <input
                onChange={handleChange}
                name="short"
                className="setting-input"
                type="number"
                min="1"
                step="1"
                value={newTimer.short}
              />
            </div>
            <div className="input-div">
              <label className="setting-label">Long Break</label>
              <input
                onChange={handleChange}
                name="long"
                className="setting-input"
                type="number"
                min="1"
                step="1"
                value={newTimer.long}
              />
            </div>
          </div>
        </div>
        <div className="modal-setter">
          <div className="timer-option ">
            <div>
              <span className="setting-span "> Long Break interval </span>
            </div>
            <input
              onChange={handleChange}
              name="interval"
              className="option-input"
              type="number"
              min="1"
              step="1"
              width="70"
              value={newTimer.interval}
            />
          </div>
        </div>
        <div className="modal-setter">
          <Button title="Set Timer" _callback={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
