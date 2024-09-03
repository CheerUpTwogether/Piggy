export interface Search {
  id: string;
  content: string;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}
