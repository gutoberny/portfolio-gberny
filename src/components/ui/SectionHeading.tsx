export function SectionHeading({
  eyebrow,
  title,
  meta,
  id,
}: {
  eyebrow: string;
  title?: string;
  meta?: string;
  id?: string;
}) {
  return (
    <div className="mb-8">
      <p id={!title ? id : undefined} className="eyebrow">
        {eyebrow}
      </p>
      {title ? (
        <h2 id={id} className="display mt-3 text-2xl md:text-[28px]">
          {title}
        </h2>
      ) : null}
      {meta ? <p className="eyebrow mt-2">{meta}</p> : null}
    </div>
  );
}
