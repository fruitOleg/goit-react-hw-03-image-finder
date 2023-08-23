import { GlobalStyle } from 'GlobalStyle';
import { fetchImages } from './api';
import { Component } from "react";
import Searchbar from './Searchbar/Searchbar';
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

     handleChangeInput = (e) => {
       this.setState({query: e.target.value})
     }

   handleSubmitQuery = async evt => {
       evt.preventDefault()

     this.setState({images: [] })

     const response = await fetchImages(this.state.query, 1);

       if(response) {
         this.setState({images: [...this.state.images, ...response], page: this.state.page + 1})
       }

      evt.target.reset();
  };


     loadMoreHandler = async () => {
       this.setState({page: this.state.page + 1})
       // const response = await fetchImages(this.state.query, this.state.page);
       //
       // if(response) {
       //   this.setState({images: [...this.state.images, ...response], page: this.state.page + 1})
       // }
     }

     saveQueryParams = (queryStr) => {
       console.log({queryStr})
       this.setState({images: [], query: queryStr, page: 1})
     }

  async componentDidUpdate(_, prevState) {
       const {query: prevStateQuery, page: prevStatePage} = prevState;
       const {query, page} = this.state;

    if (prevStateQuery !== query || prevStatePage !== page) {
      this.loadResult();
    }

  }
   loadResult = async () => {
    const {query, page} = this.state;
    try {
      this.setState({ loading: true });
      const imagesList = await fetchImages(query, page);
      if (imagesList.length) {
        this.setState({
          images: [...this.state.images, ...imagesList],
        });
      }
    } catch (error) {
      console.log(error);
      }
    finally {
      this.setState({ loading: false });
      }
   };


   render() {
      return (
         <>
            <GlobalStyle />
            <Searchbar onSubmit={this.handleSubmitQuery} handleChangeInput={this.handleChangeInput} saveQueryParams={this.saveQueryParams} />
           {this.state.loading ?  <Loader /> : <ImageGallery images={this.state.images}/>}
           {this.state.images.length > 0 && <ButtonLoadMore onClick={this.loadMoreHandler} />}
         </>

 )
  }
};
