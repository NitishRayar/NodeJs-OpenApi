export interface Currency {
    code: string;
    name: string;
    symbol: string;
}
export interface Country {
    name: string;
    capital: string;
    subregion: string;
    region: string;
    population: number;
    currencies: Currency[];
}
