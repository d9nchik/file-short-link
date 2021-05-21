import { getUser } from './auth';
import { storage } from '../firebase';

export const uploadFile = async (file: File): Promise<string> => {
  const user = getUser();
  if (!user) {
    return '';
  }
  try {
    const response = await storage
      .ref()
      .child('files')
      .child(user.uid)
      .child(`${new Date().getTime()} ${file.name}`)
      .put(file);
    return await response.ref.getDownloadURL();
  } catch (error) {
    return '';
  }
};
