// REACT
import React from 'react';

// NEXT
import Image from 'next/image';

// IMAGES
import imageOne from 'public/images/service/one.png';
import imageTwo from 'public/images/service/two.png';
import imageThree from 'public/images/service/three.png';

// STATIC GENERAL DATA
import generalData from '@data/general.data.json';

function DescWithImage() {
  return (
    <div className="services-parent">
      {generalData.service.services.map((service, index) => {
        const isIdOdd = service.id % 2 === 0;
        return (
          <div
            key={index}
            className="services-description wrapper flex min-h-[500px] items-center justify-center py-8 md:py-12"
          >
            <div className="sub-container grid grid-cols-1 gap-6 text-center md:grid-cols-2 md:text-left">
              <div
                className={
                  isIdOdd
                    ? 'order-first flex items-center justify-center md:order-last'
                    : 'flex items-center justify-center'
                }
              >
                <Image
                  alt=""
                  src={
                    service.id === 1
                      ? imageOne
                      : service.id === 2
                      ? imageTwo
                      : imageThree
                  }
                  width={300}
                  height={300}
                />
              </div>
              <div className="my-10 flex items-center justify-center text-[20px] text-secondaryWhite md:my-0 md:text-[24px]">
                <p>{service.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DescWithImage;
