import { FC, useState } from 'react';
import styles from './index.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  details?: string;
}

interface GroupProps {
  children: React.ReactNode;
}
const Button: FC<ButtonProps> & { Group: FC<GroupProps> } = ({
  children,
  onClick,
  details,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <button
        className={styles.button}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </button>
      {isHovered && details && <div className={styles.details}>{details}</div>}
    </div>
  );
};
const Group: FC<GroupProps> = ({ children }) => {
  return (
    <>
      <div className={styles['group-container']}>{children}</div>
    </>
  );
};

Button.Group = Group;

export default Button;
