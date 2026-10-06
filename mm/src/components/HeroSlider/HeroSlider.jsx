import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaPause, FaPlay } from "react-icons/fa";
import "./HeroSlider.css";

const SLIDES = [
    {
        title: "Creating Homes,", highlight: "Building Wealth",
        badge: "Premium Real Estate Development · Abuja & Kano",
        description: "AMI Smart Homes & Properties Ltd delivers premium residential estates, smart homes, and investment-grade developments across Nigeria's fastest-growing cities.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
        action: "Explore Our Projects", href: "/properties",
    },
    {
        title: "A Place to Live,", highlight: "A Place to Belong",
        badge: "Victory Park Resort · Abuja",
        description: "Discover thoughtfully planned homes in Gwarinpa Extension, with space for family life, landscaped surroundings, and modern community living.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
        action: "Enquire About Victory Park", href: "/contact",
    },
    {
        title: "Modern Comfort,", highlight: "Closer to Home",
        badge: "AMI Residence · Abuja & Kano",
        description: "Explore contemporary residences in Kubwa and Bompai. Talk to our property team about available homes, site visits, and your next move.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
        action: "Discover AMI Residence", href: "/contact",
    },
];

const HeroSlider = ({ stats }) => {
    const [active, setActive] = useState(0);
    const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const touchStart = useRef(null);
    const slide = SLIDES[active];
    const move = (direction) => setActive((index) => (index + direction + SLIDES.length) % SLIDES.length);
    const choose = (index) => { setActive(index); setPlaying(false); };

    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = (event) => { if (event.matches) setPlaying(false); };
        preference.addEventListener("change", onChange);
        return () => preference.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        if (!playing || hovered || focused) return;
        const timer = window.setInterval(() => {
            if (!document.hidden) setActive((index) => (index + 1) % SLIDES.length);
        }, 6500);
        return () => window.clearInterval(timer);
    }, [playing, hovered, focused, active]);

    return (
        <section className="ami-hero ami-hero-slider" aria-label="Featured developments" aria-roledescription="carousel"
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
            onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault(); setPlaying(false); move(event.key === "ArrowLeft" ? -1 : 1);
                }
            }}
            onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
            onTouchEnd={(event) => {
                if (touchStart.current === null) return;
                const distance = touchStart.current - event.changedTouches[0].clientX;
                if (Math.abs(distance) > 60) { setPlaying(false); move(distance > 0 ? 1 : -1); }
                touchStart.current = null;
            }}>
            <div className="ami-hero-slider__images" aria-hidden="true">
                {SLIDES.map((item, index) => (
                    <img key={item.title} src={item.image} alt="" className={`ami-hero-slider__image ${index === active ? "is-active" : ""}`}
                        fetchPriority={index === 0 ? "high" : "low"} />
                ))}
            </div>
            <div className="ami-hero__overlay" />
            <div className="ami-container ami-hero__content">
                <div id="hero-slide" className="ami-hero-slider__slide" role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${SLIDES.length}`} aria-live={playing ? "off" : "polite"}>
                    <div className="ami-badge ami-hero__badge"><FaCheckCircle /> {slide.badge}</div>
                    <h1 className="ami-hero__title">{slide.title}<br /><span className="ami-gold-text">{slide.highlight}</span></h1>
                    <p className="ami-hero__subtitle">{slide.description}</p>
                    <div className="ami-hero__cta-row">
                        <Link className="ami-btn-primary ami-hero__cta-btn" to={slide.href}>{slide.action} <FaArrowRight /></Link>
                        <Link className="ami-btn-ghost ami-hero__cta-btn" to="/contact">Schedule a Consultation</Link>
                    </div>
                </div>
                <div className="ami-hero__stats">
                    {stats.map((stat) => <div key={stat.label} className="ami-hero__stat"><span className="ami-hero__stat-value">{stat.value}</span><span className="ami-hero__stat-label">{stat.label}</span></div>)}
                </div>
                <div className="ami-hero-slider__controls" aria-label="Slideshow controls">
                    <button aria-label="Previous slide" aria-controls="hero-slide" onClick={() => { setPlaying(false); move(-1); }}><FaArrowLeft /></button>
                    <div className="ami-hero-slider__dots">
                        {SLIDES.map((item, index) => <button key={item.title} className={`ami-hero-slider__dot ${index === active ? "is-active" : ""}`} aria-label={`Show slide ${index + 1}: ${item.title} ${item.highlight}`} aria-current={index === active ? "true" : undefined} aria-controls="hero-slide" onClick={() => choose(index)} />)}
                    </div>
                    <button aria-label="Next slide" aria-controls="hero-slide" onClick={() => { setPlaying(false); move(1); }}><FaArrowRight /></button>
                    <span className="ami-hero-slider__count" aria-hidden="true">0{active + 1} / 0{SLIDES.length}</span>
                    <button aria-label={playing ? "Pause slideshow" : "Play slideshow"} onClick={() => setPlaying(!playing)}>{playing ? <FaPause /> : <FaPlay />}</button>
                </div>
            </div>
        </section>
    );
};
export default HeroSlider;
