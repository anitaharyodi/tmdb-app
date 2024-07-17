// components/Navbar.tsx

import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-transparent py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-white text-xl font-bold"><span className='bg-red-600 px-2'>TMDB</span> App</p>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/favorites">
              <p className="text-white hover:border-b-2 border-red-600">Favorites</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
