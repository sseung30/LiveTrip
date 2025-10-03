import Link from 'next/link';
import Image from 'next/image';

import facebook from '@/components/footer/asset/facebook.svg';
import instagram from '@/components/footer/asset/instagram.svg';
import youtube from '@/components/footer/asset/youtube.svg';
import x from '@/components/footer/asset/X.svg';  


export default function SocialIcons() {
  return (
    <div className="flex space-x-4">
      <Link href="https://facebook.com" aria-label="Facebook">
        <Image src={facebook} alt="Facebook" width={20} height={20} className="w-5 h-5" />
      </Link>
      <Link href="https://instagram.com" aria-label="Instagram">
        <Image src={instagram} alt="Instagram" width={20} height={20} className="w-5 h-5" />
      </Link>
      <Link href="https://youtube.com" aria-label="Youtube">
        <Image src={youtube} alt="Youtube" width={20} height={20} className="w-5 h-5" />
      </Link>
      <Link href="https://x.com" aria-label="X (Twitter)">
        <Image src={x} alt="X (Twitter)" width={20} height={20} className="w-5 h-5" />
      </Link>
    </div>
  );
}