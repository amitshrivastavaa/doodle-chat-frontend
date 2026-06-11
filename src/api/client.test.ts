import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from './client';

describe('apiRequest', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sends the bearer token and parses JSON', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );
    vi.stubGlobal('fetch', fetchMock);

    const result = await apiRequest<{ ok: boolean }>('/api/v1/messages');

    expect(result).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('http://localhost:3000/api/v1/messages');
    expect(init.headers.Authorization).toBe('Bearer super-secret-doodle-token');
  });

  it('serializes a JSON body for POST', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({}), { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);

    await apiRequest('/api/v1/messages', {
      method: 'POST',
      body: { message: 'hi', author: 'Sam' },
    });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe('POST');
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(init.body).toBe(JSON.stringify({ message: 'hi', author: 'Sam' }));
  });

  it('throws ApiError with the status on a non-2xx response', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({}), { status: 401 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(apiRequest('/api/v1/messages')).rejects.toMatchObject({
      name: 'ApiError',
      status: 401,
    });
  });
});
