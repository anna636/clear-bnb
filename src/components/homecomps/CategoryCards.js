import '../../css/CategoryCards.css';

export default function CategoryCards() {
  return (
    <div className="container">
      <h1>Typer av boenden</h1>
      <div className="categories">
        <div className="house-category-card category-card">
          <img src="https://i.imgur.com/aT5ei7L.jpg"
               className="category-img"
          />
          <h2>Hus</h2>
          <div className="category-description">
            <h3></h3>
          </div>
        </div>
        <div className="apartment-category-card category-card">
          <img src="https://i.imgur.com/14aRNot.jpg"
               className="category-img"
          />
          <h2>Lägenheter</h2>
          <div className="category-description">
            <h3></h3>
          </div>
        </div>
        <div className="cabin-category-card category-card">
          {/* kanske ha en div av samma storlek i denna och vid hover så poppar den upp med text information om kategorin, klickar man går man vidare */}
          <img src="https://i.imgur.com/Z0lwKtq.jpg"
               className="category-img"
          />
          <h2>Stugor</h2>
          <div className="category-description">
            <h3></h3>
          </div>
        </div>
      </div>
    </div>
  )
}