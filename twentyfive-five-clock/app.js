const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    borderRadius: "25px",
    padding: "1rem",
    border: "1px solid black",
    backgroundColor: "#000",
    color: "#fff",
    margin: "0 1rem 0 1rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "1rem",
  },
  box: {
    height: "auto",
    width: "500px",
    border: "1px solid #e5e5e5",
    borderRadius: "20px",
    backgroundColor: "#30857b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: "4px",
  },
  time: {
    border: "3px solid white",
    borderRadius: "20px",
    display: "flex",
    padding: "5px 40px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};

const App = () => {
  const [sessionLength, setSessionLength] = React.useState(25);
  const [breakLength, setBreakLength] = React.useState(5);
  const [timerLabel, setTimerLabel] = React.useState("Session");
  const [timeLeft, setTimeLeft] = React.useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = React.useState(false);
  const [displayTime, setDisplayTime] = React.useState("");
  const intervalId = React.useState(null);
  const audioRef = React.useState(null);

  React.useEffect(() => {
    if (timerRunning) {
      intervalId.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) return prevTimeLeft - 1;

          if (prevTimeLeft === 0 && audioRef.current) {
            audioRef.current.play();
          }

          if (timerLabel === "Session") {
            setTimerLabel("Break");
            return breakLength * 60;
          } else {
            setTimerLabel("Session");
            return sessionLength * 60;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId.current);
    }
  }, [timerRunning, timerLabel, breakLength, sessionLength]);

  React.useEffect(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // format minutes and seconds to be always two digits
    let formattedMinutes = String(minutes).padStart(2, "0");
    let formattedSeconds = String(seconds).padStart(2, "0");

    // the formatted time to display
    let displayTime = `${formattedMinutes}:${formattedSeconds}`;
    setDisplayTime(displayTime);
  }, [timeLeft]);

  React.useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  const handleStartStop = () => {
    if (timerRunning) {
      clearInterval(intervalId.current);
    }
    setTimerRunning(!timerRunning);
  };

  const handleReset = () => {
    clearInterval(intervalId.current);
    setSessionLength(25);
    setBreakLength(5);
    setTimerLabel("Session");
    setTimeLeft(sessionLength * 60);
    setTimerRunning(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.buttonContainer}>
          <h1 id="break-label">Break Length</h1>
          <audio
            id="beep"
            ref={audioRef}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />

          <button
            id="break-decrement"
            style={styles.buttons}
            onClick={() => breakLength > 1 && setBreakLength(breakLength - 1)}
          >
            -
          </button>
          <span id="break-length">{breakLength}</span>
          <button
            id="break-increment"
            style={styles.buttons}
            onClick={() => breakLength < 60 && setBreakLength(breakLength + 1)}
          >
            +
          </button>
        </div>
        <div style={styles.buttonContainer}>
          <h1 id="session-label">Session Length</h1>
          <button
            id="session-decrement"
            style={styles.buttons}
            onClick={() =>
              sessionLength > 1 && setSessionLength(sessionLength - 1)
            }
          >
            -
          </button>
          <span id="session-length">{sessionLength}</span>
          <button
            id="session-increment"
            style={styles.buttons}
            onClick={() =>
              sessionLength < 60 && setSessionLength(sessionLength + 1)
            }
          >
            +
          </button>
        </div>
        <div style={styles.time}>
          <h1 id="timer-label">{timerLabel}</h1>
          <h2 id="time-left">{displayTime}</h2>
          <div style={styles.buttonContainer}>
            <button
              id="start_stop"
              style={styles.buttons}
              onClick={handleStartStop}
            >
              {timerRunning ? "Stop" : "Start"}
            </button>
            <button id="reset" style={styles.buttons} onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
