// REACT
import React from 'react';

// NEXT
import Image from 'next/image';

// STATIC DATA
import { data } from 'Data';

// IMAGES
import imageOne from 'public/images/service/one.png';
import imageTwo from 'public/images/service/two.png';
import imageThree from 'public/images/service/three.png';

function DescWithImage() {
  return (
    <div className="services-parent">
      {data.services.map((service, index) => {
        const isIdOdd = service.id % 2 === 0;
        return (
          <div
            key={index}
            className="services-description wrapper min-h-[500px] py-8 md:py-12 flex justify-center items-center"
          >
            <div className="sub-container grid md:grid-cols-2 grid-cols-1 gap-6 text-center md:text-left">
              <div
                className={
                  isIdOdd
                    ? 'order-first md:order-last flex items-center justify-center'
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
              <div className="md:my-0 my-10 flex items-center justify-center md:text-[24px] text-[20px] text-secondaryWhite">
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
