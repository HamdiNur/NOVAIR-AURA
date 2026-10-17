import { SITE } from "@/data/site.config";
import "./sections.css";

export default function AboutSection() {
  return (
    <section id="about" className="band" aria-labelledby="about-title">
      <div className="band__inner band__inner--narrow">
        <p className="eyebrow">About</p>
        <h2 id="about-title" className="band__title">{SITE.about.title}</h2>
        {SITE.about.body.map((text) => (
          <p key={text} className="band__text">{text}</p>
        ))}
      </div>
    </section>
  );
}