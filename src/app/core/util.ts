import { IParticipation } from "./models/Participation";

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