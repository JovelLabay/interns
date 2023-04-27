import { supabase } from '@supabase/supabaseClient';
import pathData from '@data/path.data.json';
import { v4 as uuidv4 } from 'uuid';

const imageUploader = async (imageFile: File) => {
  const { data, error } = await supabase.storage
    .from('interns')
    .upload(
      `${pathData.admin_users.profile_image}${imageFile.name}-${uuidv4()}`,
      imageFile,
      {
        cacheControl: '3600',
        upsert: false,
      }
    );

  const lala = data?.path as string;

  if (error) {
    return error.message;
  } else {
    const { data } = await supabase.storage.from('interns').getPublicUrl(lala);
    return data.publicUrl;
  }
};

const csvUploader = async (imageFile: File) => {
  const { data, error } = await supabase.storage
    .from('interns')
    .upload(
      `${pathData.student_bulk_imports.student_bulk}${
        imageFile.name
      }-${uuidv4()}`,
      imageFile,
      {
        cacheControl: '3600',
        upsert: false,
      }
    );

  const lala = data?.path as string;

  if (error) {
    return error.message;
  } else {
    const { data } = await supabase.storage.from('interns').getPublicUrl(lala);
    return data.publicUrl;
  }
};

const docUploader = async (imageFile: File) => {
  const { data, error } = await supabase.storage
    .from('interns')
    .upload(
      `${pathData.requirement_docuemnts.admin_template}${
        imageFile.name
      }-${uuidv4()}`,
      imageFile,
      {
        cacheControl: '3600',
        upsert: false,
      }
    );

  const lala = data?.path as string;

  if (error) {
    return error.message;
  } else {
    const { data } = await supabase.storage.from('interns').getPublicUrl(lala);
    return data.publicUrl;
  }
};

export { imageUploader, csvUploader, docUploader };
