'use strict';

const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item));

const deepmerge = (target, source) => {
    for (const key in source) {
        if (isObject(source[key])) {
            if (!target[key]) {
                Object.assign(target, {[key]: {}});
            }
            deepmerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
}

const zip = (...args) => {
    if (!args.length || !args.every(obj => isObject(obj))) {
        return {};
    }

    const res = {};

    for (let i = args.length - 1; i >= 0; i--) {
        deepmerge(res, args[i]);
    }

    return res;
}