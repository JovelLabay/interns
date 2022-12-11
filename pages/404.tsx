// REACT
import React from 'react';

// NEXT
import Image from 'next/image';

// ILLUSTRATION
import NotFoundIllustration from '../public/images/notFound/notFound.jpg';

function NotFound() {
  return (
    <div className="min-h-[70vh] flex justify-center items-center mt-[80px] md:mt-[100px] lg:mt-[110px]">
      <Image src={NotFoundIllustration} width={500} height={500} />
    </div>
  );
}

export default NotFound;
