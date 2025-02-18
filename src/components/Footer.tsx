import React from "react"
import { Link } from "react-router-dom"
import "../styles/HeaderFooter.css"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-link-container">
        <h3>Resources</h3>
        <Link to="https://docs.google.com/document/d/1p7DhCsLOMMybYfePWLlD1-_8KU20zkBoArH4pnW1o3c/edit?tab=t.0" className="footer-link">
            The Bank
        </Link>
        <Link to="https://communitytaught.org/" className="footer-link">
            CommunityTaught.org
        </Link>
        <Link to="https://100devs.org/" className="footer-link">
            100Devs
        </Link>
        </div>
    </footer>
  )
}

export default Footer

