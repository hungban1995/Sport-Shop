import Link from "next/link";
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
import { AiOutlineCreditCard } from "react-icons/ai";
import { RiVisaLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineDeliveryDining } from "react-icons/md";

function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h4>About us</h4>
          <strong>Name Shop</strong>
          <p>01 Text Street, Text City</p>
          <p>
            <span>Call: +8412345678</span>
          </p>
          <p>
            <span>Email: demo@email.com</span>
          </p>
          <p>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced
          </p>
        </div>
        <div className="item">
          <h4>Help</h4>
          <div className="itemMenu">
            <Link href={"#"}>FAQ</Link>
            <Link href={"#"}>Shipping</Link>
            <Link href={"#"}>Returns</Link>
            <Link href={"#"}>Order Status</Link>
            <Link href={"#"}>24/7 Support</Link>
          </div>
        </div>
        <div className="item">
          <h4>Payment And Delivery</h4>
          <span>Payment</span>
          <p>
            <AiOutlineCreditCard className="icon" />{" "}
            <RiVisaLine className="icon" />
          </p>
          <span>Delivery</span>
          <p>
            <TbTruckDelivery className="icon" />{" "}
            <MdOutlineDeliveryDining className="icon" />
          </p>
        </div>
        <div className="item">
          <h4>Connect with Us</h4>
          <span>
            <Link className="icon" href={"#"}>
              <CiFacebook />
            </Link>
            <Link className="icon" href={"#"}>
              <CiTwitter />
            </Link>
            <Link className="icon" href={"#"}>
              <CiInstagram />
            </Link>
            <Link className="icon" href={"#"}>
              <CiYoutube />
            </Link>
          </span>
        </div>
      </div>
      <div className="bottom">
        <span style={{ color: "white" }}>© 2023 Copyright: </span>
        <strong style={{ color: "#bab6b6" }}>name</strong>
      </div>
    </div>
  );
}
export default Footer;
