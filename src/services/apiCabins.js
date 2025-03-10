import supabase from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error('Error found in getCabins');
    throw new Error(error);
  }

  return data;
}
