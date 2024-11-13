
import { CiShoppingCart } from "react-icons/ci";
import { Button } from "./ui/button";
import { Link } from 'react-router-dom'
import { MdOutlineInventory2 } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const Navbar = () => {
  return (
    <>
    <div className="w-full bg-gradient-to-r from-[#000000] to-[#0A0903] text-white p-2">
        <div className="flex justify-between  items-center md:justify-around ">
        <Link to={'/'}>
          <div className="flex justify-center items-center scroll-m-20 md:text-3xl text-xl font-extrabold tracking-tighter sm:tracking-tight lg:text-4xl">
           Product Store <CiShoppingCart size={"1.2em"} />
          </div>
        </Link> 
          <div className="flex gap-2">
            <Button asChild variant="secondary" size={"sm"} >
              <Link to="/create" > <FaPlus color="black"/>Create</Link>
            </Button>
            <Button asChild  className="outline" size={"sm"} >
              <Link to="/" > <MdOutlineInventory2 />Products</Link>
            </Button>
            


          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar