import React from 'react';
import "../css/FooterStyles.css";
import { Link } from 'react-router-dom';
import App from "../../../img/home-banner/app.jpg";
import Play from "../../../img/home-banner/play.jpg";
import Pay from "../../../img/home-banner/pay.png";
import { FaFacebookSquare } from 'react-icons/fa';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer'>
		<div className="col_footer">
			<div className="f-logo_footer">
                <h2>Pregrad</h2>
            </div>
			
            <h5>Pregrad the career <br></br>accelerator and live training <br></br>platform. Start your career early.</h5>
			{/* <h4>Contact</h4>
			<p><strong>Address: </strong>G-9, 1st Floor, Sector-6 Noida-201307</p>
			<p><strong>Phone: </strong>+91 8800527540</p>
			<p><strong>Hours: </strong>10:00 - 18:00, Mon - Sun</p> */}
			<div className="follow_footer">
				<h4>Follow Us</h4>
				<div className="icon_footer">
                    <FaFacebookSquare className='icon_logos_footer' />
                    <BsInstagram className='icon_logos_footer' />
                    <AiFillYoutube className='icon_logos_footer' />
                    <BsTwitter className='icon_logos_footer' />
				</div>
			</div>
		</div>
		
		<div className="col_footer">
			<h4>About</h4>
			<Link to="/">About us</Link>
			<Link to="/">Privacy Policy</Link>
			<Link to="/">Terms & Conditions</Link>
			<Link to="/">Contact Us</Link>
		</div>
		
		<div className="col_footer">
			<h4>My Account</h4>
            <Link to="/signup">Sign Up</Link>
			<Link to="/login">Login</Link>
			<Link to="/company">Company</Link>
			<Link to="/">Student</Link>
		</div>

        <div className="col_footer">
			<h4>Contact</h4>
			<p><strong>Address: </strong>G-9, 1st Floor, Sector-6 Noida-201307</p>
			<p><strong>Phone: </strong>+91 8800527540</p>
			<p><strong>Hours: </strong>10:00 - 18:00, Mon - Sun</p>
		</div>
		
		{/* <div className="col_footer install_footer">
			<h4>Install App</h4>
			<p>From App Store or Google Play</p>
			<div className="row_footer">
				<img src={App} alt="app" />
				<img src={Play} alt="play" />
			</div>
			<p>Secured Payment Gateways</p>
			<img src={Pay} alt="pay" />
		</div> */}
	</div>
  )
}

export default Footer
