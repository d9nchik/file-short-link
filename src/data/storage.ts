import { getUser } from './auth';
import { storage, firestore as db } from '../firebase';

export interface LinkObj {
  fileName: string;
  filePath: string;
  smallLink: string;
}

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

export const addSmallLink = async (
  filePath: string,
  fileName: string
): Promise<void | string> => {
  const smallLink = numberToValue(Date.now());
  console.log(smallLink);
  try {
    await db.collection('links').add({ fileName, filePath, smallLink });
  } catch (error) {
    console.error(error);
    return error;
  }
};

const stringAvailableLetters = (() => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(`${i}`);
  }
  for (let j = 'a'.charCodeAt(0); j <= 'z'.charCodeAt(0); j++) {
    const smallLetter = String.fromCharCode(j);
    arr.push(smallLetter);
    arr.push(smallLetter.toUpperCase());
  }

  return arr;
})();

function numberToValue(num: number): string {
  const numberOfLettersInSet = stringAvailableLetters.length;
  let link = '';
  while (num > 0) {
    const remainder = num % numberOfLettersInSet;
    link = stringAvailableLetters[remainder] + link;
    num -= remainder;
    num /= numberOfLettersInSet;
  }
  return link;
}
