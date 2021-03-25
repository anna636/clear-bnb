import React, { useState } from 'react'

export function UploadImages(props) {
  const { inputFields, setInputFields } = props

  const handleChangeInput = (index, event) => {
    const values = [...inputFields]
    values[index] = event.target.value
    setInputFields(values)
  }

  const handleAddFields = event => {
    event.preventDefault()
    const values = [...inputFields, '']
    setInputFields(values)
  }

  const handleRemoveFields = (e, index) => {
    e.preventDefault()
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }

  return (
    <div className="container" id="uploadImages">
      <h1>Add image links</h1>
      <span>
        {
          inputFields.map((inputField, index) => (
            <div key={index} className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control"
                id="basic-url"
                placeholder={`www.example.com/image${index + 1}.jpg`}
                value={inputField}
                onChange={event => handleChangeInput(index, event)}
              />
              <button className="btn btn-outline-secondary" onClick={(e) => handleRemoveFields(e, index)}>
                <i className="fas fa-minus"></i>
              </button>
            </div>
          ))
        }
        <button className="btn btn-outline-secondary" onClick={event => handleAddFields(event)}>
          <i className="fas fa-plus"></i>
        </button>
      </span>
    </div >
  )
}