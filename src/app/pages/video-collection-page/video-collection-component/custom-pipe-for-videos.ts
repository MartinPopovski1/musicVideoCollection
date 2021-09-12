import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchText: string, selectedGenres: any[], selectedYear: number): any {
    let result:any[] = value;
    if (searchText) {
      result = value.filter((video: { title: string; artist: string; }) =>
        video.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        video.artist.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    }
    if(selectedGenres && selectedGenres.length) {
      result = value.filter((video) => selectedGenres.find(genre => genre.id === video.genreId))
    }
    if(selectedYear) {
      result = value.filter((video) => video.releaseYear === selectedYear)
    }
    return result;
}


}
