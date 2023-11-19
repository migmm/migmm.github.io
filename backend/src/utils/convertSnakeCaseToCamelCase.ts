
function convertSnakeCaseToCamelCase(obj: any): any {

    const camelCaseObj: any = {};

    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            camelCaseObj[camelCaseKey] = obj[key];
        }
    }

    return camelCaseObj;
}


export default convertSnakeCaseToCamelCase;