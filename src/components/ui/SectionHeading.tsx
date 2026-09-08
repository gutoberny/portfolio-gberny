export function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title?: string;
  id?: string;
}) {
  return (
    <div className="mb-8">
      <p className="eyebrow">{eyebrow}</p>
      {title ? (
        <h2 id={id} className="display mt-3 text-2xl md:text-[28px]">
          {title}
        </h2>
      ) : null}
    </div>
  );
}
