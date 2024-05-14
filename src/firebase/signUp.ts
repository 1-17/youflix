import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { UseFormSetError } from "react-hook-form";

export const signUp = (signup: UserCredentials, setError: UseFormSetError<UserCredentials>) => {
  const auth = getAuth()

  createUserWithEmailAndPassword(auth, signup.email, signup.password)
    .then(credential => console.log(credential))
    .catch((error) => console.log(error))
}
