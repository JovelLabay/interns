import React from 'react';

// STATIC DATA
import { data } from '../../../Data';

// NEXT
import Image from 'next/image';

// IMAGES
import ServiceRight from '../../../public/images/ServiceRight.png';
import ServiceLeft from '../../../public/images/ServiceLeft.png';

// BLOCKS
import DescWithImage from '@/src/components/blocks/DescWithImage';
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

      <main className="wrapper lg:pt-28 md:pt-24 pt-20 bg-primaryYellow">
        <div className="xl:mx-20 lg:mx-10">
          <div className="md:py-10 py-5 grid lg:grid-cols-3 md:grid-cols-1">
            <div className="hidden lg:flex justify-center items-center">
              <Image src={ServiceLeft} width={500} height={400} />
            </div>
            <div className="text-center md:mb-0 mb-10">
              <h3 className="text-white font-semibold md:text-[48px] text-[28px] mb-3">
                Our Services!
              </h3>
              <p className="md:mx-0 mx-10 text-secondaryWhite">
                The easiest hub for your suited Internships.
              </p>
            </div>
            <div className="flex justify-center items-center md:mx-0 mx-8">
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
