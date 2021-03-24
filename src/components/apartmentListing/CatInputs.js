import React from 'react';
import PropTypes from 'prop-types';

const CatInputs = ({ index, urlState, setUrlState, handleUrlChange }) => {
  const urlId = `name-${index}`;

  const removeUrl = (e) => {
    e.preventDefault();
    const values = [...urlState]
    values.splice(index, 1)
    setUrlState(values)
  }

  return (
    <div key={`url-${index}`}>
      <label htmlFor={urlId}>{`Url #${index + 1}`}</label>
      <input
        type="text"
        name={urlId}
        data-index={index}
        id={urlId}
        className="url"
        value={urlState[index].url}
        onChange={handleUrlChange}
      />
      <button onClick={(e) => removeUrl(e)}>Remove</button>

    </div >
  );
};

CatInputs.propTypes = {
  index: PropTypes.number,
  urlState: PropTypes.array,
  handleUrlChange: PropTypes.func,
  setUrlState: PropTypes.func,
};

export default CatInputs;