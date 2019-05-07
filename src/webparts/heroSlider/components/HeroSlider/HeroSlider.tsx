import * as React from 'react';
import { HeroSliderProps } from './HeroSliderProps';
import { HeroSliderState } from './HeroSliderState';
import { Slide } from '../Slide';
import { Nav } from '../Nav';
import { Controls } from '../Controls';
import styles from './HeroSlider.module.scss';
import { ComponentStatus } from '../../models/ComponentStatus';

export default class HeroSlider extends React.Component<
  HeroSliderProps,
  HeroSliderState
> {
  constructor(props: HeroSliderProps) {
    super(props);

    this.state = {
      slides: [],
      currentIndex: 0,
      componentStatus: ComponentStatus.Loading,
    };
  }

  public componentDidMount(): void {
    const { slidesLimit, dataProvider } = this.props;

    dataProvider
      .getSlides()
      .then(result => {
        if (result.length === 0) {
          return this.setState({
            componentStatus: ComponentStatus.MissingConfiguration,
          });
        }

        this.setState({
          slides: result.slice(0, slidesLimit),
          componentStatus: ComponentStatus.Completed,
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          componentStatus: ComponentStatus.Error,
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

  public render(): React.ReactElement<HeroSliderProps> {
    const { slides, currentIndex, componentStatus } = this.state;
    const { hideControls, hideNavigation } = this.props;

    // TODO: install reusable controls https://sharepoint.github.io/sp-dev-fx-controls-react/
    if (componentStatus === ComponentStatus.Error) {
      return <div>Error</div>;
    }

    if (componentStatus === ComponentStatus.Loading) {
      return <div>Loading</div>;
    }

    if (componentStatus === ComponentStatus.MissingConfiguration) {
      return <div>Missing configuration</div>;
    }

    return (
      <div className={styles.slider}>
        {!hideControls && (
          <Controls goNext={this.nextSlide} goPrevious={this.prevSlide} />
        )}
        {slides.map((slide, index) => (
          <Slide key={index} isActive={currentIndex === index} {...slide} />
        ))}
        {!hideNavigation && (
          <Nav
            navItems={slides.map(slide => slide.title)}
            onItemSelected={this.selectedSlide}
            activeIndex={currentIndex}
          />
        )}
      </div>
    );
  }
}
