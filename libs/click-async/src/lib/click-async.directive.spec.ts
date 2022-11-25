import { render, screen } from '@testing-library/angular';
import { EMPTY, of, Subject, tap } from 'rxjs';
import { ClickAsyncDirective } from './click-async.directive';
import userEvent from '@testing-library/user-event';

describe('ClickAsyncDirective', () => {
  async function setup() {
    const asyncFunction = jest.fn();
    asyncFunction.mockReturnValue(EMPTY);

    const { fixture } = await render(
      `<button [clickAsync]="doAction">Click</button>`,
      {
        imports: [ClickAsyncDirective],
        componentProperties: {
          doAction: asyncFunction,
        },
      }
    );

    return {
      fixture,
      asyncFunction,
    };
  }

  it('calls the function on click', async () => {
    const { asyncFunction } = await setup();

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(asyncFunction).toHaveBeenCalled();
  });

  it('subscribes to the Observable returned from the function', async () => {
    const { asyncFunction } = await setup();

    const button = screen.getByRole('button');
    const innerFunction = jest.fn();
    asyncFunction.mockReturnValue(of(true).pipe(tap(() => innerFunction())));

    await userEvent.click(button);

    expect(innerFunction).toHaveBeenCalled();
  });

  it('unsubscribes on destroy', async () => {
    const { fixture, asyncFunction } = await setup();

    const button = screen.getByRole('button');
    const subject = new Subject<void>();
    const innerFunction = jest.fn();
    asyncFunction.mockReturnValue(subject.pipe(tap(() => innerFunction())));

    await userEvent.click(button);
    expect(innerFunction).toHaveBeenCalledTimes(0);

    subject.next();
    expect(innerFunction).toHaveBeenCalledTimes(1);

    fixture.destroy();
    subject.next();
    expect(innerFunction).toHaveBeenCalledTimes(1);
  });
});
