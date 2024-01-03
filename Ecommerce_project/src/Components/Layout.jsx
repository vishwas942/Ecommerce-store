// import React from "react"
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import {Helmet, HelmetProvider} from 'react-helmet-async'
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



const Layout = (props) => {
  return (
    <>
    <HelmetProvider>
    <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={props.description} />
                <meta name="keywords" content={props.keywords} />
                <meta name="author" content={props.author} />
                <title>{props.title}</title>
            </Helmet>
            </HelmetProvider>
      <Header/>
      
     <div style={{"minHeight":"75vh"}} > {props.children} </div>
      <Footer/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title:PropTypes.string.isRequired,
  description:PropTypes.string.isRequired,
  keywords:PropTypes.string.isRequired,
  author:PropTypes.string.isRequired,
  };

Layout.defaultProps = {
  title:"Shopkar Befikar",
  description:"MERN stack Project",
  keywords:"Mern,React,Node,Exoress,Mongodb",
  author:"Vishwas"

}

export default Layout
