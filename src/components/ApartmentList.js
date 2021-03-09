import { useHistory } from 'react-router-dom'


const ApartmentList = ({ apartments }) => {
  const history = useHistory();
  return (
    <div className="apartment-list" >
      
      {apartments.map((apartment) => (
        <div 
        className="apartment-preview" 
        key={apartment._id} 
        onClick={() => history.push('/details/' + apartment._id)}
        >
          <img src={apartment.gallery[0]} alt="" />
          <h3>{apartment.city}</h3>
          <p>{apartment.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ApartmentList;