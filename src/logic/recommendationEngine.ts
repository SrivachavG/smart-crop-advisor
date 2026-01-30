import { crops } from '../data/crops';
import type { Crop } from '../data/crops';

export interface RecommendationResult {
    crop: Crop;
    score: number; // 0-100
    matchedFactors: string[];
}

export const getRecommendations = (data: {
    season: string;
    soilType: string;
    rainfall: number;
    temperature: number;
}): RecommendationResult[] => {
    return crops.map(crop => {
        let score = 0;
        const matchedFactors: string[] = [];

        // Check season
        if (crop.seasons.includes(data.season)) {
            score += 30;
            matchedFactors.push('Ideal Season');
        }

        // Check soil type
        if (crop.soilTypes.includes(data.soilType)) {
            score += 30;
            matchedFactors.push('Perfect Soil');
        }

        // Check rainfall
        const [minRain, maxRain] = crop.rainfallRange;
        if (data.rainfall >= minRain && data.rainfall <= maxRain) {
            score += 20;
            matchedFactors.push('Optimal Moisture');
        } else if (data.rainfall >= minRain * 0.8 && data.rainfall <= maxRain * 1.2) {
            score += 10;
            matchedFactors.push('Adequate Moisture');
        }

        // Check temperature
        const [minTemp, maxTemp] = crop.tempRange;
        if (data.temperature >= minTemp && data.temperature <= maxTemp) {
            score += 20;
            matchedFactors.push('Favorable Climate');
        }

        return {
            crop,
            score,
            matchedFactors
        };
    })
        .filter(res => res.score > 40)
        .sort((a, b) => b.score - a.score);
};
