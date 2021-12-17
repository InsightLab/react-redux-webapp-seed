type ApiHeaderValue = string | number | boolean | null | undefined;

type ApiHeaders = {
  [key: string]: ApiHeaderValue;
};

interface ApiError {
  isApiError: boolean; // flag
  url: string;
  method: string; // http verbs
  query: any; // query string - params
  config: {
    headers: any;
    data: any; // request body
  };
  status: number; // response http status code
  headers: any; // response headers
  data: any; // response body
}
