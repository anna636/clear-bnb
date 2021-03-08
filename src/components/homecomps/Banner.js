import '../../css/Banner.css'

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-info">
        <h2 className="banner-info-title">Hyr ut eller hyr själv!</h2>
        <h4 className="banner-info-text">
          Låt inte sökandet av bostad hindra dig från att resa och utforska dina destinationer. <br/>
          Planera en annorlunda resa med hjälp av oss.
        </h4>
        <button className="banner-info-btn">Utforska boenden</button>
      </div>
    </div>
  )
}