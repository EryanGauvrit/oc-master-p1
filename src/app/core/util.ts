import { IParticipation } from "./models/Participation";

/**
 * 
 * @param str 
 * @returns string
 * @description format a string to be used as a slug in a URL
 */
export const formatSlug = (str: string) => {
    return str
    .normalize('NFD') // Normalize diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-zA-Z0-9]/g, '-') // Replace non-alphanumeric characters with a hyphen
    .toLowerCase();
};

/**
 * 
 * @param participations 
 * @returns number
 * @description get the number of medals
 */
export const getNbrMedals = (participations: IParticipation[]) => {
    let totalMedals = 0;
    participations.forEach((participation: IParticipation) => {
        totalMedals += participation.medalsCount;
    });
    return totalMedals;
}

/**
 * 
 * @param participations 
 * @returns number
 * @description get the number of athletes
 */
export const getNbrAthletes = (participations: IParticipation[]) => {
    let totalAthletes = 0;
    participations.forEach((participation: IParticipation) => {
        totalAthletes += participation.athleteCount;
    });
    return totalAthletes;
}

/**
 * 
 * @returns number
 * @description get the aspect ratio based on the screen size for the chart
 */

export const getAspectRatio = () => {
    if(window.matchMedia('(max-width: 768px)').matches) {
        return 1.8;
    } else if(window.matchMedia('(max-width: 1024px)').matches) {
        return 1.2;
    } else {
        return 1;
    }
}