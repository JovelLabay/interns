// REACT
import React from 'react';

// NEXT
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// STATIC DATA
import { data } from '../Data';

// IMAGES
import homeImage from '../public/images/HomePic.png';

import generalData from '@data/general.data.json';

// ICONS
import { VscGraph } from 'react-icons/vsc';
import { FiPlayCircle } from 'react-icons/fi';
import { BiShoppingBag } from 'react-icons/bi';
import { MdOutlinePerson } from 'react-icons/md';

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

      <main className="wrapper pt-20 md:pt-24 lg:pt-28">
        <div className="sub-container min-h-screen">
          {/* FIRST */}
          <div className="mx-0 mt-5 grid sm:grid-cols-1 md:mx-5 md:mt-10 md:grid-cols-3 lg:mx-10 lg:mt-14">
            <div className="mb-4 flex items-center justify-center md:col-span-2 md:mb-0">
              <p className="text-[28px] font-medium sm:text-[30px] md:text-[44px] lg:text-[64px]">
                Get your most suited{' '}
                <span className="text-primaryYellow drop-shadow-2xl">
                  Internships
                </span>{' '}
                Now!
              </p>
            </div>
            <div className="m-4 flex items-center justify-center md:m-0">
              <Image src={homeImage} width={500} height={400} />
            </div>
          </div>

          {/* SECOND */}
          <div className="my-5 mx-0 md:my-10 md:mx-5 lg:my-14 lg:mx-10">
            <p className="w-full text-secondaryWhite sm:text-[18px] md:w-9/12 md:text-[20px] lg:w-6/12 lg:text-[24px]">
              Practicum Coordinators can manage students to easily. Send Emails,
              Toggle switch to notify students about their internship statues.
              Efficient submissions and viewing of required documents
            </p>
            <Link href="/user/getstarted">
              <button className="my-6 rounded-full bg-primaryYellow px-8 py-2 font-medium duration-300 hover:scale-105 md:my-10 lg:my-12 ">
                Get Started
              </button>
            </Link>
          </div>

          {/* LAST */}
          <div className="mx-10 mb-10 grid grid-cols-1 gap-8 md:mb-14 md:grid-cols-2 lg:mx-0 lg:mb-20 lg:grid-cols-4">
            {generalData.home.featureDescriptions.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="box-shadow flex h-[300px] flex-col items-center justify-center gap-10 bg-primaryYellow"
                >
                  <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white">
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
                  <p className="mx-10 text-center font-medium">
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
