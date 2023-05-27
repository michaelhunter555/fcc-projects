marked.setOptions({
  break: true,
});

const renderer = marked.Renderer();

function App() {
  const [text, setText] = React.useState("");
  return (
    <div className="text-center px-4">
      <h1 className="p-4">Mike's Markdown App</h1>
      <textarea
        placeholder="start typing!"
        name="text"
        id="text"
        rows="10"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="textarea"
      />
      <h3 className="mt-3">Output</h3>
      <Preview markdown={text} />
    </div>
  );
}

function Preview({ markdown }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(markdown, { renderer: renderer }),
      }}
      id="preview"
    ></div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
