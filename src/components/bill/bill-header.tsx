function BillHeader() {
  const date = new Date();

  return (
    <div className="grid grid-cols-2 gap-2 text-xs lg:text-sm px-2 mt-4">
      <div className="text-left">Invoice id: ###</div>
      <div className="text-right">Date: {date.toISOString().split('T')[0]}</div>
    </div>
  );
}

export default BillHeader;
