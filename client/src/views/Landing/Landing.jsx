import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Landing = () => {
  return (
    <div>
      <h1>Bienvenidos!</h1>
      <div>
        <Link to="/home">Ingresar</Link>
      </div>
    </div>
  );
};

export default Landing;
