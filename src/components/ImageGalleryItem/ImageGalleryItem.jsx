import PropTypes from 'prop-types';

export const ImageGalleryItem = ({image, handleOpenModal}) => {
  const {id, webformatURL, largeImageURL}= image
  return (
    <li 
    key={id}
    className="ImageGalleryItem"
    onClick={()=>handleOpenModal({url:largeImageURL})}
    >
      <img 
      className="ImageGalleryItem-image"
      src= {webformatURL} 
      alt="" />
    </li>
  );
};
// const ImageGalleryItem = ({ gallery, openModal }) => {
//   return (
//     <>
//       {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
//         <li
//           key={id}
//           className="ImageGalleryItem"
//           onClick={() => {
//             openModal({ src: largeImageURL, alt: tags });
//           }}
//         >
//           <img
//             src={webformatURL}
//             alt={tags}
//             width="350"
//             className="ImageGalleryItem-image"
//           />
//         </li>
//       ))}
//     </>
//   );
// };

ImageGalleryItem.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object),
};
