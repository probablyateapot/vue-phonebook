
const {
    VUE_APP_DATA_URL = 'https://randomuser.me/api/?inc=name,email,login,dob,phone,picture&format=json&results=500',
    VUE_APP_REQUEST_TIMEOUT = '10000',
    VUE_APP_BUILD_DESCRIBE,
    VUE_APP_REPO_URL
} = process.env;

export const dataUrl = VUE_APP_DATA_URL;
export const requestTimeout = parseInt(VUE_APP_REQUEST_TIMEOUT);

export const repoUrl = VUE_APP_REPO_URL;
export const buildDesc = VUE_APP_BUILD_DESCRIBE;

export const dateOpts = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

export const fuseOpts = {
    shouldSort: true,
    tokenize: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 24,
    minMatchCharLength: 2,
    keys: [ "name.first", "name.last" ]
};

