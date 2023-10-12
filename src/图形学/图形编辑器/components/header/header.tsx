import ToolBar from '../toolBar/toolBar';
import styles from './index.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <ToolBar />
    </div>
  );
};

export default Header;
