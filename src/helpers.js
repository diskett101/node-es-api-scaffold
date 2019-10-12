export const responseHelper = (response, code, data) => {
    response.statusCode = code;
    response.write(data);
    response.end();
    return {
        code: code,
        data: data
    };
}