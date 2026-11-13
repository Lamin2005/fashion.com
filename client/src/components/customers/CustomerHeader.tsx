const CustomerHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Customers
      </h1>

      <p className="text-sm text-zinc-500">
        Manage customer accounts and monitor customer activity.
      </p>
    </div>
  );
};

export default CustomerHeader;
