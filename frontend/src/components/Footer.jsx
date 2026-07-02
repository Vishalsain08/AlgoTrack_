import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto border-t border-gray-700">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* Left Section */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-semibold">AlgoTrack</h3>
            <p className="text-gray-400 mt-1">
              Stay updated with coding competitions
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-5">

            {/* GitHub */}
            <a
              href="https://github.com/YOUR_GITHUB_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <FaGithub size={22} />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/vishalsain004/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedin size={22} />
              <span>LinkedIn</span>
            </a>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} AlgoTrack. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;