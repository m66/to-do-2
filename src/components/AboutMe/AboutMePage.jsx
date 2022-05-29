import "./aboutMePage.css";
import userImg from "../../images/cv-img1.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faTwitter,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

function AboutMePage() {
  return (
    <div className="about-me">
      <div className="about-me-content">
        <div className="info-wrapper">
          <div className="social-links">
            <div>
              <FontAwesomeIcon icon={faFacebook} />
            </div>
            <div>
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
            <div>
              <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div>
              <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div>
              <FontAwesomeIcon icon={faGithub} />
            </div>
          </div>
          <div className="info-wrapper-parts">
            <h2>I am</h2>
            <h1>Karen Manasyan</h1>
            <p>
              professional web developer with long time experience in this field
            </p>
            <div className="nav-link-btns">
              <button>My portfolio</button>
            </div>
          </div>
        </div>
        <div className="info-img">
          <img src={userImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AboutMePage;
