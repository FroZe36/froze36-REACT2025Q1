import { PureComponent } from 'react';
interface TopSectionButtonProp {
  onClick: () => void;
}
class TopSectionButton extends PureComponent<TopSectionButtonProp> {
  render() {
    const { onClick } = this.props;
    return (
      <button type="button" onClick={onClick} className="topSection__btn">
        Search
      </button>
    );
  }
}

export default TopSectionButton;
