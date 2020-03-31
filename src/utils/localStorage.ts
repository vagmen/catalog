export const getObject = (item: string) => {
    const historyFiltersString = localStorage.getItem(item);
    if (historyFiltersString) {
        return JSON.parse(historyFiltersString);
    } else {
        return {};
    }
};

export const getArray = (item: string) => {
    const historyFiltersString = localStorage.getItem(item);
    if (historyFiltersString) {
        return JSON.parse(historyFiltersString);
    } else {
        return [];
    }
};

export const setObject = <T>(name: string, item: T) => {
    const itemString = JSON.stringify(item);
    localStorage.setItem(name, itemString);
};
