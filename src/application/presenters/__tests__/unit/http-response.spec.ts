import { HttpExceptionResponse, HttpExceptionResponseProps } from '../../http-exception.presenter';
import { HttpResponse } from '../../http.presenter';

describe('Presenter unit tests', () => {
  it('HttpResponse class', () => {
    const httpResponse = new HttpResponse(200, { data: 'random' }, 'GET');
    expect(httpResponse).toBeInstanceOf(HttpResponse);
    expect(httpResponse.data).toEqual({ data: 'random' });
    expect(httpResponse.method).toEqual('GET');
    expect(httpResponse.statusCode).toEqual(200);
    expect(httpResponse.timestamp).not.toBeNull();
    expect(httpResponse.toJSON()).toEqual({
      data: { data: 'random' },
      method: 'GET',
      statusCode: 200,
      timestamp: expect.any(String),
    });
  });
  it('HttpExceptionResponse class', () => {
    const props: HttpExceptionResponseProps = {
      name: 'MOCK_ERROR',
      cause: 'MOCK_CAUSE',
      statusCode: 500,
      message: ['Example of exception message'],
      method: 'GET',
    };
    const httpExceptionResponse = new HttpExceptionResponse(props);
    expect(httpExceptionResponse).toBeInstanceOf(HttpExceptionResponse);
    expect(httpExceptionResponse.message).toEqual(['Example of exception message']);
    expect(httpExceptionResponse.method).toEqual('GET');
    expect(httpExceptionResponse.statusCode).toEqual(500);
    expect(httpExceptionResponse.timestamp).not.toBeNull();
    expect(httpExceptionResponse.toJSON()).toEqual({
      message: ['Example of exception message'],
      method: 'GET',
      name: 'MOCK_ERROR',
      statusCode: 500,
      timestamp: expect.any(String),
      cause: 'MOCK_CAUSE',
    });
  });
});
