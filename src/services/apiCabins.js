import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image == 'string' &&
    newCabin.image?.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${new Date().getTime()}-${
    newCabin.image.name
  }`.replaceAll('/', '');

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // 1. create/edit cabin
  let query = supabase.from('cabins');
  // A) create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabins')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError.message);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
