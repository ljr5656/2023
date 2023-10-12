import Button from '../button/button';
import styles from './index.module.css';

const ToolBar = () => {
  const setSelectTool = () => {};
  const setRectTool = () => {};
  const setPenTool = () => {};
  const setMoveTool = () => {};

  return (
    <div className={styles.container}>
      <Button.Group>
        <Button onClick={setSelectTool}>select</Button>
        <Button onClick={setRectTool}>rect</Button>
        <Button onClick={setPenTool}>pen</Button>
        <Button onClick={setMoveTool}>move</Button>
      </Button.Group>
    </div>
  );
};

export default ToolBar;
