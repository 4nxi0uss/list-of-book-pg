export const LOADING_STATUS = "LOADING";
export const SUCCESS_STATUS = "SUCCESS";
export const FAILED_STATUS = "FAILED";
export const IDLE_STATUS = "IDLE";

export interface OptionDataType {
  error: string,
  langOptionStatus: string,
  data: any
}

export interface BookDataType {
  error: string,
  bookStatus: String,
  pageNumber: number,
  data: {
    count: number,
    next: string,
    previous: string,
    results: [{
      agents: [{
        id: number,
        person: string,
        type: string,
      }],
      bookshelves: string[],
      description: string,
      downloads: number,
      id: number,
      languages: string[],
      license: string,
      resources: [{
        id: number,
        uri: string,
        type: string,
      }],
      subjects: string[],
      title: string,
      type: string
    }]
  },
}
