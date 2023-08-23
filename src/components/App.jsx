import { GlobalStyle } from 'GlobalStyle';
import { fetchImages } from './api';
import { Component } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { ButtonLoadMore } from './Button/Button';
// import { Loader } from './Loader/Loader';

export class App extends Component {
     state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
   };

   handleChangeQuery = evt => {
       evt.preventDefault()
    this.setState({
       query: evt.target.value,
      images: [],
      page: 1,
    });
      evt.target.reset();
  };

  async componentDidUpdate(prevProps, prevState) {
     const prevQuery = prevState.query;
    const searchQuery = this.state.query;
    const prevPage = prevState.page;
    const nexPage = this.state.page;

    if (prevQuery !== searchQuery || prevPage !== nexPage) {
      this.loadResult();
    }
   
  }
   loadResult = async () => {
    
    const searchQuery = this.state.query;
    const nexPage = this.state.page;

    try {
      this.setState({ loading: true });
      const img = await fetchImages(searchQuery, nexPage);
      if (img.length) {
        this.setState(prevState => ({
          images: this.state.page > 1 ? [...prevState.images, ...img] : img,
        }));
        this.setState({ loading: false });
          
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.log(error);
      }
    finally {
      this.setState({ loading: false });
      }
   };

   
  handleLoadMore = () => {
    this.setState(prevState => ({
       page: prevState.page + 1,
     }));
  };
   render() {
      return (
         <>
            <GlobalStyle />
            <Searchbar onSubmit={this.handleChangeQuery} />
            {/* <Loader /> */}
            <ImageGallery images={this.state.images}/>
            {/* <ButtonLoadMore onClick={this.handleLoadMore}/> */}
         </>
         
 )
  }
};
