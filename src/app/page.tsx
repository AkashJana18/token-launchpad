export default function Home() {
  return (
    <div className="h-full w-full m-auto p-10 bg-slate-900 flex justify-center items-center flex-col gap-4 text-2xl">
      <h1 className="text-6xl font-bold text-slate-50 m-5">
        SOLANA Token Launchpad
      </h1>
        <input type="text" placeholder="Name" className="border border-white/50 px-2 py-1 rounded"/>
        <input type="text" placeholder="Symbol" className="border border-white/50 px-2 py-1 rounded"/>
        <input type="text" placeholder="Image URL"className="border border-white/50 px-2 py-1 rounded" />
        <input type="text" placeholder="Initial Supply"className="border border-white/50 px-2 py-1 rounded" />
        <button className="bg-slate-600 py-2 px-4 rounded ">Create token</button>
    </div>
  );
}
