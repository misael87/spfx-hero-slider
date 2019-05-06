import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  PropertyPaneToggle,
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneSlider,
} from '@microsoft/sp-property-pane';

import * as strings from 'HeroSliderWebPartStrings';
import HeroSlider from './components/HeroSlider/HeroSlider';
import { IHeroSliderProps } from './components/HeroSlider/IHeroSliderProps';

export default class HeroSliderWebPart extends BaseClientSideWebPart<
  IHeroSliderProps
> {
  public render(): void {
    const { hideControls, hideNavigation, slidesLimit } = this.properties;
    const element: React.ReactElement<IHeroSliderProps> = React.createElement(
      HeroSlider,
      {
        hideControls,
        hideNavigation,
        slidesLimit,
      },
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.VisibilityGroupName,
              groupFields: [
                PropertyPaneCheckbox('hideControls', {
                  text: strings.HideControlsFieldLabel,
                  checked: false,
                }),
                PropertyPaneToggle('hideNavigation', {
                  label: strings.HideNavigationFieldLabel,
                  checked: false,
                  onText: 'shown',
                  offText: 'hidden',
                }),
              ],
            },
            {
              groupName: strings.LimitsGroupName,
              groupFields: [
                PropertyPaneSlider('slidesLimit', {
                  label: strings.SlidesLimitFieldLabel,
                  min: 2,
                  max: 6,
                  value: 4,
                  showValue: true,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
