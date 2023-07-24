export function getErrorTranslation(errorText, errorFields = {}) {
    let temp = errorText;
    temp = errorText.replace('${name}', errorFields.name);

    return temp;
}
export function getErrorForSnackbar(errors) {
    let errorMsg = null;
    if (typeof errors === 'object') {
        const errorKeys = Object.keys(errors);
        if (Array.isArray(errorKeys) && errorKeys.length > 0) {
            const firstFieldErrors = errors[errorKeys[0]];
      
            errorMsg = firstFieldErrors[0];
        }
    }

    return errorMsg;
}
