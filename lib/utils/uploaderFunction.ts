import { supabase } from '@supabase/supabaseClient';
import pathData from '@data/path.data.json';

const imageUploader = async (imageFile: File) => {
  const { error } = await supabase.storage
    .from('interns')
    .upload(
      `${pathData.admin_users.profile_image}${imageFile.name}`,
      imageFile,
      {
        cacheControl: '3600',
        upsert: false,
      }
    );

  if (error) {
    return error.message;
  } else {
    const { data } = await supabase.storage
      .from('interns')
      .getPublicUrl(`${pathData.admin_users.profile_image}${imageFile.name}`);

    return data.publicUrl;
  }
};

export { imageUploader };
