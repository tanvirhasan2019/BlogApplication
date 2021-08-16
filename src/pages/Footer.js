
import React from 'react'
import logo from '../images/memories_icon.jpg'
import './footer.css'

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

export const Footer = () => {
    return (
        <div className="footer-main">
            <div className="row">
               <div className="col-6 d-flex justify-content-around align-items-center">
                  <img src={logo} className="img-fluid" alt="empty" />
               </div>
               <div className="col-6 d-flex justify-content-around align-items-center">                
                      <ul className="flex-column d-flex justify-content-around align-items-center">                         
                            <FacebookIcon fontSize="large" className="li-social-icon" />
                            <InstagramIcon fontSize="large" className="li-social-icon" />
                            <MailIcon fontSize="large" className="li-social-icon" />
                            <LinkedInIcon fontSize="large"  className="li-social-icon" />
                            <TwitterIcon fontSize="large" className="li-social-icon" />
                      </ul>                  
               </div>
            </div>
            <div className="row">
                <p className="footer-text">
                   The most beautiful things are not associated with money, they are memories and moments
                </p>
            </div>
        </div>
    )
}

