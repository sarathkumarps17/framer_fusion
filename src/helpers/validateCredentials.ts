

export const pswRe = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
export const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const regName = /^[A-Za-z ]+$/

export const validateEmail = (email: string) => emailRe.test(email)

export const validatePassword = (password: string) => pswRe.test(password)

export const validateName = (name: string) => regName.test(name)

// export const validateRegisterCredentials = (userData: RegisterRequestData): boolean => validateEmail(userData.email) && validateName(userData.name) && validatePassword(userData.password)