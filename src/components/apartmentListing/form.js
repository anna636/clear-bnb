import React, { useState } from 'react';
import CatInputs from './CatInputs';

const CatForm = () => {
  const blankCat = { name: '' };
  const [catState, setCatState] = useState([{ ...blankCat }]);

  const addCat = () => {
    setCatState([...catState, { ...blankCat }]);
  };

  const handleCatChange = (e) => {
    const updatedCats = [...catState];
    updatedCats[e.target.dataset.idx][e.target.className] = e.target.value;
    setCatState(updatedCats);
  };

  const consoleLog = (e) => {
    e.preventDefault();
    console.log(catState, 'urls')
  }


  return (
    <form>
      <input
        type="button"
        value="Add New Cat"
        onClick={addCat}
      />
      {
        catState.map((val, idx) => (
          <CatInputs
            key={`cat-${idx}`}
            idx={idx}
            catState={catState}
            handleCatChange={handleCatChange}
          />
        ))
      }
      <button onClick={(e) => consoleLog(e)}>Console Log</button>
    </form>
  );
};

export default CatForm;