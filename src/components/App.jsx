import { GlobalStyle } from 'GlobalStyle';
import { fetchImages } from './api';
import { Component } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
     state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
   };

    handleChangeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
    });
  };

  async componentDidUpdate(prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      const images = await fetchImages(
        this.state.query.slice(this.state.query.indexOf('/') + 1),
        this.state.page
      );

      this.setState({
        images,
      });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
       page: prevState.page + 1,
     }));
  };
   render() {
      return (
         <>
            <GlobalStyle />
            <Searchbar onSubmit={this.handleChangeQuery}/>
            <ImageGallery images={this.state.images} />
         </>
         
 )
  }
};
