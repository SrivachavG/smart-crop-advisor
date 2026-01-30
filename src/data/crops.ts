export interface Crop {
    id: string;
    name: string;
    scientificName: string;
    description: string;
    seasons: string[];
    soilTypes: string[];
    rainfallRange: [number, number]; // mm
    tempRange: [number, number]; // Celsius
    nutrients: {
        N: string; // High, Medium, Low
        P: string;
        K: string;
    };
    duration: string;
    image: string;
}

export const crops: Crop[] = [
    {
        id: 'rice',
        name: 'Rice',
        scientificName: 'Oryza sativa',
        description: 'A staple grain that requires high water levels and warm temperatures.',
        seasons: ['Kharif'],
        soilTypes: ['Alluvial', 'Clayey'],
        rainfallRange: [1000, 2500],
        tempRange: [20, 35],
        nutrients: { N: 'High', P: 'Medium', K: 'Medium' },
        duration: '120-150 days',
        image: 'https://images.unsplash.com/photo-1536633390817-35060dc39465?q=80&w=800'
    },
    {
        id: 'wheat',
        name: 'Wheat',
        scientificName: 'Triticum aestivum',
        description: 'Cool climate crop grown during winter, requires moderate moisture.',
        seasons: ['Rabi'],
        soilTypes: ['Alluvial', 'Loamy'],
        rainfallRange: [500, 1000],
        tempRange: [10, 25],
        nutrients: { N: 'Medium', P: 'High', K: 'Medium' },
        duration: '110-130 days',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800'
    }
    // ... more crops will be added later
];
