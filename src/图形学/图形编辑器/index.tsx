import { Editor } from './Editor';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';

const App = () => {
  const container = useRef<HTMLElement>(null);
  const [editor, setEditor] = useState<Editor>(null);
  useEffect(() => {
    const editor = new Editor(container.current);
    setEditor(editor);
  }, []);
  return <div id={styles.container} ref={container}></div>;
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);
