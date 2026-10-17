import NMark from "@/components/NMark";
import { SITE } from "@/data/site.config";
import "./sections.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <NMark size={26} />
          <span className="brand__word">{SITE.brand}</span>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            <li><a href="#about">About</a></li>
            <li><a href="#order">Order</a></li>
            <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={SITE.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></li>
            <li><a href={`mailto:${SITE.email}`}>Email</a></li>
          </ul>
        </nav>

        <p className="footer__legal">© {new Date().getFullYear()} {SITE.brand}. All rights reserved.</p>
      </div>
    </footer>
  );
}