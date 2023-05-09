// REACT
import React from 'react';

// STATIC DATA
import { data } from '../../Data';

// NEXT
import Image from 'next/image';

// IMAGES
import ServiceRight from '@/assets/images/ServiceRight.png';
import ServiceLeft from '@/assets/images/ServiceLeft.png';

// BLOCKS
import DescWithImage from 'lib/components/blocks/staticPage/DescWithImage';
import Head from 'next/head';

function Service() {
  return (
    <div>
      <Head>
        <title>{`Interns | ${data.links.linkMenu[1].name}`}</title>
        <meta
          name="description"
          content={data.meta.landingContentDescription}
        />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="wrapper bg-primaryYellow pt-20 md:pt-24 lg:pt-28">
        <div className="lg:mx-10 xl:mx-20">
          <div className="grid py-5 md:grid-cols-1 md:py-10 lg:grid-cols-3">
            <div className="hidden items-center justify-center lg:flex">
              <Image src={ServiceLeft} width={500} height={400} />
            </div>
            <div className="mb-10 flex flex-col items-center justify-center md:mb-0">
              <h3 className="mb-5 text-[28px] font-semibold text-white md:text-[48px]">
                Our Services!
              </h3>
              <p className="mx-10 text-secondaryWhite md:mx-0">
                The easiest hub for your suited Internships.
              </p>
            </div>
            <div className="mx-8 flex items-center justify-center md:mx-0">
              <Image src={ServiceRight} width={500} height={380} />
            </div>
          </div>
        </div>
      </main>

      <DescWithImage />
    </div>
  );
}

export default Service;
