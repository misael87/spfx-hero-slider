import * as React from 'react';
import { IHeroSliderProps } from './IHeroSliderProps';
import { IHeroSliderState } from './IHeroSliderState';
import { Slide } from '../Slide';
import { Nav } from '../Nav';
import { Controls } from '../Controls';
import styles from './HeroSlider.module.scss';

export default class HeroSlider extends React.Component<
  IHeroSliderProps,
  IHeroSliderState
> {
  constructor(props: IHeroSliderProps) {
    super(props);

    this.state = {
      slides: [],
      currentIndex: 0,
    };
  }

  public componentDidMount(): void {
    const { slidesLimit, dataProvider } = this.props;

    dataProvider.getSlides().then(result => {
      this.setState({
        slides: result.slice(0, slidesLimit),
      });
    });
  }

  private nextSlide = () => {
    const { currentIndex, slides } = this.state;
    const lastSlideIndex = slides.length - 1;
    if (currentIndex === lastSlideIndex) {
      return this.setState({
        currentIndex: 0,
      });
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
    }));
  };

  private prevSlide = () => {
    const { currentIndex, slides } = this.state;
    const lastSlideIndex = slides.length - 1;
    if (currentIndex === 0) {
      return this.setState({
        currentIndex: lastSlideIndex,
      });
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
    }));
  };

  private selectedSlide = (selectedIndex: number) => {
    this.setState({
      currentIndex: selectedIndex,
    });
  };

  public render(): React.ReactElement<IHeroSliderProps> {
    const { slides, currentIndex } = this.state;
    const { hideControls, hideNavigation } = this.props;

    // TODO: add loading state
    // TODO: add missing configuration state

    return (
      <div className={styles.slider}>
        {!hideControls && (
          <Controls goNext={this.nextSlide} goPrevious={this.prevSlide} />
        )}
        {slides.map((slide, index) => (
          <Slide key={index} active={currentIndex === index} {...slide} />
        ))}
        {!hideNavigation && (
          <Nav
            navItems={slides}
            onItemSelected={this.selectedSlide}
            activeIndex={currentIndex}
          />
        )}
      </div>
    );
  }
}
