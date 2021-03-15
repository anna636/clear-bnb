import '../css/ApartmentSearch.css'

const ApartmentList = ({ apartments }) => {

  return (
    <div>
      {apartments.map((apartment) => (
        <div className="apartment-preview" key={apartment._id}>
          <div className="img-container">
            <img src={apartment.gallery[0]} alt="" className="apartment-img" />
          </div>
          <div className="apartment-description">
            <h3>{apartment.title} | { apartment.city }</h3>
            <p>{apartment.description}</p>
            {apartment.amenities.map((amenity) => (
              <div className="amenities" key={amenity.id} style={{ fontSize: "15px" }, { color: "rgb(82, 82, 82)"}}>
                <p> -{ amenity.name } </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApartmentList;