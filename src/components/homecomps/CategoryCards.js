import '../../css/CategoryCards.css';

export default function CategoryCards() {
  return (
    <div className="cat-container">
      <h1>Types of apartments</h1>
      <div className="categories">
        <div className="house-category-card category-card">
          <img
            src="https://i.imgur.com/aT5ei7L.jpg"
            className="category-img"
            alt=""
          />
          <h2>Houses</h2>
          {/* <div className="category-description"><h3></h3></div> */}
        </div>

        <div className="apartment-category-card category-card">
          <img
            src="https://i.imgur.com/14aRNot.jpg"
            className="category-img"
            alt=""
          />
          <h2>Flats</h2>
          {/* <div className="category-description"><h3></h3></div> */}
        </div>

        <div className="cabin-category-card category-card">
          <img
            src="https://i.imgur.com/Z0lwKtq.jpg"
            alt=""
            className="category-img"
          />
          <h2>Cottages</h2>
          {/* <div className="category-description"><h3></h3></div> */}
        </div>
      </div>
    </div>
  );
}