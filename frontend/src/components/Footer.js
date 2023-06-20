function Footer({loggIn}) {
  return (
    <footer className={loggIn ? "footer" : "footer_hidden"}>
      <p className="footer__title">© {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;