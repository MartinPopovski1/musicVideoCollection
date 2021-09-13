## Folder structure

Because the project was relatively small, it wasn't essential to give much attention to the folder structure, but I tried to set it up to make it easy to build more features to it later.
After using the Angular CLI to bootstrap the project, I have added two main directories (pages and shared) in which I have put all the files for the project.
Furthermore, my shared directory contains model and service directories. For the CSS, I decided to use separate files for every component.
Also, I organized all of my exports in barrels.

## Project flow

For obtaining the data from the API, I created a service.
The service handles HTTP requests, HTTP request errors, and provides functions for populating the data for the components. 
In a music collection app, the data is expected to be pretty big. So for filtering the data, I built a custom angular pipe,
that should be good for performance. Also, I am showing loading message while loading and error message in case of occurring error while loading the data

## The CSS

I developed the CSS with the mobile-first approach. I am using BEM or at least some variation of it, even though it is unnecessary because angular encapsulates the CSS for each component. I used flexbox for positioning, and I didn't use CSS framework for the most part, but I installed ng-select library to use the multiple select for genre filter


## Unit tests

I added unit tests for all the functions in the service and the components.
