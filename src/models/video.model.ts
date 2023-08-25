
export class Video {
    constructor(private id: string,private filename: string, private url: string, private duration: number) {
        this.id = id;
        this.filename = filename;
        this.url = url;
        this.duration = duration;
      }
}