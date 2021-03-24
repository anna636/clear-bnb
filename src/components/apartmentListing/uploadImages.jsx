import '../../css/UploadImages.css'
import React, { useState } from 'react'
import styled from 'styled-components'


export function UploadImages() {
  const [inputFields, setInputFields] = useState([''])

  const handleChangeInput = (index, event) => {
    const values = [...inputFields]
    values[index] = event.target.value
    setInputFields(values)
  }

  const handleSubmit = (e) => {
    const notEmptyStrings = []
    e.preventDefault();
    inputFields.forEach(item => {
      if (!notEmptyStrings.includes(item) && item !== '') {
        notEmptyStrings.push(item)
      }
      return notEmptyStrings;
    })
    return notEmptyStrings;
  }

  const handleAddFields = event => {
    event.preventDefault()
    const values = [...inputFields, '']
    setInputFields(values)
  }

  const handleRemoveFields = (index) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }

  const UploadForm = styled.span`
  width: 100%;
input {
    margin: 5px;
  }
button {
    margin: 5px;
  }
  `

  return (
    <div className="container" id="uploadImages">
      <h1>Add image links</h1>
      <UploadForm>
        {
          inputFields.map((inputField, index) => (
            <div key={index} className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
                placeholder="Enter image url"
                value={inputField}
                onChange={event => handleChangeInput(index, event)}
              />
              <button className="btn btn-outline-secondary" onClick={() => handleRemoveFields(index)}>
                <i className="fas fa-minus"></i>
              </button>
            </div>
          ))
        }
        <button className="btn btn-outline-secondary" onClick={event => handleAddFields(event)}>
          <i className="fas fa-plus"></i>
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={handleSubmit}
          type="submit">Submit</button>
        <button
          className="btn btn-outline-secondary"
          onClick={(e) => {
            e.preventDefault();
            console.log(handleSubmit(e))
          }
          }>console log result</button>
      </UploadForm>
    </div >
  )
}