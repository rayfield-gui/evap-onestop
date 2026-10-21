"use client";

import { useEffect } from "react";

type Revealable = HTMLElement & { __rv?: Animation };

export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ease = "cubic-bezier(.2,.7,.2,1)";
    const loops: Animation[] = [];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          (en.target as Revealable).__rv?.play();
          io.unobserve(en.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll<Revealable>("[data-reveal]").forEach((el) => {
      if (el.__rv) return;
      const kind = el.dataset.reveal;
      let delay = Number(el.dataset.delay || 0);
      if (kind === "stagger" && el.parentElement) {
        const sibs = [...el.parentElement.children].filter(
          (c) => (c as HTMLElement).dataset?.reveal === "stagger",
        );
        delay += Math.min(sibs.indexOf(el), 8) * 90;
      }
      const from =
        kind === "hero"
          ? { opacity: 0, transform: "translateY(36px)", filter: "blur(6px)" }
          : { opacity: 0, transform: "translateY(28px)", filter: "blur(0px)" };
      const a = el.animate([from, { opacity: 1, transform: "none", filter: "blur(0px)" }], {
        duration: kind === "hero" ? 1000 : 800,
        delay,
        easing: ease,
        fill: "both",
      });
      a.pause();
      a.onfinish = () => a.cancel();
      el.__rv = a;
      if (kind === "hero") a.play();
      else io.observe(el);
    });

    document.querySelectorAll<HTMLElement>("[data-kenburns]").forEach((el) => {
      loops.push(
        el.animate([{ transform: "scale(1)" }, { transform: "scale(1.07)" }], {
          duration: 22000,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
        }),
      );
    });

    document.querySelectorAll<HTMLElement>("[data-drift]").forEach((el, i) => {
      const flip = el.dataset.drift === "flip" ? "scaleX(-1) " : "";
      loops.push(
        el.animate(
          [
            { transform: flip + "translate3d(0,0,0) scale(1.05)", opacity: 0.85 },
            { transform: flip + "translate3d(-3%,2%,0) scale(1.14)", opacity: 1 },
          ],
          { duration: 26000 + i * 4000, iterations: Infinity, direction: "alternate", easing: "ease-in-out" },
        ),
      );
    });

    document.querySelectorAll<HTMLElement>("[data-pulse]").forEach((el, i) => {
      loops.push(
        el.animate(
          [
            { boxShadow: "0 0 14px color-mix(in srgb, var(--color-accent) 25%, transparent)" },
            { boxShadow: "0 0 34px color-mix(in srgb, var(--color-accent) 60%, transparent)" },
          ],
          { duration: 2400, delay: i * 350, iterations: Infinity, direction: "alternate", easing: "ease-in-out" },
        ),
      );
    });

    const par = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        par.forEach((el) => {
          if (y < window.innerHeight * 1.2)
            el.style.transform = `translate3d(0, ${y * (Number(el.dataset.parallax) || 0.25)}px, 0)`;
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      document.querySelectorAll<Revealable>("[data-reveal]").forEach((el) => {
        el.__rv?.cancel();
        delete el.__rv;
      });
      window.removeEventListener("scroll", onScroll);
      loops.forEach((a) => a.cancel());
    };
  }, []);

  return null;
}
