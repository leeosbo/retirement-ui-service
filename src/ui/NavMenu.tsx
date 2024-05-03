import Link from 'next/link';
import classes from './NavMenu.module.css';
import { useContext } from 'react';
import { AuthContext } from '@/store/auth-context';

const NavMenu: React.FC<{
  onClickHandler?: () => void;
}> = (props) => {
  const { basicAuthToken } = useContext(AuthContext);

  if (basicAuthToken == '') {
    return (
      <nav className={`${classes.navigation} ${classes.desktop}`}>
        <Link
          href={`/login`}
          className={`${classes.link}`}
          onClick={props.onClickHandler}
        >
          Login
        </Link>
      </nav>
    );
  } else {
    return (
      <nav className={`${classes.navigation} ${classes.desktop}`}>
        <Link href={`/incomesources`} className={`${classes.link}`}>
          Income Sources
        </Link>
        <Link href={`/expenses`} className={`${classes.link}`}>
          Expenses
        </Link>
        <Link href={`/goals`} className={`${classes.link}`}>
          Goals
        </Link>
        <Link
          href={`/`}
          className={`${classes.link}`}
          onClick={props.onClickHandler}
        >
          Home
        </Link>
        <Link
          href={`/logout`}
          className={`${classes.link}`}
          onClick={props.onClickHandler}
        >
          Logout
        </Link>
      </nav>
    );
  }
};

export default NavMenu;
