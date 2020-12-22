
export interface Hotel {
    name: string,
    lat: number,
    lng: number,
    img: string;
}

export interface SuggestionsResposne {
    autoSuggestInstance: boolean | null;
    misspellingfallback: boolean;
    moresuggestions: number;
    suggestions: Suggestion[];
    term: string;
    trackingID: string;
}

export type SuggestionGroup = "CITY_GROUP" | "LANDMARK_GROUP" | "TRANSPORT_GROUP" | "HOTEL_GROUP";


export interface Suggestion {
    entities: Entity[];
    group: SuggestionGroup;
}

export type EntityType = "CITY" | "LANDMARK" | "TRANSPORT" | "HOTEL";

export interface Entity {
    caption: string;
    destinationId: string;
    geoId: string;
    landmarkCityDestinationId: null;
    latitude: number;
    longitude: number;
    name: string;
    redirectPage: string;
    type: EntityType;
}

export interface ImagesResponse {
    featuredImageTrackingDetails: any;
    hotelId: number;
    hotelImages: Image[];
    propertyImageTrackingDetails: any;
    roomImages: RoomImage[];
}

export interface Image {
    baseUrl: string;
    imageId: number;
    mediaGUID: string;
    sizes: ImageSize[];
    trackingDetails: any;
}

export interface RoomImage {
    images: Image[];
    roomId: number;
}

export interface ImageSize {
    suffix: string;
    type: number;
}