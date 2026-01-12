export default function Button({ variant = "primary", href, children, ...rest }) {
  const cls = variant === "ghost" ? "btn btnGhost" : "btn btnPrimary";

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        className={cls}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} type="button" {...rest}>
      {children}
    </button>
  );
}
