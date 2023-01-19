import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../Context/SettingsContext";
import Button from "./Button";

const Timer = () => {
  const {
    executing,
    setCurrentTimer,
    cleanTime,
    pomodoro,
    setPomodoro,
    handleReset
  } = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [countWorkInterval, setCountWorkInterval] = useState(0);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    let audio = new Audio("./Sounds/timesUp.mp3");
    const finish = () => {
      audio.play();
    };
    document.title = `Pomodoro -- ${executing.active} : ${cleanTime(pomodoro)}`;
    if (pomodoro >= 0 && isPaused === false) {
      const interval = setInterval(() => {
        setPomodoro(pomodoro - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else if (
      executing.active === "work" &&
      pomodoro === -1 &&
      isPaused === false &&
      countWorkInterval < executing.interval - 1
    ) {
      finish();
      setCurrentTimer("short");
      setCountWorkInterval((prevCount) => prevCount + 1);
    } else if (
      executing.active === "short" &&
      pomodoro === -1 &&
      isPaused === false &&
      countWorkInterval <= executing.interval - 1
    ) {
      finish();
      setCurrentTimer("work");
    } else if (
      executing.active === "work" &&
      pomodoro === -1 &&
      isPaused === false &&
      countWorkInterval === executing.interval - 1
    ) {
      finish();
      setCurrentTimer("long");
    }
  }, [
    executing,
    pomodoro,
    setPomodoro,
    isPaused,
    setCurrentTimer,
    countWorkInterval,
    cleanTime
  ]);

  return (
    <div className="timer-wrapper">
      <div className="timer-container">
        <div>
          <Button
            title="Work"
            activeClass={
              executing.active === "work" ? "active-label" : undefined
            }
            _callback={() => setCurrentTimer("work")}
          />
          <Button
            title="Short Break"
            activeClass={
              executing.active === "short" ? "active-label" : undefined
            }
            _callback={() => setCurrentTimer("short")}
          />
          <Button
            title="Long Break"
            activeClass={
              executing.active === "long" ? "active-label" : undefined
            }
            _callback={() => setCurrentTimer("long")}
          />
        </div>
        <div className="timer">{cleanTime(pomodoro)}</div>
        {isPaused ? (
          <Button title="Start" _callback={handlePause} />
        ) : (
          <Button title="Pause" _callback={handlePause} />
        )}
        <Button
          title="Reset"
          _callback={() => {
            handleReset();
            setIsPaused(true);
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
