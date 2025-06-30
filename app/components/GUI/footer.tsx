import React from 'react';
import { useNavigate, useLocation } from '@remix-run/react';



//footer


const Footer = () => {
      return (
      <footer className="footer" id='footer'>
        <div className="moto" >
          <p className='coded' id='coded'> {'<>'} </p>
            <p className='textMoto' id='with'> with </p>
            <p className='luv' id='luv'> ❤️ </p>
            <p className='textMoto' id='by'> by </p>
            <a href="/about/team/ed" >
              <img className='EdLogo' id='EdLogo' src="./media/imagenes/Logo/Logopeque.png"/>
            </a>

        </div>




        <div className='lanBan' id='lanBan'>
          <div className='sound' id='sound'><img className='ig' id='iconSound' src="./media/imagenes/Sound Icon/Sound Icon/0.5x/Asset 21@0.5x.png"/></div>

                {/* <!--div class="lang">
                  <p class='lan' id='lanEn'>En </p>
                  </div><p class='slash2' >/</p>
                  <div class="lang">
                    <p class='lan' id='lanFr'>Fr </p>

                  </div><p class='slash2' >/</p>
                  <div class="lang">
                    <p class='lan' id='lanEs'>Es</p>
                </div--> */}
          {/* <div className="social" >

            <a href="https://www.facebook.com/nikaimci/" target="blank"><img className='fb' id='fb' src="./fblogo.png"/></a>

            <a href="https://www.instagram.com/nikai.xyz/" target="blank"><img className='ig' id='ig' src="./media/imagenes/social media/GlyphLogo_May2016_Onlinev2/glyph-logo_white_May2016.png"/></a>

          </div> */}
        </div>
      </footer >
      )   
}

{/* export default Footer;   */}

export { Footer };