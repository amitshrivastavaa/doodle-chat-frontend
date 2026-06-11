import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMessage, getMessages } from './messages';
import { apiRequest } from './client';

vi.mock('./client', () => ({
  apiRequest: vi.fn(),
}));

const mockedRequest = vi.mocked(apiRequest);

describe('messages api', () => {
  beforeEach(() => {
    mockedRequest.mockReset();
    mockedRequest.mockResolvedValue([]);
  });

  it('builds a query string from params', async () => {
    await getMessages({ after: '2020-01-01T00:00:00.000Z', limit: 10 });
    expect(mockedRequest).toHaveBeenCalledWith(
      '/api/v1/messages?after=2020-01-01T00%3A00%3A00.000Z&limit=10',
      {},
    );
  });

  it('omits the query string when there are no params', async () => {
    await getMessages();
    expect(mockedRequest).toHaveBeenCalledWith('/api/v1/messages', {});
  });

  it('posts a new message', async () => {
    mockedRequest.mockResolvedValue({ _id: '1' });
    await createMessage({ message: 'hi', author: 'Sam' });
    expect(mockedRequest).toHaveBeenCalledWith('/api/v1/messages', {
      method: 'POST',
      body: { message: 'hi', author: 'Sam' },
    });
  });
});
