export default function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[.25em] text-violet-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 leading-7 text-slate-400">{text}</p>}
    </div>
  );
}