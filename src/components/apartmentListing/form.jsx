import React, { useState } from 'react';
import { UrlInputs } from './urlInputs';
import styled from 'styled-components'


export function UrlForm() {
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

  const ContainerDiv = styled.div`
  margin-top: 30px;
  `

  const UploadForm = styled.span`
  width: 100%;
  input {
      margin: 5px;
      width: 300px;
    }
  button {
      margin: 5px;
    }
  `

  return (
    <div className="container">
      <form>
        {
          urlState.map((url, index) => (
            <UrlInputs
              key={`url-${index}`}
              index={index}
              value={url}
              urlState={urlState}
              setUrlState={setUrlState}
              handleUrlChange={handleUrlChange}
            />
          ))
        }
        <button
          onClick={addUrl}
          className="btn btn-outline-secondary">
          <i className="fas fa-plus"></i>
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={(e) => consoleLog(e)}>Console Log</button>
      </form>
    </div>
  );
};