import { DataProvider } from '../models/DataProvider';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Slide } from '../models/Slide';

export class RestDataProvider implements DataProvider {
  private WPContext: WebPartContext;
  constructor(context) {
    this.WPContext = context;
  }

  public getSlides(): Promise<Slide[]> {
    //FIXME: fix below code
    return this.WPContext.spHttpClient
      .get(
        `${
          this.WPContext.pageContext.web.absoluteUrl
        }/_api/web/lists/getbytitle('site pages')/items?$filter=ContentType eq 'Hero News Page'`,
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
          ({ Id, Categories, BannerImageUrl, Description, Title, URL }) => {
            return {
              id: Id,
              title: Title,
              description: Description,
              categories: Categories,
              ctaButton: {
                text: URL ? URL.Description : 'Learn more..',
                url: URL
                  ? URL.Url
                  : `${
                      this.WPContext.pageContext.web.absoluteUrl
                    }/sitepages/${Title}.aspx`,
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
