import { FC } from 'react';

interface TopSectionButtonProp {
  onClick: () => void;
}
const TopSectionButton: FC<TopSectionButtonProp> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className="topSection__btn">
      Search
    </button>
  );
};

export default TopSectionButton;
