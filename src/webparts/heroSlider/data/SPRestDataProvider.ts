import { IDataProvider } from './IDataProvider';
import ISlideProps from '../components/Slide/ISlideProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export class SPRestDataProvider implements IDataProvider {
  private WPContext: WebPartContext;
  constructor(context) {
    this.WPContext = context;
  }

  public getSlides(): Promise<ISlideProps[]> {
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
            throw new Error('Invalid query, please contact your developer...');
          }

          return response.json();
        },
      )
      .then((response: { value: any[] }) => {
        return response.value.map(
          ({
            Id,
            OData__Category,
            BannerImageUrl,
            RoutingRuleDescription,
            Title,
            DetailLink,
          }) => {
            return {
              id: Id,
              category: OData__Category,
              title: Title,
              description: RoutingRuleDescription, //FIXME: get default description field
              ctaText: DetailLink ? DetailLink.Description : 'Learn more..',
              ctaUrl: DetailLink
                ? DetailLink.Url
                : `${
                    this.WPContext.pageContext.web.absoluteUrl
                  }/site pages/${Title}.aspx`,
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

export default SPRestDataProvider;
