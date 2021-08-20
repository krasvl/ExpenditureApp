export const validatePassword = password => {
    let errorMessages = []
    const containsDigits = /(?=.*[0-9])/
    const  containsUpperLetter = /(?=.*[A-Z])/
    const lengthMoreThan6 = /[0-9a-zA-Z!@#$%^&*]{6,}/

    if (!containsDigits.test(password))
        errorMessages.push("Пароль должен содержать цифры");
    if (!containsUpperLetter.test(password))
        errorMessages.push("Пароль должен содержать символы в верхнем регистре");
    if (!lengthMoreThan6.test(password))
        errorMessages.push("Длина пароля должна быть больше 6");

    return errorMessages;
}

export const validateEmail = email => {
    let errorMessages = []
    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    if (!emailReg.test(email))
        errorMessages.push("Некоррректный email");

    return errorMessages;
}

export const validateRequiredField = text => {
    let errorMessages = []

    if (!text)
        errorMessages.push("Поле не должно быть пустым");

    return errorMessages;
}