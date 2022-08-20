// NEXT
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

// REACT
import React from 'react';

// STATIC DATA
import { data } from '../Data';

// IMAGES
import homeImage from '../public/images/HomePic.png';

// ICONS
import { VscGraph } from 'react-icons/vsc';
import { FiPlayCircle } from 'react-icons/fi';
import { BiShoppingBag } from 'react-icons/bi';
import { MdOutlinePerson } from 'react-icons/md';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{data.meta.landingPage}</title>
        <meta
          name="description"
          content={data.meta.landingContentDescription}
        />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="wrapper lg:pt-28 md:pt-24 pt-20">
        <div className="sub-container min-h-screen">
          {/* FIRST */}
          <div className="grid md:grid-cols-3 sm:grid-cols-1 lg:mt-14 md:mt-10 mt-5 mx-0 md:mx-5 lg:mx-10">
            <div className="md:col-span-2 flex justify-center items-center mb-4 md:mb-0">
              <p className="lg:text-[64px] md:text-[44px] text-[28px] sm:text-[30px] font-medium">
                Get your most suited{' '}
                <span className="relative">
                  Internships
                  <span className="absolute bottom-1 md:bottom-2 lg:bottom-4 right-0 w-full bg-primaryYellow h-3 md:h-5 lg:h-7 -z-10" />
                </span>{' '}
                Now!
              </p>
            </div>
            <div className="flex justify-center items-center md:m-0 m-4">
              <Image src={homeImage} width={500} height={400} />
            </div>
          </div>

          {/* SECOND */}
          <div className="my-5 md:my-10 lg:my-14 mx-0 md:mx-5 lg:mx-10">
            <p className="lg:text-[24px] md:text-[20px] sm:text-[18px] text-secondaryWhite lg:w-6/12 md:w-9/12 w-full">
              Interns will help you find the most suited internship jobs for you
              in any of your field and expertse.
            </p>
            <Link href="/views/user/getstarted">
              <button className="bg-primaryYellow rounded px-8 py-2 font-medium lg:my-12 md:my-10 my-6">
                Get Stated
              </button>
            </Link>
          </div>

          {/* LAST */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-10 md:mb-14 lg:mb-20 gap-8 lg:mx-0 mx-10">
            {data.landingPage.featureDescriptions.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center h-[300px] bg-primaryYellow shadow-homeCustomShadow gap-10"
                >
                  <div className="bg-white rounded-full h-[80px] w-[80px] flex items-center justify-center">
                    {feature.iconName === 'VscGraph' ? (
                      <VscGraph size={30} />
                    ) : feature.iconName === 'FiPlayCircle' ? (
                      <FiPlayCircle size={30} />
                    ) : feature.iconName === 'BiShoppingBag' ? (
                      <BiShoppingBag size={30} />
                    ) : feature.iconName === 'MdOutlinePerson' ? (
                      <MdOutlinePerson size={30} />
                    ) : null}
                  </div>
                  <p className="text-center font-medium mx-10">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
