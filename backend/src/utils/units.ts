export const METERS_PER_MILE = 1609.34;

export const getMetersToMiles = (meters: number) =>
  Number((meters / 1609.34).toFixed(2));
