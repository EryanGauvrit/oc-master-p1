import { Participation } from "./models/Participation";

export const formatSlug = (str: string) => {
    return str
    .normalize('NFD') // Normalize diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-zA-Z0-9]/g, '-') // Replace non-alphanumeric characters with a hyphen
    .toLowerCase();
};

export const getNbrMedals = (participations: Participation[]) => {
    let totalMedals = 0;
    participations.forEach((participation: Participation) => {
        totalMedals += participation.medalsCount;
    });
    return totalMedals;
}

export const getNbrAthletes = (participations: Participation[]) => {
    let totalAthletes = 0;
    participations.forEach((participation: Participation) => {
        totalAthletes += participation.athleteCount;
    });
    return totalAthletes;
}

// return aspect ratio based on media query

export const getAspectRatio = () => {
    if(window.matchMedia('(max-width: 768px)').matches) {
        return 1.8;
    } else if(window.matchMedia('(max-width: 1024px)').matches) {
        return 1.2;
    } else {
        return 1;
    }
}