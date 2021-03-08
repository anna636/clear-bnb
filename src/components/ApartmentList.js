const ApartmentList = ({ apartments }) => {

  return (
    <div className="apartment-list">
      {apartments.map((apartment) => (
        <div className="apartment-preview" key={apartment.id}>
          <img src={apartment.img} alt="" />
          <h1>{apartment.type}</h1>
          <h3>{apartment.description}</h3>
        </div>
      ))}
    </div>
  );
}

export default ApartmentList;