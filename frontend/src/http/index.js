import axios from 'axios';

const HTTP_STATUS_CODES = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};
const transport = axios.create({ withCredentials: true });

const getData = async ({ model, sort, filter, pagination, setRows, dataRows, setIsLoading }) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const params = { url, sort, filter, pagination };
    // const requestData = {
    //     start: pagination.page * pagination.pageSize,
    //     limit: pagination.pageSize,
    //     sort: sort.map(a => `${a.filterField || a.field} ${a.sort}`).join(','),
    //     filter,
    // };
    // const params2 = { url, method: 'POST', data: requestData, headers: { "Content-Type": "application/json" }, credentials: 'include' };
    const response = await transport(params);
    if (response.status === HTTP_STATUS_CODES.OK) {
        setRows(dataRows);
        setIsLoading(false);
    }
}

export {
    getData,
    transport,
    HTTP_STATUS_CODES,
};