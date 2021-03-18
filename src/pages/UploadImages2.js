import '../css/UploadImages.css'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      // background: 'red',
      margin: theme.spacing(1)
    }
  },
  button: {
    margin: theme.spacing(1)

  }
}))



export default function UploadImages() {
  const [inputFields, setInputFields] = useState([''])
  const classes = useStyles()

  const handleChangeInput = (index, event) => {
    const values = [...inputFields]

    values[index] = event.target.value
    setInputFields(values)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('input field', inputFields)
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, ''])
  }

  const handleRemoveFields = (index) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }

  return (
    <div className="UploadImagesContainer">
      <h1>Add image links</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        {
          inputFields.map((inputField, index) => (
            <div key={index}>

              <TextField
                name="url"
                label="Link to picture"
                variant="filled"
                value={inputField.url}
                onChange={event => handleChangeInput(index, event)}
              />
              <IconButton onClick={() => handleRemoveFields(index)}>
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => handleAddFields()}>
                <AddIcon />
              </IconButton>
            </div>
          ))
        }
        <Button
          onClick={handleSubmit}
          className={classes.button}
          variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </div >
  )
}