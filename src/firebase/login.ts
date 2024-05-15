import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth"
import { UseFormSetError } from "react-hook-form"

export type UserCredential = {
  email: string
}

type Login = {
  localKey: string
  isLogged: boolean
  request: (email: UserCredential["email"], setError: UseFormSetError<UserCredential>) => void
  confirm: (email?: UserCredential["email"], setError?: UseFormSetError<UserCredential>) => void
}

export const login = {} as Login

login.localKey = "youflix_user"

login.isLogged = !!window.localStorage.getItem(login.localKey)

login.request = (email, setError) => {
  if (!email || !setError) {
    throw new Error("Firebase 'login.request': Missing email and/or setError argument(s).")
  }

  const auth = getAuth()
  
  const actionCodeSettings = {
    url: "http://localhost:5173/login_confirmation",
    handleCodeInApp: true
  }
  
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      const successMessage = `<p>A link was sent to your email. Please, access it to login.</p>`
      document.querySelector("form")?.insertAdjacentHTML("beforeend", successMessage)
      window.localStorage.setItem(login.localKey, email)
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/quota-exceeded":
          setError("email", { type: error.code, message: "Login limit reached for today. Please, try later." })
          break
          
        default:
          setError("email", { type: error.code, message: "Something went wrong. Please, try again." })
          break
      }
    })
}

login.confirm = (confirmedEmail, setError) => {
  const auth = getAuth()
  
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem(login.localKey)

    if (!email && confirmedEmail) {
      email = confirmedEmail
    }

    signInWithEmailLink(auth, email!, window.location.href)
      .then(() => window.location.href = "/")
      .catch((error) => {
        if (!setError) {
          throw new Error("Firebase 'login.confirm': Missing setError argument.")
        }
        
        switch (error.code) {
          default:
            setError("email", { type: error.code, message: "Something went wrong. Please, try again." })
            break
        }
      })
  }
}
