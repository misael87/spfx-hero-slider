import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';

import * as strings from 'HeroSliderWebPartStrings';
import { HeroSlider } from './components';

export default class HeroSliderWebPart extends BaseClientSideWebPart<{}> {
  public render(): void {
    const element: React.ReactElement<{}> = React.createElement(HeroSlider, {});

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
