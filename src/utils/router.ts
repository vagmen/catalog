import { createHashHistory } from "history";

export const history = createHashHistory();

export const getLocationPart = (index: number) => history.location.pathname.split("/").slice(index)[0];

export const getLastLocationPart = () => {
    const lastPart = getLocationPart(-1);
    const preLastPart = getLocationPart(-2);
    return lastPart === "/" ? preLastPart : lastPart;
};
