// REACT
import React from 'react';

// NEXT
import Head from 'next/head';

// COMPONENTS
import AboutDescription from '@component/blocks/staticPage/AboutDescription';
import InputBox from '@component//blocks/staticPage/InputBox';

// STATIC DATA
import { data } from '../../Data';

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
        <meta name="theme-color" content="#DDC91D" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="wrapper h-auto bg-primaryYellow pt-20 md:pt-24 lg:pt-28">
        <div className="my-10 flex flex-col items-center justify-center md:mb-0">
          <h3 className="mb-5 text-[28px] font-semibold text-white md:text-[48px]">
            About Us!
          </h3>
          <p className="mx-auto max-w-[300px] text-center text-secondaryWhite">
            Send your email so we can have the best conversation as to your
            questions
          </p>
          <div className="flex flex-row items-center">
            <InputBox
              className="general-textBox my-5 w-[290px] rounded-l bg-white py-3 px-2 md:w-[400px] lg:w-[500px]"
              type={'email'}
              placeHolder={'Email Address'}
              value={value}
              tectBoxHandler={textBoxHandler}
            />
            <button
              className="rounded-r bg-black p-3 text-white duration-300 hover:scale-110"
              title="sendButton"
            >
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
