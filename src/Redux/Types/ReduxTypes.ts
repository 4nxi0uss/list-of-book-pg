export const LOADING_STATUS = "LOADING";
export const SUCCESS_STATUS = "SUCCESS";
export const FAILED_STATUS = "FAILED";
export const IDLE_STATUS = "IDLE";

export interface OptionDataType {
  error: string;
  langOptionStatus: string;
}

export interface StatusPageDataType {
  error: string;
  bookStatus: String;
  pageNumber: number;
}

export interface BookDataType {
  data: {
    count: number;
    next: string;
    previous: string;
    results: [
      {
        id: number;
        languages: string[];
        resources: [
          {
            id: number;
            uri: string;
            type: string;
          }
        ];
        title: string;
      }
    ];
  };
}
