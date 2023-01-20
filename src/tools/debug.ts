export const consoleDebug = (...info: Array<unknown>) => {
    try {
        if (!process.env) throw info;
        if (process.env.NODE_ENV === 'development') {
            console.log(...info);
        }
    } catch (error) {
        console.log(...info);
    }
};
