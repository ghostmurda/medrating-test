const baseUrl = 'https://json.medrating.org';

export const getUsersReq = async () => {
    let respData = [];
    await fetch(`${baseUrl}/users`, {method: 'GET'})
        .then(resp => resp.json())
        .then(data => respData = data)
    return respData;
}