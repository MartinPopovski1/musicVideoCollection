import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchText: string, selectedGenres: any[], selectedYear: number): any {
    let result:any[] = value;
    if (searchText) {
      result = result.filter((video: { title: string; artist: string; }) => {
        if(!video.title.toLowerCase) console.log(video);
        return video.title && video.title.toLowerCase().includes(searchText.toLowerCase()) ||
          video.artist && video.artist.toLowerCase().includes(searchText.toLowerCase())
      })

    }
    if(selectedGenres && selectedGenres.length) {
      result = result.filter((video) => selectedGenres.find(genre => genre.id === video.genreId))
    }
    if(selectedYear) {
      result = result.filter((video) => video.releaseYear === selectedYear)
    }
    return result;
}


}
