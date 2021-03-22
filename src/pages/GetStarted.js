import "../css/GetStarted.css"

export default function GetStarted() {
  

  return (
    <div className="getstarted-root">
      <div className="text-container">
        <div className="img-container">
          <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt=""/>
        </div>
        <div className="search-wrapper">
        <h2>Searching for place to stay?</h2>
        <p>Log in or quickly create an account by clicking the icon in the top right</p>
        <p>Type in your desired location in the search bar or get inspired by popular destinations</p>
        <p>Enter your dates in the calendar or be flexible and skip straight to apartments</p>
        <p>Pick your favourite apartment</p>
        <p>Hit reserve and secure your stay!</p>
        </div>
        <div className="img-container2">
          <img src="https://images.unsplash.com/photo-1570823968779-a8276e094e1e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" alt=""/>
        </div>
      <div className="rentout-wrapper">
        <h2>Renting your place out?</h2>
        <p>Log in or create an account by clicking the icon in the top right</p>
        <p>Go to 'My Apartments' and click 'Add Listing'</p>
        <p>Add as many details you can to make your listing stand out and hit publish!</p>
        </div>
      </div>
    </div>
  )
}