import React from 'react';

// TOAST
import { errorNotify } from '@/src/components/common/toast';

// REACT HOOK FORM
import { useForm } from 'react-hook-form';

// EXTERNAL
import classNames from 'classnames';

// FIREBASE
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

function ExistingForm({
  setIsNewStudentUser,
  isNewStudentUser,
}: {
  setIsNewStudentUser: React.Dispatch<React.SetStateAction<boolean>>;
  isNewStudentUser: boolean;
}) {
  type EmailPassword = {
    emailAddress: string;
    password: string;
  };

  const { register, handleSubmit } = useForm<EmailPassword>();

  return (
    <form
      className=" mt-5 flex flex-col gap-3"
      onSubmit={handleSubmit(signInExisitingStudent)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-secondaryWhite">
          Email Address
        </label>
        <input
          className={classNames(
            'border-2 rounded py-3 px-2 outline-none border-primaryYellow'
          )}
          type="email"
          placeholder="Email Address"
          {...register('emailAddress', {
            required: 'Email is required',
          })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-secondaryWhite">
          Password
        </label>
        <input
          className={classNames(
            'border-2 rounded py-3 px-2 outline-none border-primaryYellow'
          )}
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
          })}
        />
      </div>
      <button
        className="self-end text-primaryYellow my-3 underline"
        onClick={() => setIsNewStudentUser(!isNewStudentUser)}
      >
        Register New Student Account
      </button>

      <input
        className="bg-primaryYellow rounded-md py-2 w-full flex flex-row justify-center items-center gap-3 font-semibold text-secondaryWhite hover:bg-primaryYellowHover duration-150"
        value="Login"
        type="submit"
      />
    </form>
  );

  function signInExisitingStudent(data: EmailPassword) {
    signInWithEmailAndPassword(emailPassAuth, data.emailAddress, data.password)
      .then((res) => console.log(res))
      .catch((err) => {
        errorNotify(err.message);
      });
  }
}

export default ExistingForm;
