import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  Version,
  Environment,
  EnvironmentType,
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  PropertyPaneToggle,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneSlider,
  PropertyPaneHorizontalRule,
} from '@microsoft/sp-property-pane';

import * as strings from 'HeroSliderWebPartStrings';
import { HeroSlider } from './components';
import { HeroSliderProps } from './components/HeroSlider/HeroSliderProps';
import { DataProvider } from './models/DataProvider';
import { MockDataProvider, RestDataProvider } from './data';

export default class HeroSliderWebPart extends BaseClientSideWebPart<
  HeroSliderProps
> {
  private getDataProvider(): DataProvider {
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      return new MockDataProvider();
    }

    return new RestDataProvider(this.context);
  }

  public render(): void {
    const {
      hideControls,
      hideNavigation,
      slidesLimit,
      contentTypeName,
    } = this.properties;

    const element: React.ReactElement<HeroSliderProps> = React.createElement(
      HeroSlider,
      {
        hideControls,
        hideNavigation,
        slidesLimit,
        contentTypeName,
        dataProvider: this.getDataProvider(),
        context: this.context,
      },
    );

    ReactDom.render(element, this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneHorizontalRule(),
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
                PropertyPaneHorizontalRule(),
                PropertyPaneSlider('slidesLimit', {
                  label: strings.SlidesLimitFieldLabel,
                  min: 2,
                  max: 6,
                  showValue: true,
                }),
              ],
            },
            {
              groupName: strings.ContentTypeGroupName,
              groupFields: [
                PropertyPaneHorizontalRule(),
                PropertyPaneTextField('contentTypeName', {
                  label: strings.ContentTypeNameFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
