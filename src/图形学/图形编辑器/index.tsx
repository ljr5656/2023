import { Editor } from './editor';
import { Rect } from './sceneGraph/graph/rect';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, useRef, createContext } from 'react';
import styles from './index.module.css';
import ZoomBar from './components/zoomBar/zoomBar';
import PropsBar from './components/propsBar/propsBar';
import GraphList from './components/graphList/graphList';
import Header from './components/header/header';
import { EditorContext } from './context';
const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  useEffect(() => {
    const editor = new Editor(containerRef.current!);
    setEditor(editor);
    (window as any).editor = editor;
    const rect = new Rect({
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    });

    editor.sceneGraph.addElements([rect]);
    editor.render();
  }, [containerRef]);
  return (
    <div className={styles.container}>
      <EditorContext.Provider value={editor}>
        <Header />
        <div className={styles.body}>
          <GraphList />
          <div
            style={{ flex: 1, position: 'relative' }}
            ref={containerRef}
          ></div>
          <PropsBar />
          <ZoomBar />
        </div>
      </EditorContext.Provider>
    </div>
  );
};

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
