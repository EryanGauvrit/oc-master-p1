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
 * @param width
 * @returns number
 * @description get the aspect ratio based on the width
 */
export const getAspectRatio = (width: number) => {
    if(width < 768) {
        return 1.8;
    } else if(width < 1024) {
        return 1.2;
    } else {
        return 1;
    }
}