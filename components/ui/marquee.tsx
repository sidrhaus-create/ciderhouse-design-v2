type MarqueeProps = {
  items: string[];
  label: string;
};

export function Marquee({ items, label }: MarqueeProps) {
  const safeItems = items.length ? items : ["Cider House"];
  const repeatedItems = Array.from({ length: 2 }, () => safeItems).flat();

  return (
    <div aria-label={label} className="marquee" role="region">
      <div className="marquee__track">
        {[0, 1].map((group) => (
          <div aria-hidden={group === 1} className="marquee__group" key={group}>
            {repeatedItems.map((item, index) => (
              <span className="marquee__item" key={`${group}-${index}`}>
                {item}
                <span aria-hidden="true" className="marquee__dot">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
