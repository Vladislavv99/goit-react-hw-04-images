import {  useEffect } from 'react';

export const Modal =({closeModal, modalData})=> {

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) return;
    closeModal();
  };
 const handleCloseByEsc = (e) => {
    if (e.code !== "Escape") return;
    closeModal();
  };

  useEffect(()=>{
    window.addEventListener("keydown", handleCloseByEsc);
  }) 

  useEffect(()=>{
    window.removeEventListener("keydown", handleCloseByEsc);
  }) 

    const {url} = modalData;
    return (
      <div className="Overlay" onClick={handleBackdropClick}>
        <div className="Modal">
          <img 
          src={url} 
          alt="" />
        </div>
      </div>
    );
  }

// import { Component } from 'react';

// export class Modal extends Component {
//   closeByEscape = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   closeByBackdrop = event => {
//     if (event.currentTarget === event.target) {
//       this.props.closeModal();
//     }
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.closeByEscape);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeByEscape);
//   }
//   render() {
//     const {
//       modalImage: { src, alt },
//     } = this.props;

//     return (
//       <div className="Overlay" onClick={this.closeByBackdrop}>
//         <div className="Modal">
//           <img src={src} alt={alt} />
//         </div>
//       </div>
//     );
//   }
// }