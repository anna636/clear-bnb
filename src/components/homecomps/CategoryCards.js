import '../../css/CategoryCards.css';

export default function CategoryCards() {
  return (
    <div className="cat-container">
      <h1>Typer av boenden</h1>
      <div className="categories">
        <div className="house-category-card category-card">
          <h2>Hus</h2>
          <img src="https://i.imgur.com/aT5ei7L.jpg"
            className="category-img" alt=""
          />
          <div className="category-description">
            {/* <h3></h3> */}
          </div>
        </div>

        <div className="apartment-category-card category-card">
          <h2>Lägenheter</h2>
          <img src="https://i.imgur.com/14aRNot.jpg"
            className="category-img" alt=""
          />

          <div className="category-description">
            {/* <h3></h3> */}
          </div>
        </div>

        <div className="cabin-category-card category-card">
          <h2>Stugor</h2>
          <img src="https://i.imgur.com/Z0lwKtq.jpg" alt=""
            className="category-img"
          />
          <div className="category-description">
            {/* <h3></h3> */}
          </div>
        </div>
      </div>
    </div>
  )
}