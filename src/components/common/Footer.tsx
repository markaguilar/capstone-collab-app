import { NavLink } from "react-router";

import {
  faGithub,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Capstone Connect</h3>
            <p className="text-gray-300">
              Bridging students with skilled developers for successful capstone
              projects.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:text-blue-300">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/projects" className="hover:text-blue-300">
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/messages" className="hover:text-blue-300">
                  Messages
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/faq" className="hover:text-blue-300">
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact-us" className="hover:text-blue-300">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy-policy" className="hover:text-blue-300">
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <NavLink
                to="#"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500"
              >
                <FontAwesomeIcon icon={faXTwitter} className="" />
              </NavLink>
              <NavLink
                to="#"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500"
              >
                <FontAwesomeIcon icon={faLinkedin} className="" />
              </NavLink>
              <NavLink
                to="#"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500"
              >
                <FontAwesomeIcon icon={faGithub} className="" />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Capstone Connect. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
