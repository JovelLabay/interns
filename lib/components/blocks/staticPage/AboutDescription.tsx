// REACT
import React from 'react';

// STATIC DATA
import { data } from 'Data';

// NEXT
import Image from 'next/image';

// IMAGES
import easy from 'public/images/about/easy.png';
import trust from 'public/images/about/trust.png';
import account from 'public/images/about/account.png';

import generalData from '@data/general.data.json';

function AboutDescription() {
  return (
    <div className="sub-container wrapper py-10 md:py-20">
      <div className="mx-10 grid grid-cols-1 gap-14 md:grid-cols-3 lg:mx-0">
        {generalData.learn_more.aboutDescriptions.map((service, index) => {
          return (
            <div
              key={index}
              className="flex h-[350px] flex-col items-center justify-center gap-10 rounded-xl bg-white shadow-boxShadowAbout duration-300 hover:-translate-y-5 hover:cursor-pointer"
            >
              <div className="flex h-[100px] w-[100px] items-center justify-center">
                <Image
                  alt=""
                  src={
                    service.title === 'Trust'
                      ? easy
                      : service.title === 'Easy'
                      ? trust
                      : account
                  }
                  width={300}
                  height={300}
                />
              </div>
              <p className="mx-14 text-center font-medium">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AboutDescription;
