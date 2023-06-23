export class Address {
    id?: number;
    streetLine: string | null | undefined;
    postalCode: string | null | undefined;
    city: string | null | undefined;
    county: string | null | undefined;
    country: string | null | undefined;
    constructor(streetLine: string | null | undefined, postalCode: string | null | undefined, city: string | null | undefined, county: string | null | undefined, country: string | null | undefined){
        this.streetLine = streetLine;
        this.postalCode = postalCode;
        this.city = city;
        this.county = county;
        this.country =country;
    }
}