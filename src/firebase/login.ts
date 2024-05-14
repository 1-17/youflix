import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { UseFormSetError } from "react-hook-form"

export const login = (login: UserCredentials, setError: UseFormSetError<UserCredentials>) => {
  const auth = getAuth()

  signInWithEmailAndPassword(auth, login.email, login.password)
    .then(credential => console.log(credential))
    .catch(error => {
      switch (error.code) {
        case "auth/invalid-credential":
          setError("email", { type: error.code, message: "Email or password does not exist. Please, try again or sign up." })
          break
      }
    })
}
