import Image from 'next/image';
import Link from 'next/link';
import bellDefault from '@/components/header/asset/bell-default.svg';
import defaultProfileImg from '@/components/header/asset/default-profile-img.svg';
import logo from '@/components/header/asset/logo.svg';
import logoSymbol from '@/components/header/asset/logo-symbol.svg';


async function logoutAction() {
    'use server';
}

export default function Header() {
 // @TODO: 로그인 상태 판별 로직 필요
const isLoggedIn = true; 

  return (
    <header className="flex justify-between items-center h-12 md:h-20 px-6 md:px-50 border-b border-gray-100 bg-white">
        {/* 좌측 로고 영역 */}

        <Link href="/">
            <Image
            src={logoSymbol}
            alt="LiveTrip Logo"
            width={40}
            height={40}
            className="pr-4 md:hidden"
          />
            <Image
            src={logo}
            alt="LiveTrip Logo"
            width={140}
            height={20}
            className="hidden md:block pr-4"
          />
        </Link>

      {/* 우측 버튼/링크 영역 */}
      <nav className="flex items-center space-x-3 text-sm text-gray-950 pl-4" >
        
        {isLoggedIn ? (
          // ⭐️ 로그인 상태: Server Action을 이용한 로그아웃 폼
          <form action={logoutAction} className="flex items-center space-x-4">
            <button
             className="focus:outline-none items-center"
            >
            <Image 
            src={bellDefault} 
            alt="Notifications" 
            width={24} 
            height={24} 
            className="w-6 h-6"
            />
            </button>
            <div className="w-px h-4 bg-gray-100" /> {/* 구분선 */}
            <div id="profile" className="flex items-center space-x-2 cursor-pointer py-8">
            <Image 
            src={defaultProfileImg} 
            alt="Profile" 
            width={30} 
            height={30} 
            className="object-cover w-[30px] h-[30px] rounded-full"
            />
            <span className="font-medium">정만철</span> {/* 사용자 이름 표시 */}
            </div> 
          </form>
        ) : (
          // ⭐️ 로그아웃 상태: 로그인 및 회원가입 링크
          <>
            <Link href="/login" className="text-sm color-gray-950 px-2 py-2 md:px-4 md:py-3">
              로그인 
            </Link>
            <Link href="/signup" className="text-sm color-gray-950 px-2 py-2 md:px-4 md:py-3">
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}