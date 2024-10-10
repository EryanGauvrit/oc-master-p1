export const formatSlug = (str: string) => {
    return str
    .normalize('NFD') // Normalize diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-zA-Z0-9]/g, '-') // Replace non-alphanumeric characters with a hyphen
    .toLowerCase();
};