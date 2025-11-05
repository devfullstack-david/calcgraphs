import "@/styles/components.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        CalcGraphs
      </div>
      <div className="navbar-menu">
        <ul>
          <li><Link href='/'>Principal</Link></li>
          <li><Link href='/about-us'>Sobre nós</Link></li>
          <li><Link href='/graphs'>Grafos</Link></li>
          <li><Link href='/algorithms'>Algoritmos</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar