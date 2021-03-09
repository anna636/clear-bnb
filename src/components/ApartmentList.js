const ApartmentList = ({ apartments }) => {

  return (
    <div className="apartment-list">
      {apartments.map((apartment) => (
        <div className="apartment-preview" key={apartment.id}>
          <img src={apartment.img} alt="" />
          <h3>{apartment.type}</h3>
          <p>{apartment.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ApartmentList;