import React, { useState, useEffect } from "react";
import MonacoEditor from "@uiw/react-monacoeditor";

function EditorWithCode(props) {
  const { codeText } = props;
  const [code, setCode] = useState(codeText);

  useEffect(() => {
    setCode(codeText);
  }, [codeText]);

  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: false,
    theme: "vs-dark",
    scrollbar: {
      // Subtle shadows to the left & top. Defaults to true.
      useShadows: false,
      // Render vertical arrows. Defaults to false.
      verticalHasArrows: true,
      // Render horizontal arrows. Defaults to false.
      horizontalHasArrows: true,
      // Render vertical scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      vertical: "auto",
      // Render horizontal scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      horizontal: "auto",
      verticalScrollbarSize: 17,
      horizontalScrollbarSize: 17,
      arrowSize: 30,
    },
  };
  //   editorDidMount(editor, monaco) {
  //     console.log("editorDidMount", editor, monaco);
  //     editor.focus();
  //   }
  const onChange = (newValue, e) => {
    console.log("onChange", newValue, e);
  };

  return (
    <MonacoEditor
      height="1000px"
      language="html"
      onChange={onChange}
      value={code}
      options={options}
    />
  );
}

export default EditorWithCode;
