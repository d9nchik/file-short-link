import firebase, { auth, signInWithGoogle } from '../firebase';

const LOCALSTORAGE_AUTHORIZED_USER = 'authorized_user';

export const loginWithEmail = (
  email: string,
  password: string
): Promise<string | null> =>
  executeAsyncFunctionIfErrReturnMessage(() =>
    auth.signInWithEmailAndPassword(email, password)
  );

export const loginWithGoogle = (): Promise<string | null> =>
  executeAsyncFunctionIfErrReturnMessage(signInWithGoogle);

export const logout = (): Promise<void> => auth.signOut();

let user: firebase.User | null = (() => {
  const value = localStorage.getItem(LOCALSTORAGE_AUTHORIZED_USER);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
})();

auth.onAuthStateChanged(newUser => {
  if (newUser && !newUser.emailVerified) {
    newUser.sendEmailVerification();
    logout();
    return;
  }
  user = newUser;
  localStorage.setItem(LOCALSTORAGE_AUTHORIZED_USER, JSON.stringify(user));
});

export const isAuthenticated = (): boolean => !!user;

export const getUser = (): firebase.User | null => user;

type ErrorMessageOrNull = string | null;

export async function executeAsyncFunctionIfErrReturnMessage(
  inputFunction: () => Promise<firebase.auth.UserCredential | void>
): Promise<ErrorMessageOrNull> {
  try {
    await inputFunction();
    return null;
  } catch (error) {
    return error.message;
  }
}
