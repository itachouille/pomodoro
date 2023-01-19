import { useState, createContext } from "react";

export const SettingsContext = createContext();

const initialSettings = {
  work: 1500,
  short: 300,
  long: 1200,
  interval: 4,
  active: "work"
};

const SettingsContextProvider = ({ children }) => {
  const [pomodoro, setPomodoro] = useState(initialSettings.work);
  const [executing, setExecuting] = useState(initialSettings);

  function setCurrentTimer(active_state) {
    updateExecute({
      ...executing,
      active: active_state
    });
  }

  const updateExecute = (updatedSettings) => {
    setExecuting(updatedSettings);
    setTimerTime(updatedSettings);
  };

  const setTimerTime = (evaluate) => {
    switch (evaluate.active) {
      case "work":
        setPomodoro(evaluate.work);
        break;
      case "short":
        setPomodoro(evaluate.short);
        break;
      case "long":
        setPomodoro(evaluate.long);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setExecuting(initialSettings);
    setPomodoro(initialSettings.work);
  };

  const cleanTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <SettingsContext.Provider
      value={{
        pomodoro,
        setPomodoro,
        executing,
        updateExecute,
        setCurrentTimer,
        cleanTime,
        handleReset
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
