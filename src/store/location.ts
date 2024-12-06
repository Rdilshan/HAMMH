import { create } from "zustand";

// Define the structure of the location object
interface Location {
  Latitude: string;
  Longitude: string;
}

// Define the structure of the Zustand store
interface LocationStore {
  location: Location;
  updatelocation: (newLocation: Location) => void;
}

export const locationstore = create<LocationStore>((set) => ({
  location: {
    Latitude: "6.127194",
    Longitude: "81.122452",
  },
  updatelocation: (newLocation) =>
    set(() => ({
      location: newLocation,
    })),
}));

