import Image from "next/image";
import styles from "../../styles/Home.module.css";
import classes from "./footer.module.css";

const Footer = (props) => {
  const footerClass = props.fixed
    ? `${classes.footer} position-fixed`
    : classes.footer;
  return (
    <div className={footerClass}>
      <div className="text-center my-2 text-white">Powered by</div>
      <span className={styles.logo}>
        <Image
          className={classes.logo_image}
          src="/images/dair-logo.png"
          alt="CRM Logo"
          width={220}
          height={30}
        />
      </span>
    </div>
  );
};

export default Footer;
