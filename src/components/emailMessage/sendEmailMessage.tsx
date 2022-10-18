// REACT
import React from 'react';

// REACT
import { FormState, UseFormRegister } from 'react-hook-form';

interface Lolo {
  register: UseFormRegister<SendEmailInterface>;
  formState: FormState<SendEmailInterface>;
  labelState: string;
}

function SendEmailMessage({ register, formState, labelState }: Lolo) {
  return (
    <div className="gap-3 flex flex-col">
      <p>This Message will be sent to the company</p>
      <p>{labelState}</p>
      <div className="flex flex-col items-start justify-center gap-2">
        <label>Subject of the Email</label>
        <input
          {...register('subject')}
          placeholder="Subject..."
          type="text"
          className="w-full inputBox"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <label>Greetings of your Email</label>
        <input
          {...register('greetings')}
          placeholder="Greetings to the company..."
          type="text"
          className="w-full inputBox"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <label>Introduction of the Email</label>
        <input
          {...register('introduction')}
          placeholder="Introduction..."
          type="text"
          className="w-full inputBox"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <label>Message Proper of the Email</label>
        <textarea
          {...register('bodyMessage')}
          placeholder="Your message..."
          className="min-h-[100px] w-full inputBox"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <label>Closing of your Email</label>
        <input
          {...register('closing')}
          placeholder="Closing..."
          type="text"
          className="w-full inputBox"
        />
      </div>
    </div>
  );
}

export default SendEmailMessage;
