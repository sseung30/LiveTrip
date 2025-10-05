import Link from 'next/link';
import SocialIcons from './components/SocialIcons';

;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-8 px-6 md:py-10 md:px-20 lg:px-50">
      
      <div className="grid grid-cols-2 md:grid-cols-3 text-gray-500 gap-4">
        {/* 저작권*/}
        <div className="md:block text-sm text-gray-400 order-2 md:order-1">
            &copy;Part4_Team4 - {currentYear}
        </div>
        {/* 정책 */}
        <div className="col-span-2 space-x-4 order-1 justify-self-center md:order-2 md:col-span-1">
          <Link href="/privacy" className="text-gray-600">
            Privacy Policy
          </Link>
          <span className="text-gray-600">·</span>
          <Link href="/faq" className="text-gray-600">
            FAQ
          </Link>
        </div>
        {/* 소셜 */}
        <div className="order-3 justify-self-end">
            <SocialIcons />
        </div>
      </div>
    </footer>
  );
}