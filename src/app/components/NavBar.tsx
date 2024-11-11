'use client'
import { useRouter } from 'next/navigation';
import {links} from '@/app/types/links'

const NavBar: React.FC = () => {
  const router = useRouter();

  const buttonArr: links[] = [
    { text: "Log In", href: "/pages/logIn_or_register" },
    { text: "Books List", href: "/pages/booksList" },
    { text: "Cars List", href: "/pages/carsList" },
  ];

  return (
    <>
      <div className="bg-green-700 h-16 flex flex-row place-content-around items-center sm:bg-blue-500">
        <div className="text-white">My Website</div>
        <div className="text-white flex flex-row space-x-4 items-center">
          {buttonArr.map((button, index) => (
              <button key={index} onClick={() => router.push(button.href)}>{button.text}</button>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavBar;
