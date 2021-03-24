import React, { useState } from 'react';
import CatInputs from './CatInputs';

const CatForm = () => {
  const blankUrl = { url: '' };
  const [urlState, setUrlState] = useState([{ ...blankUrl }]);

  const addUrl = () => {
    setUrlState([...urlState, { ...blankUrl }]);
  };

  const handleUrlChange = (e) => {
    const updatedUrls = [...urlState];
    updatedUrls[e.target.dataset.index][e.target.className] = e.target.value;
    setUrlState(updatedUrls);
  };

  const consoleLog = (e) => {
    e.preventDefault();
    console.log(urlState, 'urls')
  }


  return (
    <form>
      <input
        type="button"
        value="Add New Url"
        onClick={addUrl}
      />
      {
        urlState.map((val, index) => (
          <CatInputs
            key={`url-${index}`}
            index={index}
            urlState={urlState}
            setUrlState={setUrlState}
            handleUrlChange={handleUrlChange}
          />
        ))
      }
      <button onClick={(e) => consoleLog(e)}>Console Log</button>
    </form>
  );
};

export default CatForm;