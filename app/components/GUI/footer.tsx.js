import React from 'react';
import { useNavigate, useLocation } from '@remix-run/react';



//footer


const Footer = () => {
      return (
      <footer class="footer" id='footer'>
        <div class="moto" >
          <p class='coded' id='coded'> <> </p>
            <p class='textMoto' id='with'> with </p>
            <p class='luv' id='luv'> 💗 </p>
            <p class='textMoto' id='by'> by </p>
            <a href="https://eduardovasquez.rocks/" target="blanck"><img class='EdLogo' id='EdLogo' src="./media/imagenes/logo/Logopeque.png"></a>

        </div>




        <div class='lanBan' id='lanBan'>
          <div class='sound' id='sound'><img class='ig' id='iconSound' src="./media/imagenes/Sound Icon/Sound Icon/0.5x/Asset 21@0.5x.png"></div>

                {/* <!--div class="lang">
                  <p class='lan' id='lanEn'>En </p>
                  </div><p class='slash2' >/</p>
                  <div class="lang">
                    <p class='lan' id='lanFr'>Fr </p>

                  </div><p class='slash2' >/</p>
                  <div class="lang">
                    <p class='lan' id='lanEs'>Es</p>
                </div--> */}
          <div class="social" >

            <a href="https://www.facebook.com/nikaimci/" target="blank"><img class='fb' id='fb' src="./fblogo.png"></a>

            <a href="https://www.instagram.com/nikai.xyz/" target="blank"><img class='ig' id='ig' src="./media/imagenes/social media/GlyphLogo_May2016_Onlinev2/glyph-logo_white_May2016.png"></a>

          </div>
        </div>
      </footer >
      )   
}

{/* export default Footer;   */}

export { Footer };