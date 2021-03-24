import React from 'react';
import PropTypes from 'prop-types';

const CatInputs = ({ idx, catState, handleCatChange }) => {
  const catId = `name-${idx}`;

  const removeUrl = (e, idx) => {
    e.preventDefault();
    console.log('clicked on', idx)
  }

  return (
    <div key={`cat-${idx}`}>
      <label htmlFor={catId}>{`Url #${idx + 1}`}</label>
      <input
        type="text"
        name={catId}
        data-idx={idx}
        id={catId}
        className="name"
        value={catState[idx].name}
        onChange={handleCatChange}
      />
      <button onClick={(e) => removeUrl(e)}>Remove</button>

    </div >
  );
};

CatInputs.propTypes = {
  idx: PropTypes.number,
  catState: PropTypes.array,
  handleCatChange: PropTypes.func,
};

export default CatInputs;