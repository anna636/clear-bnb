import '../css/ApartmentSearch.css'
import { useHistory } from 'react-router-dom'


const ApartmentList = ({ apartments }) => {
  const history = useHistory();
  return (
    <div>
      {apartments.map((apartment) => (
        <div
        onClick={() => history.push('/details/' + apartment._id)}
          className="apartment-preview" key={apartment._id}>
          <div className="img-container">
            <img src={apartment.gallery[0]} alt="" className="apartment-img" />
          </div>
          <div className="apartment-description">
            <h3>{apartment.title} | { apartment.city }</h3>
            <p>{apartment.description}</p>
            {apartment.amenities.map((amenity) => (
              <div className="amenities" key={amenity.id} style={{ fontSize: "15px" }, { color: "rgb(82, 82, 82)"}}>
                <i className={amenity.icon}/> <span>{amenity.name} </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApartmentList;