import { setupServer } from 'msw/node';
import { delay, http, HttpResponse } from 'msw';
import { createMockData, starshipsMock } from './mock/starships';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

export const BASE_URL = 'https://swapi.dev/api';

export const server = setupServer(
  http.get(`${BASE_URL}/starships/`, async ({ request }) => {
    const url = new URL(request.url);
    const searchId = url.searchParams.get('search');

    await delay();
    if (searchId === 'error') {
      return HttpResponse.error();
    }
    if (searchId === 'test') {
      return HttpResponse.json({
        count: 1,
        next: null,
        previous: null,
        results: [starshipsMock],
      });
    } else {
      return HttpResponse.json({
        count: 1,
        next: null,
        previous: null,
        results: createMockData(5),
      });
    }
  })
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();
