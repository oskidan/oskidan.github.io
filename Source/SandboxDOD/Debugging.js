export const fatalError = (message) => {
    throw new Error(message);
};

export const requiredProperty = (name) => {
    fatalError(`Missing required property: ${name}`);
};
