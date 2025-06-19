const InfoCard = ({ title, value, icon: Icon, color = "blue" }) => {
  const bgColor = `bg-${color}-100`;
  const textColor = `text-${color}-700`;

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg shadow-sm ${bgColor} ${textColor}`}
    >
      {Icon && <Icon className="text-3xl" />}
      <div>
        <p className="text-sm font-medium">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
};

export default InfoCard;
