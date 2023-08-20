import { GlobalStyle } from 'GlobalStyle';
// import { fetchImages } from './api';
import { Component } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Fragment } from 'react';

export class App extends Component {
     state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
   };
   
   render() {
      return (
         <Fragment>
            <GlobalStyle />
            <Searchbar />
            <ImageGallery />
            <ImageGalleryItem/>
         </Fragment>
         
 )
  }
};
