'use strict';

const isObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

// ВАРИАНТ НИЖЕ ТОЖЕ РАБОТАЕТ, КРОМЕ ПОСЛЕДНЕГО (МОЕГО) ТЕСТА

// const zip = (...objects) => objects.reduceRight((res, obj) => {
//         if (isObject(obj)){
//             Object.assign(res, obj);
//         }
//         return res;
// },{});

// const zip = (...objects) => objects.reduce((res, obj) => {
//         if (isObject(obj)){
//
//             res = {...obj}
//         }
//         return res;
// },{});


const zip = (...args) => {

    const res = {};

    const recurs = (currentPath, source) => {
        for (let key in source) {

            if (isObject(source[key])) {
                recurs(currentPath + (currentPath !== '' ? '.' : '') + key, source[key])
            } else {
                res[currentPath + (currentPath !== '' ? '.' : '') + key] = source[key]
            }
        }
    }


    let plain = {}, plain1;

    const final_object = (res) => {
        for (let key in res) {
            const pathArr = key.split('.');
            plain1 = plain

            if (pathArr.length > 1) {
                for (let i = 0; i < pathArr.length - 1; i++) {

                    if (!plain1[pathArr[i]]) {
                        plain1[pathArr[i]] = {};
                    }
                    plain1 = plain1[pathArr[i]];
                }
            }
            plain1[pathArr[pathArr.length - 1]] = res[key]
        }
        return plain
    }

    for (let i = args.length - 1; i >= 0; i--) {

        if (isObject(args[i])) {
            recurs('', args[i])
        }
    }
    final_object(res)
    return plain
}
