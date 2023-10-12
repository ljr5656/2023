import { useContext, useEffect } from 'react';
import Button from '../button/button';
import styles from './index.module.css';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { EditorContext } from '../../context';

const ZoomBar = () => {
  const editor = useContext(EditorContext);
  useEffect(() => {}, [editor]);
  const zoomIn = () => {
    editor?.actionManager.viewportZoomIn();
  };
  const zoomOut = () => {
    editor?.actionManager.viewportZoomOut();
  };
  const zoomReset = () => {
    editor?.actionManager.viewportZoomReset();
  };
  const undo = () => {};
  const redo = () => {};

  return (
    <div className={styles.container}>
      <Button.Group>
        <Button onClick={zoomOut}>
          <MinusOutlined />
        </Button>
        <Button onClick={zoomReset}>100%</Button>
        <Button onClick={zoomIn}>
          <PlusOutlined />
        </Button>
      </Button.Group>

      <Button onClick={undo}>
        <ArrowLeftOutlined />
      </Button>
      <Button onClick={redo}>
        <ArrowRightOutlined />
      </Button>
    </div>
  );
};

export default ZoomBar;
