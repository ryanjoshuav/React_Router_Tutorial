import { FaLaptop, FaTablet, FaMobileAlt } from "react-icons/fa";
import useWindowSize from "./hooks/useWindowSize";

const Header = ({ title }) => {
  const { width } = useWindowSize();
  return (
    <header className="Header">
      <h1>{title}</h1>
      {width < 769 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTablet />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

export default Header;
