export type GetTZParams = {
  long: number;
  lat: number;
};

export type TimezoneType = {
  status: string;
  message: string;
  countryCode: string;
  countryName: string;
  regionName: string;
  cityName: string;
  zoneName: string;
};

export class TimezoneService {
  static queryStringFromParams(params: GetTZParams): string {
    const qs: string = [
      `key=${process.env.REACT_APP_TIMEZONE_API_KEY}`,
      "format=json",
      "by=position",
      `lat=${params.lat}`,
      `lng=${params.long}`,
    ].join("&");

    return qs.length > 0 ? `?${qs}` : "";
  }

  static isValidTZParams(params: GetTZParams): boolean {
    const validLat = params.lat >= -90 && params.lat <= 90;
    const validLong = params.long >= -180 && params.long <= 180;

    return validLat && validLong;
  }

  static getTZ(params: GetTZParams): Promise<TimezoneType> {
    if (!TimezoneService.isValidTZParams(params))
      throw new Error("Invalid params!");

    const queryStrings = TimezoneService.queryStringFromParams(params);
    const url = `${process.env.REACT_APP_TIMEZONE_API_ENDPOINT}${queryStrings}`;

    return fetch(url).then((res) => res.json());
  }
}
