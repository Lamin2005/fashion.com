const AddressSkeleton = () => {
  return (
    <section className="min-h-screen bg-zinc-50 px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="h-8 w-56 animate-pulse rounded bg-zinc-200" />

        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl border border-zinc-200 bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddressSkeleton;
