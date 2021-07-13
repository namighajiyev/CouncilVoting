const url = require('url');

const API_URL = process.env.NODE_ENV === 'development' ? 'https://localhost:5001' : 'https://' + window.location.host + "/api/";


const FetchAPI = {
    post: (urlStr, data) => {
        return fetch(url.resolve(API_URL, urlStr), {
            method: 'POST',
            body: data
        })
            .then(handleResponse);
    },
    postJson: (urlStr, data) => {
        return fetch(url.resolve(API_URL, urlStr), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(handleResponse);
    },
    putJson: (urlStr, data) => {
        return fetch(url.resolve(API_URL, urlStr), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(handleResponse);
    },
    deleteJson: (urlStr, data) => {
        return fetch(url.resolve(API_URL, urlStr), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(handleResponse);
    },
    getJson: (urlStr, params) => {
        urlStr = url.resolve(API_URL, urlStr);
        var urlObj = new URL(urlStr);
        if (!!params) {
            urlObj.search = new URLSearchParams(params).toString();
        }
        return fetch(urlObj, {
            headers: {}
        }).then(handleResponse);
    },
    get: (urlStr, params) => {
        urlStr = url.resolve(API_URL, urlStr);
        var urlObj = new URL(urlStr);
        if (!!params) {
            urlObj.search = new URLSearchParams(params).toString();
        }
        return fetch(urlObj, {
            headers: {}
        }).then(handleResponse);
    }

}

const handleResponse = async response => {

    var responseObj = null;
    try {
        responseObj = await response.json();
    }
    catch {
        responseObj = null;
    }

    if (response.ok) {
        return responseObj;
    }
    else {
        return {
            error: responseObj
        }
    }
}



const MeasureAPI = {
    selectMeasures: (params) => FetchAPI.getJson("measure", params),
    selectMeasure: (id, params) => FetchAPI.getJson("measure/" + id, params),
    createMeasure: (data) => FetchAPI.postJson("measure", data),
}

const VoteTypeAPI = {
    selectVoteTypes: () => FetchAPI.getJson("voteType"),
}

const MeasureVoteAPI = {
    createMeasureVote: (data) => FetchAPI.postJson("measureVote", data),
}

const MeasureResultAPI = {
    selectMeasureResults: (id) => FetchAPI.getJson("measureResult/" + id),
}


const api = {
    API_URL,
    FetchAPI,
    MeasureAPI,
    VoteTypeAPI,
    MeasureVoteAPI,
    MeasureResultAPI
}


export default api;