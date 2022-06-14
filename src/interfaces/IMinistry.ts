export interface IMinistry {
  identifier: string;
  name: string;
  description: string;
  videoUrl: string;
  image: string;
  imageDescription: string;
  leadership: Array<{
    id: number;
    name: string;
    position: string;
    image: string;
  }>;
  bibleVerse: {
    text: string;
    book: string;
    capitule: number;
    verses: string
  }
}
