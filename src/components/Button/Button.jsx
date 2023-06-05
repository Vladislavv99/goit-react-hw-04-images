import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div className="Btn">
      <button onClick={onClick} className="Button">
        LOAD MORE
      </button>
    </div>
  );
};

Button.propTypes = {
  changePage: PropTypes.func,
};
