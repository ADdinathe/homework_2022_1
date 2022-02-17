'use strict';

const isObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}


// const zip = (...objects) => objects.reduceRight((res, obj) => {
//         if (isObject(obj)){
//             Object.assign(res, obj);
//         }
//         return res;
// },objects[objects.length-1]);

const zip = (...args) => {

    const res = {};
    let prevObj;


    const deepmerge = (source) => {

        if (isObject(source)) {

            for (const key in source) {

                if (isObject(source[key])) {

                    if (!res[key]) {
                        Object.assign(res, {
                            [key]: (source[key])
                        });
                        prevObj = key;
                    } else {
                        deepmerge(source[key]);
                    }
                } else {
                    if (!res[key]) {
                        console.log(res[key], key)
                        if (prevObj) {
                            Object.assign(res[prevObj], {
                                [key]: source[key]
                            });
                        } else {
                            Object.assign(res, {
                                [key]: source[key]
                            });
                        }
                    } else {
                        Object.assign(res, {
                            [key]: source[key]
                        });
                    }

                }
            }
        }
    }


    for (let i = args.length - 1; i >= 0; i--) {
        deepmerge(args[i])
    }
    return res
}
