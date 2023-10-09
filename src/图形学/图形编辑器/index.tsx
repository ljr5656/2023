import { Editor } from './editor';
import { Rect } from './sceneGraph/graph/rect';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, useRef, RefObject } from 'react';
import styles from './index.module.css';

const App = () => {
  const container = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  useEffect(() => {
    const editor = new Editor(container.current!);
    setEditor(editor);

    const rect = new Rect({
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    });

    editor.sceneGraph.addElements([rect]);
    editor.render();
  }, []);
  return (
    <>
      <div id={styles.container} ref={container}></div>;<button></button>
      <button
        onClick={() =>
          editor?.sceneGraph.setTranslate(editor?.sceneGraph.translateX + 10)
        }
      >
        left
      </button>
      <button
        onClick={() =>
          editor?.sceneGraph.setTranslate(editor?.sceneGraph.translateX - 10)
        }
      >
        right
      </button>
      <button
        onClick={() =>
          editor?.sceneGraph.setTranslate(editor?.sceneGraph.translateY + 10)
        }
      >
        top
      </button>
      <button
        onClick={() =>
          editor?.sceneGraph.setTranslate(editor?.sceneGraph.translateY - 10)
        }
      >
        bottom
      </button>
      <button
        onClick={() =>
          editor?.sceneGraph.setTranslate(editor?.sceneGraph.translateX + 10)
        }
      >
        +
      </button>
      <button
        onClick={() =>
          editor?.sceneGraph.setTranslate(editor?.sceneGraph.translateX + 10)
        }
      >
        -
      </button>
    </>
  );
};

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
