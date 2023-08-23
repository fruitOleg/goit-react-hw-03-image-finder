import { GlobalStyle } from 'GlobalStyle';
import { fetchImages } from './api';
import { Component } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';

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
      console.log("submit")
      evt.target.reset();
  };

  async componentDidUpdate(prevProps, prevState) {
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
       
       this.loadResult();
    }
  }
   loadResult = async () => {
    
    const searchQuery = this.state.query;
    const nexPage = this.state.page;
    console.log({searchQuery})
    try {
       this.setState({ loading: true });
     
       const response = await fetchImages(searchQuery, nexPage);
         console.log("getresult", response)
       if (response.data) {
         console.log(response.data)
        this.setState(prevState => ({
          images: this.state.page > 1 ? [...prevState.images, ...response] : response,
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
            <Loader />
            <ImageGallery images={this.state.images}/>
            <ButtonLoadMore onClick={this.handleLoadMore}/>
         </>
         
 )
  }
};
