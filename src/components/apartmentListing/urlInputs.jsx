import React from 'react';
import PropTypes from 'prop-types';

UrlInputs.propTypes = {
  index: PropTypes.number,
  urlState: PropTypes.array,
  handleUrlChange: PropTypes.func,
  setUrlState: PropTypes.func,
};

export function UrlInputs(props) {

  // const index = props.index;
  // const urlState = props.urlState;
  // const setUrlState = props.setUrlState;
  // const handleUrlChange = props.handleUrlChange;

  const { index, urlState, setUrlState, handleUrlChange } = props

  const urlId = `url-${index}`;

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
        url={urlId}
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



