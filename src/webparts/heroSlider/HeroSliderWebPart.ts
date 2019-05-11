import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';

import * as strings from 'HeroSliderWebPartStrings';
import { HeroSlider } from './components';
import { HeroSliderProps } from './components/HeroSlider/HeroSliderProps';
import { DataProvider } from './models/DataProvider';
import { MockDataProvider } from './data/index';

export default class HeroSliderWebPart extends BaseClientSideWebPart<HeroSliderProps> {
  
  private getDataProvider(): DataProvider {
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      return new MockDataProvider();
    }

    //return new RestDataProvider(this.context);
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
          groups: [],
        },
      ],
    };
  }
}
