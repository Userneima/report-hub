import { references } from "@/data/references";

export function RefLink({ n }: { n: number }) {
  const item = references.find((r) => r.n === n);
  return (
    <a href={item?.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:underline relative top-[-0.5em] text-xs">
      [{n}]
    </a>
  );
}
