import { IDataProvider } from './IDataProvider';
import ISlideProps from '../components/Slide/ISlideProps';

export class MockDataProvider implements IDataProvider {
  private mockSlides(): ISlideProps[] {
    return [
      {
        title: 'This is a sample news page',
        description:
          'Laborum deserunt incididunt nisi esse nostrud reprehenderit nulla nostrud consequat aliqua laboris Lorem.',
        category: 'Holidays',
        ctaText: 'Learn more about this...',
        ctaUrl: '/Holidays',
        imageUrl: 'https://source.unsplash.com/1600x900/?holidays',
      },
      {
        title: 'Hey listen! you are great...',
        description: 'Sit sunt sit dolor ut ut commodo ea culpa qui.',
        category: 'People',
        ctaText: 'Hey click here!',
        ctaUrl: '/People',
        imageUrl: 'https://source.unsplash.com/1600x900/?friends',
      },
      {
        title: 'Awesome news...',
        description:
          'Qui do eiusmod incididunt quis non. Et commodo occaecat nostrud commodo veniam et exercitation. Eiusmod velit occaecat mollit officia dolor sint anim deserunt.',
        category: 'Work',
        ctaText: 'Click here for more info',
        ctaUrl: '/Work',
        imageUrl: 'https://source.unsplash.com/1600x900/?office',
      },
      {
        title: 'News page title',
        description:
          'Cillum minim commodo nostrud do eiusmod aute. Pariatur adipisicing et ullamco minim dolore consequat ipsum dolore officia mollit commodo nostrud. Anim incididunt cillum id cillum consequat ullamco sunt reprehenderit.',
        category: 'News',
        ctaText: 'Read more.',
        ctaUrl: '/News',
        imageUrl: 'https://source.unsplash.com/1600x900/?news',
      },
    ];
  }

  public getSlides(): Promise<ISlideProps[]> {
    return new Promise<ISlideProps[]>(resolve => {
      setTimeout(() => resolve(this.mockSlides()), 500);
    });
  }
}

export default MockDataProvider;
