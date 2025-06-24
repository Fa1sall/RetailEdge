import { Link } from "react-router-dom";

export default function HomeInfoCard({ title, info, page, icon: Icon }) {
  return (
    <Link
      to={`/${page}`}
      className="flex justify-between items-center p-5 w-full max-w-80 bg-panel text-text
        transition-transform duration-200 ease-in-out hover:scale-105 rounded-2xl
        shadow-md"
    >
      <div className="flex flex-col gap-2">
        <div className="text-lg text-muted">{title}</div>
        <div className="text-2xl font-bold text-text">{info}</div>
      </div>

      <div
        className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br
          from-accent to-border shadow-inner"
      >
        {Icon && <Icon size={28} />}
      </div>
    </Link>
  );
}
