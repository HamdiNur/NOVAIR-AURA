import { SITE, whatsappLink } from "@/data/site.config";
import "./sections.css";

const STEPS = [
  { title: "Choose", text: "Pick your fragrance from the collection." },
  { title: "Message us", text: "Tap the button and send the pre-written message on WhatsApp." },
  { title: "Receive", text: "We confirm the price and delivery, then send it to you." },
];

export default function OrderSection() {
  return (
    <section id="order" className="band band--deep" aria-labelledby="order-title">
      <div className="band__inner">
        <p className="eyebrow">Order</p>
        <h2 id="order-title" className="band__title">How to order</h2>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="steps__item">
              <span className="steps__num" aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <p className="band__text">{SITE.deliveryAreas}</p>

        <a
          className="btn"
          href={whatsappLink("Hi NOVAIR, I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Order on WhatsApp
        </a>
      </div>
    </section>
  );
}