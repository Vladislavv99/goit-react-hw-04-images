import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState, useEffect } from 'react';
import { getSearchImages } from 'services/api';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import Notiflix from 'notiflix';


export const ImageGallery =({search})=> {

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchCopy, setSearchCopy] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);


  useEffect(()=>{
    if (search !== searchCopy) {
      setPage(1);
      setSearchCopy(search);
    }
  },[search,searchCopy]) 

 useEffect(()=>{
  const getSeacrhImg = () => {
    setIsLoading(true);
    setError(null);
    getSearchImages(search, page)
      .then(imagesInfo =>{
        if (imagesInfo.totalHits === 0) {
          Notiflix.Report.info('😪 Oh, no',
            'Sorry, there are no images matching your search query. Please try again.',
          );}
        setImages(prevImages =>{
          if(page === 1){
            return imagesInfo.hits
          } else{
            return [...prevImages, ...imagesInfo.hits]
          } 
      });
      setTotalResults(imagesInfo.totalHits);
    })
      .catch(err => setError( err.message))
      .finally(() => {
        setIsLoading(false);
      });
  };
  if(search){
    getSeacrhImg()
  }
 },[search,page]);
 

  const changePage = () => {
   setPage(prevPage => (prevPage + 1));
  };

  

  const handleOpenModal = data => {
    setModalData(data);
  };

  const closeModal = () => {
   setModalData(null)
  };

    return (
      <>
      {isLoading && <Loader />}
        {error ? (
          <h1>{error}</h1>
        ): (
          <ul className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem 
            image={image} 
            key={image.id} 
            handleOpenModal={handleOpenModal}
            />
          ))}
        </ul>
        )}
        {totalResults > images.length && <Button onClick={changePage} />}
        {modalData && <Modal modalData={modalData} closeModal={closeModal} />}
      </>
    );
  }

// import Button from 'components/Button/Button';
// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
// import { Loader } from 'components/Loader/Loader';
// import { Modal } from 'components/Modal/Modal';
// import PropTypes from 'prop-types';
// import { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { fetchImage } from 'services/pixabayAPI';

// export default class ImageGallery extends Component {
//   state = {
//     gallery: [],
//     searchCopy: null,
//     error: null,
//     page: 1,
//     totalHits: 0,
//     isLoading: false,
//     modalImage: null,
//   };
//   static getDerivedStateFromProps(props, state) {
//     if (props.searchImage !== state.searchCopy) {
//       return {
//         page: 1,
//         searchCopy: props.searchImage,
//         isLoading: true,
//         error: null,
//       };
//     }
//     return null;
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevProps.searchImage !== this.props.searchImage ||
//       (prevState.page !== this.state.page && this.state.page !== 1)
//     ) {
//       this.getImage();
//     }
//   }

//   getImage = async () => {
//     try {
//       const { hits, totalHits } = await fetchImage(
//         this.props.searchImage,
//         this.state.page
//       );

//       if (!totalHits) {
//         this.warn();
//       }

//       this.setState(prev => ({
//         gallery: this.state.page === 1 ? hits : [...prev.gallery, ...hits],
//         totalHits,
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   changePage = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };
//   warn = () => {
//     toast.warn('Did not find anything! Please change the request.');
//   };

//  openModal = data => {
//     this.setState({ modalImage: data });
//   };

//   closeModal = () => {
//     this.setState({ modalImage: null });
//   };

//   render() {
//     const { gallery, isLoading, searchCopy, totalHits, modalImage } =
//       this.state;
//     return (
//       <div>
//         {!totalHits && <ToastContainer />}
//         {searchCopy && isLoading ? (
//           <Loader />
//         ) : (
//           <ul className="ImageGallery">
//             {gallery && (
//               <ImageGalleryItem
//                 gallery={gallery}
//                 openModal={this.openModal}
//               />
//             )}
//           </ul>
//         )}

//         {totalHits > gallery.length && <Button changePage={this.changePage} />}
//         {modalImage && (
//           <Modal closeModal={this.closeModal} modalImage={modalImage} />
//         )}
//       </div>
//     );
//   }
// }
// ImageGallery.propTypes = {
//   searchImage: PropTypes.string.isRequired,
// };