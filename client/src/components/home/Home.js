import "./Home.css";
import articleImage from "../../assets/man.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  return (
    <div className='articleHome'>
      <h1 style={{color:'var(--crimson)'}}>Publish your passions, your way</h1>
      <div className="d-flex">
      <img src={articleImage} alt="" className="artcleImage" />
      <div >
      <p className="lead">
      Share your story with the world. Create a beautiful, personalized blog that fits your brand. Grow your audience with built-in marketing tools, or transform your passion into revenue by gating access with a paywall.
      </p>
      <button className="btn rounded" style={{backgroundColor:"#105769",color:"#ffffff"}} onClick={()=>navigate('/signin')}>GET STARTED</button>
      </div>
      </div>
    </div>
  );
}

export default Home;
