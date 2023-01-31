const DashboardImage = () => {
  // public/assets/images/dashboard/dashboard-image.jpeg
  return (
    <div className="w-full h-auto px-3 pt-2 mb-5">
      <img
        src={'/assets/images/dashboard/dashboard-image.jpeg'}
        alt="image"
        className="w-full object-cover rounded-md h-[180px] md:h-[350px] lg:h-[550px] xl:h-650px]"
      />
    </div>
  );
};
export default DashboardImage;
