import { DataProvider } from '../models/DataProvider';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Slide } from '../models/Slide';

export class RestDataProvider implements DataProvider {
  private WPContext: WebPartContext;
  constructor(context) {
    this.WPContext = context;
  }

  public getSlides(contentTypeName: string): Promise<Slide[]> {
    if (!contentTypeName) {
      return Promise.reject(
        new Error('Content type name parameter is required'),
      );
    }

    return this.WPContext.spHttpClient
      .get(
        `${
          this.WPContext.pageContext.web.absoluteUrl
        }/_api/web/lists/getbytitle('site pages')/items?$filter=ContentType eq '${contentTypeName}'&$expand=file&$orderby=Id desc`,
        SPHttpClient.configurations.v1,
        {},
      )
      .then(
        (response: SPHttpClientResponse): Promise<{ value: any[] }> => {
          if (!response.ok) {
            throw new Error(
              'Invalid query, please contact your silly developer...',
            );
          }

          return response.json();
        },
      )
      .then((response: { value: any[] }) => {
        return response.value.map(
          ({
            Id,
            Categories,
            BannerImageUrl,
            Description,
            Title,
            URL,
            File: { ServerRelativeUrl },
          }) => {
            return {
              id: Id,
              title: Title,
              description: Description,
              categories: Categories,
              ctaButton: {
                text: URL ? URL.Description : 'Learn more..',
                url: URL
                  ? URL.Url
                  : `${window.location.origin}${ServerRelativeUrl}`,
              },
              imageUrl: `${BannerImageUrl.Url}&resolution=3`, // resolution=3 for 1024px size thumbnail
            };
          },
        );
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}

export default RestDataProvider;