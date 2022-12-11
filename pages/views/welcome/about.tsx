// REACT
import React from 'react';

// NEXT
import Head from 'next/head';

// COMPONENTS
import AboutDescription from '@/src/components/blocks/AboutDescription';
import InputBox from '@/src/components/common/InputBox';

// STATIC DATA
import { data } from '../../../Data';

// REACT ICONS
import { TbSend } from 'react-icons/tb';

function about() {
  const [value, setValue] = React.useState<string | number>('');

  const textBoxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>{`Interns | ${data.links.linkMenu[2].name}`}</title>
        <meta
          name="description"
          content={data.meta.landingContentDescription}
        />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="wrapper lg:pt-28 md:pt-24 pt-20 bg-primaryYellow h-auto">
        <div className="flex flex-col items-center justify-center md:mb-0 mb-10">
          <h3 className="text-white font-semibold md:text-[48px] text-[28px] mb-3">
            About Us!
          </h3>
          <p className="mx-auto text-secondaryWhite max-w-[300px] text-center">
            Send your email so we can have the best conversation as to your
            questions
          </p>
          <div className="flex flex-row items-center">
            <InputBox
              className="general-textBox rounded-l py-3 px-2 bg-white w-[290px] md:w-[400px] lg:w-[500px] my-5"
              type={'email'}
              placeHolder={'Email Address'}
              value={value}
              tectBoxHandler={textBoxHandler}
            />
            <button className="rounded-r bg-black text-white p-3 ">
              <TbSend size={24} />
            </button>
          </div>
        </div>
      </main>

      <AboutDescription />
    </div>
  );
}

export default about;
