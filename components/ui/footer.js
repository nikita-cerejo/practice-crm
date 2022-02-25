import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Footer = () => {
  return (
    <>
      <div className="text-center my-2 text-muted">Powered by</div>
      <span className={styles.logo}>
        <Image
          src="/images/dair-logo.png"
          alt="CRM Logo"
          width={220}
          height={30}
        />
      </span>
    </>
  );
};

export default Footer;
