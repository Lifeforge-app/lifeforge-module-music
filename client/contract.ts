export type EndpointEntriesList_OutputOK = {
  id: string;
  name: string;
  duration: string;
  author: string;
  file: string;
  is_favourite: boolean;
  created: string;
  updated: string;
}[];
export type EndpointEntriesRemove_OutputNO_CONTENT = void;
export type EndpointYoutubeDownloadVideo_OutputOK = string;
export type EndpointYoutubeParseMusicNameAndAuthor_OutputOK = {
  name: string;
  author: string;
} | null;

export interface Contract {
  entries: {
    list: EndpointEntriesList;
    remove: EndpointEntriesRemove;
    toggleFavourite: EndpointEntriesToggleFavourite;
    update: EndpointEntriesUpdate;
  };
  youtube: {
    downloadVideo: EndpointYoutubeDownloadVideo;
    getVideoInfo: EndpointYoutubeGetVideoInfo;
    parseMusicNameAndAuthor: EndpointYoutubeParseMusicNameAndAuthor;
  };
}
export interface EndpointEntriesList {
  method: "get";
  input: {};
  output: {
    OK: EndpointEntriesList_OutputOK;
  };
  media: null;
}
export interface EndpointEntriesRemove {
  method: "post";
  input: {
    query?: EndpointEntriesRemove_InputQuery;
  };
  output: {
    NO_CONTENT: EndpointEntriesRemove_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointEntriesRemove_InputQuery {
  id: string;
}
export interface EndpointEntriesToggleFavourite {
  method: "post";
  input: {
    query?: EndpointEntriesToggleFavourite_InputQuery;
  };
  output: {
    OK: EndpointEntriesToggleFavourite_OutputOK;
  };
  media: null;
}
export interface EndpointEntriesToggleFavourite_InputQuery {
  id: string;
}
export interface EndpointEntriesToggleFavourite_OutputOK {
  id: string;
  name: string;
  duration: string;
  author: string;
  file: string;
  is_favourite: boolean;
  created: string;
  updated: string;
}
export interface EndpointEntriesUpdate {
  method: "post";
  input: {
    query?: EndpointEntriesUpdate_InputQuery;
    body?: EndpointEntriesUpdate_InputBody;
  };
  output: {
    OK: EndpointEntriesUpdate_OutputOK;
  };
  media: null;
}
export interface EndpointEntriesUpdate_InputQuery {
  id: string;
}
export interface EndpointEntriesUpdate_InputBody {
  name: string;
  author: string;
}
export interface EndpointEntriesUpdate_OutputOK {
  id: string;
  name: string;
  duration: string;
  author: string;
  file: string;
  is_favourite: boolean;
  created: string;
  updated: string;
}
export interface EndpointYoutubeDownloadVideo {
  method: "post";
  input: {
    query?: EndpointYoutubeDownloadVideo_InputQuery;
    body?: EndpointYoutubeDownloadVideo_InputBody;
  };
  output: {
    OK: EndpointYoutubeDownloadVideo_OutputOK;
  };
  media: null;
}
export interface EndpointYoutubeDownloadVideo_InputQuery {
  id: string;
}
export interface EndpointYoutubeDownloadVideo_InputBody {
  title: string;
  uploader: string;
  duration: number;
}
export interface EndpointYoutubeGetVideoInfo {
  method: "get";
  input: {
    query?: EndpointYoutubeGetVideoInfo_InputQuery;
  };
  output: {
    OK: EndpointYoutubeGetVideoInfo_OutputOK;
  };
  media: null;
}
export interface EndpointYoutubeGetVideoInfo_InputQuery {
  id: string;
}
export interface EndpointYoutubeGetVideoInfo_OutputOK {
  title: string;
  uploadDate: string;
  uploader: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  thumbnail: string;
}
export interface EndpointYoutubeParseMusicNameAndAuthor {
  method: "post";
  input: {
    body?: EndpointYoutubeParseMusicNameAndAuthor_InputBody;
  };
  output: {
    OK: EndpointYoutubeParseMusicNameAndAuthor_OutputOK;
  };
  media: null;
}
export interface EndpointYoutubeParseMusicNameAndAuthor_InputBody {
  title: string;
  uploader: string;
}
