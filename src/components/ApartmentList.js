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
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApartmentList;