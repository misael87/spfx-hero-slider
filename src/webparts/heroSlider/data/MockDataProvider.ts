import { DataProvider } from '../models/DataProvider';
import { Slide } from '../models/Slide';

export class MockDataProvider implements DataProvider {
  private mockSlides(): Slide[] {
    return [
      {
        id: 1,
        title: 'This is a sample news page',
        description:
          'Laborum deserunt incididunt nisi esse nostrud reprehenderit nulla nostrud consequat aliqua laboris Lorem.',
        categories: 'Holidays',
        ctaButton: { text: 'Learn more about this...', url: '/Holidays' },
        imageUrl: 'https://source.unsplash.com/1600x900/?holidays',
      },
      {
        id: 2,
        title: 'Hey listen! you are great...',
        description: 'Sit sunt sit dolor ut ut commodo ea culpa qui.',
        categories: 'People, Friends',
        ctaButton: { text: 'Hey click here!', url: '/People' },
        imageUrl: 'https://source.unsplash.com/1600x900/?friends',
      },
      {
        id: 3,
        title: 'Awesome news...',
        description:
          'Qui do eiusmod incididunt quis non. Et commodo occaecat nostrud commodo veniam et exercitation. Eiusmod velit occaecat mollit officia dolor sint anim deserunt.',
        categories: 'Work, Office, Team',
        ctaButton: { text: 'Click here for more info', url: '/Work' },
        imageUrl: 'https://source.unsplash.com/1600x900/?office',
      },
      {
        id: 4,
        title: 'News page title',
        description:
          'Cillum minim commodo nostrud do eiusmod aute. Pariatur adipisicing et ullamco minim dolore consequat ipsum dolore officia mollit commodo nostrud. Anim incididunt cillum id cillum consequat ullamco sunt reprehenderit.',
        categories: 'News',
        ctaButton: { text: 'Read more.', url: '/News' },
        imageUrl: 'https://source.unsplash.com/1600x900/?news',
      },
    ];
  }

  public getSlides(): Promise<Slide[]> {
    return new Promise<Slide[]>(resolve => {
      setTimeout(() => resolve(this.mockSlides()), 500);
    });
  }
}

export default MockDataProvider;
