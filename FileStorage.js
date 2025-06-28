import { supabase, USER_FILES_BUCKET } from '#config/supabase.js'

async function uploadFile(path, file) {
  const { data, error } = await supabase.storage
    .from(USER_FILES_BUCKET)
    .upload(path, file)

  return { data, error }
}

async function deleteFiles(paths) {
  const { data, error } = await supabase.storage
    .from(USER_FILES_BUCKET)
    .remove(paths)

  return { data, error }
}

export const FileStorage = {
  uploadFile,
  deleteFiles,
}
