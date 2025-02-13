import SchoolCard from "./SchoolCard";
import Charts from "./Charts";

const Home = () => {
  return (
    <div className="container mt-3">
      <h3 className="text-center">
        Welcome to the dashboard of Ministry of Education and Sports
      </h3>
      <br />
      <div className="black"></div>
      <div className="yellow"></div>
      <div className="red"></div>
      <div className="home">
        <SchoolCard />
        <Charts />
      </div>
    </div>
  );
};

export default Home;
