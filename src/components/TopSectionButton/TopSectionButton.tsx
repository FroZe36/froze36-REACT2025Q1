interface TopSectionButtonProp {
  onClick: () => void;
}
const TopSectionButton = (props: TopSectionButtonProp) => {
  const { onClick } = props;
  return (
    <button type="button" onClick={onClick} className="topSection__btn">
      Search
    </button>
  );
};

export default TopSectionButton;
