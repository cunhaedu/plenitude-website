export interface IChurch {
  identifier: string;
  name: string;
  description: string;
  localization: string,
  complement: string;
  image: string;
  collageImage: string;
  imageDescription: string;
  leadership: Array<{
    id: number;
    name: string;
    position: string;
    image: string;
  }>;
  worshipServices: Array<{
    weekDay: number;
    times: string[];
  }>;
}
