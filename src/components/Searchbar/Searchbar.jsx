import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import Notiflix from 'notiflix';

export const Searchbar =({handleSearch})=> {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
   
    if (value.trim() === '') {
      Notiflix.Report.failure('😡 Error','Please enter a value before searching.');
    } else {
      handleSearch(value);
    }
  }; 
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <ImSearch size="1.5rem" />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    );
  }

// import PropTypes from 'prop-types';
// import { Component } from 'react';
// import { BsSearch } from 'react-icons/bs';

// class Searchbar extends Component {
//   state = { query: '' };

//   handleChange = e => {
//     this.setState({ query: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.query.trim() === '') return;
//     this.props.onSubmit(this.state.query);
//     this.setState({ query: '' });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form onSubmit={this.handleSubmit} className="SearchForm">
//           <button type="submit" className="SearchForm-button">
//             <BsSearch style={{ height: '20px', width: '30px' }} />
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.query}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default Searchbar;