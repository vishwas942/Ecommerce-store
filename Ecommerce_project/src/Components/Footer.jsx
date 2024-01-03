import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>        
    <div className="bg-dark text-light p-3">    
    <p className="display-6 text-center">All rights reserved &copy; Webstreet</p> 

    <p className="m-3 text-center">
        <Link className="m-2" to="/about">About</Link>|
        <Link className="m-2" to="/contact">Contact</Link>|
        <Link className="m-2" to="/policy">Policy</Link>

    </p>
</div>
    </>

  )
}

export default Footer
