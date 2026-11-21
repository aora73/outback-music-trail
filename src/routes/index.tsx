import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trailCss, trailHtml } from "@/lib/trail-markup";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("nav button"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".section"));

    const onClick = (btn: HTMLButtonElement) => () => {
      buttons.forEach((b) => b.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));
      btn.classList.add("active");
      const id = btn.dataset.section;
      if (id) document.getElementById(id)?.classList.add("active");
      window.scrollTo(0, 0);
    };

    const buttonHandlers = buttons.map((btn) => {
      const handler = onClick(btn);
      btn.addEventListener("click", handler);
      return [btn, handler] as const;
    });

    const checks = Array.from(document.querySelectorAll<HTMLInputElement>(".checklist input"));
    const checkHandlers = checks.map((cb, i) => {
      const key = `omt2027_check_${i}`;
      cb.checked = localStorage.getItem(key) === "1";
      const handler = () => localStorage.setItem(key, cb.checked ? "1" : "0");
      cb.addEventListener("change", handler);
      return [cb, handler] as const;
    });

    return () => {
      buttonHandlers.forEach(([btn, handler]) => btn.removeEventListener("click", handler));
      checkHandlers.forEach(([cb, handler]) => cb.removeEventListener("change", handler));
    };
  }, []);

  return (
    <>
      <style>{trailCss}</style>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: trailHtml }} />
    </>
  );
}
