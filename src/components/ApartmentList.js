const ApartmentList = ({ apartments }) => {

  return (
    <div className="apartment-list">
      {apartments.map((apartment) => (
        <div className="apartment-preview" key={apartment.id}>
          <h1>{apartment.type}</h1>
          <h2>{apartment.description}</h2>
        </div>
      ))}
    </div>
  );
}

export default ApartmentList;