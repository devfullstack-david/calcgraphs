import "@/styles/components.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <Link href='/' className="link-customized">
          CalcGraphs
        </Link>
      </div>
      <div className="navbar-menu">
        <ul>
          <li><Link href='/calcgraph'>Aplicação</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar