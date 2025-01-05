import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
// import logo1 from '../../public/resLogo.png'; // Replace with the path to your first image
// import logo2 from '../../public/resImage.png'; // Replace with the path to your second image

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        {/* First Logo */}
        <Image 
          src="/resLogo.png"
          alt="Logo 1" 
          width={50} 
          height={50} 
          style={{ marginRight: '10px' }} // Adds spacing between the two logos
        />
        {/* Second Logo */}
        <Image 
          src="/tmg.png" 
          alt="Logo 2" 
          width={50} 
          height={50} 
        />
      </div>
      <button>
        <Link href="/my_bookings">All Bookings</Link>
      </button>
    </nav>
  );
}
