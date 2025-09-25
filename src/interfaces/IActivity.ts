export interface IActivity {
  id: string;
  displayName: string;
  description: string;
  scheduleStart: string;
  scheduleEnd: string;
  locations: google.maps.places.PlaceResult[];
}
export interface IActivityState {
  activity: IActivity;
}
