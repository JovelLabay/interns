import { data } from 'Data';
import React from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { FiPlayCircle } from 'react-icons/fi';
import { MdOutlinePerson } from 'react-icons/md';
import { VscGraph } from 'react-icons/vsc';

import Image from 'next/image';

import easy from 'public/images/about/easy.png';
import trust from 'public/images/about/trust.png';
import account from 'public/images/about/account.png';

function AboutDescription() {
  return (
    <div className="sub-container wrapper md:py-20 py-10">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-14 lg:mx-0 mx-10">
        {data.aboutDescriptions.map((service, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center h-[350px] bg-white shadow-boxShadowAbout gap-10 rounded-xl"
            >
              <div className="h-[100px] w-[100px] flex items-center justify-center">
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
              <p className="text-center font-medium mx-14">
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
