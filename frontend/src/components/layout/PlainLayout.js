import { Link, Outlet } from 'react-router-dom';
import TextedLogo from '../header/TextedLogo';
import frontRoutes from '../../config/frontRoutes';

const PlainLayout = () => {
  return (
    <div className='plain-layout'>
      <header>
        <Link to={frontRoutes.home}>
          <TextedLogo redirect={frontRoutes.home} />
        </Link>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default PlainLayout;
