import { useState } from "react";

function App() {
  const [editor, setEditor] = useState("");

  const handleChange = (e) => {
    setEditor(e.target.value);
  };

  const convertToHtml = (markdown) => {
    // Convert markdown to HTML here
    const lines = markdown.split("\n");
    console.log(lines);
    const htmlLines = lines.map((line) => {
      return switcher(line);
    });
    return htmlLines.join("");
  };
 
  const switcher = (line) => {
    if (line.startsWith("# ")) {
      return `<h1>${line.slice(2)}</h1>`;
    } else if (line.startsWith("## ")) {
      return `<h2>${line.slice(3)}</h2>`;
    } else if (line.startsWith("### ")) {
      return `<h3>${line.slice(4)}</h3>`;
    }
    else
      return escapeHtml(line);
  };

  const escapeHtml = (text) => {
    const htmlEntities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;", 
      
      // &apos; is not supported in HTML4
    };
    text=text.replace(/[&<>"']/g, (entity) => htmlEntities[entity]);
    
    return text;
  };
  return (
    <div className="container flex">
      <div className="editor border">
        <div className="flex editor-content">
          <div className="flex editor-header">
            <div>
              <i class="fa-brands fa-free-code-camp"></i>
              <span>Editor</span>
            </div>
            <i class="fa-solid fa-maximize"></i>
          </div>
          <textarea
            name="editor"
            id="editor"
            cols={60}
            value={editor}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <div className="previewer border">
        <div className="flex editor-header">
          <div>
            <i class="fa-brands fa-free-code-camp"></i>
            <span>Previewer</span>
          </div>
          <i class="fa-solid fa-maximize"></i>
        </div>
        <div className="previewer-content" id="preview">
          <div dangerouslySetInnerHTML={{ __html: convertToHtml(editor) }} />
        </div>
      </div>
    </div>
  );
}

export default App;
