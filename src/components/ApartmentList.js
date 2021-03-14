import '../css/ApartmentSearch.css'

const ApartmentList = ({ apartments }) => {

  return (
    <div>
      {apartments.map((apartment) => (
        <div className="apartment-preview" key={apartment._id}>
          <img src={apartment.gallery[0]} alt="" className="apartment-img" />
          <div className="apartment-description">
          <h3>{apartment.city}</h3>
            <p>{apartment.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApartmentList;