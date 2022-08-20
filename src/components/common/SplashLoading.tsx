import { motion } from 'framer-motion';
import React from 'react';

function SplashLoading() {
  const loading3 = [1, 2, 3];
  return (
    <div className="h-screen flex flex-col items-center justify-around bg-white">
      <div>
        <p className="text-[54px] font-bold text-black">
          <span className="text-primaryYellow">I</span>
          nterns
        </p>
      </div>
      <div className="text-center">
        <div className="flex flex-row gap-5 justify-center">
          {loading3.map((_, index) => {
            return (
              <motion.div
                key={index}
                className="box h-5 w-5 bg-primaryYellow rounded"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: index === 0 ? 0.5 : index === 1 ? 1 : 1.5,
                }}
              />
            );
          })}
        </div>
        <p className="text-teriaryWhite mt-5">
          Developed by Eluvent Corporation
        </p>
      </div>
    </div>
  );
}

export default SplashLoading;
