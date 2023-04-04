// REACT
import React from 'react';

// NEXT
import Image from 'next/image';

// ILLUSTRATION
import NotFoundIllustration from '../public/images/notFound/notFound.jpg';

function NotFound() {
  document.title = '404 Not Found';
  return (
    <div className="mt-[80px] flex min-h-[70vh] items-center justify-center md:mt-[100px] lg:mt-[110px]">
      <Image src={NotFoundIllustration} width={500} height={500} />
    </div>
  );
}

export default NotFound;
