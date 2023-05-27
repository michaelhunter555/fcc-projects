const buttons = [
  { id: "clear", value: "AC", width: "160px" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "zero", value: 0, width: "160px" },
  { id: "decimal", value: "." },
  { id: "equals", value: "=", height: "130px", position: "absolute" },
];

const App = () => {
  const [formula, setFormula] = React.useState("");
  const [currentValue, setCurrentValue] = React.useState("0");
  const [lastPressedEquals, setLastPressedEquals] = React.useState(false);

  const isOperator = (val) => {
    return ["+", "-", "/", "x"].includes(val);
  };

  const handleClick = (val) => {
    if (isOperator(val)) {
      if (lastPressedEquals) {
        setLastPressedEquals(false);
        setFormula(currentValue + val);
      } else {
        const lastChar = formula[formula.length - 1];
        const secondToLastChar = formula[formula.length - 2];
        if (isOperator(lastChar) && isOperator(secondToLastChar)) {
          setFormula(formula.slice(0, -2) + val);
        } else if (isOperator(lastChar)) {
          if (val === "-" && lastChar !== "-") {
            setFormula(formula + val);
          } else {
            setFormula(formula.slice(0, -1) + val);
          }
        } else {
          setCurrentValue("");
          setFormula(formula + val);
        }
      }
      return;
    }

    switch (val) {
      case "AC":
        setFormula("");
        setCurrentValue("0");
        setLastPressedEquals(false);
        break;
      case "=":
        try {
          const result = eval(formula.replace(/x/g, "*"));
          setCurrentValue(result.toString());
          setFormula(result.toString());
          setLastPressedEquals(true);
        } catch (e) {
          setCurrentValue("Error");
          setFormula("");
          setLastPressedEquals(false);
        }
        break;
      case ".":
        if (currentValue.includes(".")) {
          return;
        }

        if (isOperator(formula[formula.length - 1]) || lastPressedEquals) {
          setCurrentValue("0" + val);
          setFormula(formula + "0" + val);
          setLastPressedEquals(false);
        } else {
          setCurrentValue(currentValue + val);
          setFormula(formula + val);
        }
        break;
      default:
        if (
          currentValue === "0" ||
          currentValue === "Error" ||
          lastPressedEquals
        ) {
          setCurrentValue(val.toString());
          setFormula(val.toString());
          setLastPressedEquals(false);
        } else {
          setCurrentValue(currentValue + val);
          setFormula(formula + val);
        }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        id="calculator"
        style={{
          border: "2px solid #47476b",
          padding: "5px",
          background: "black",
          width: "320px",
          color: "white",
          position: "relative",
        }}
      >
        {/*formula screen*/}
        <div
          id="formulaScreen"
          style={{
            minHeight: "20px",
            fontSize: "20px",
            color: "white",
            textAlign: "right",
            verticalAlign: "text-top",
            wordWrap: "break-word",
          }}
        ></div>
        {formula}
        {/*outputScreen*/}
        <div
          id="display"
          style={{
            fontSize: "29px",
            color: "white",
            textAlign: "right",
            lineHeight: "35px",
          }}
        >
          {currentValue}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "5px",
          }}
        >
          {buttons.map((item, i) => (
            <button
              id={item.id}
              key={i}
              onClick={() => handleClick(item.value)}
              style={{
                height: item.value === "=" ? "100%" : "65px",
                width: ["AC", "0"].includes(item.value) ? "100%" : "auto",
                color: "black",
                outline: "1px solid black",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                gridColumnStart: ["AC", "/"].includes(item.value)
                  ? "span 2"
                  : "auto",
              }}
              value={item.value}
            >
              {item.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
//

ReactDOM.render(<App />, document.getElementById("app"));
