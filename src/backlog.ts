import axios, { AxiosInstance } from 'axios';
import { object2queryString, QueryParameter } from './utils.js';

const BACKLOG_ISSUE_SAMPLE_RESPONSE = [
  {
    id: 1,
    projectId: 1,
    issueKey: 'BLG-1',
    keyId: 1,
    issueType: {
      id: 2,
      projectId: 1,
      name: 'タスク',
      color: '#7ea800',
      displayOrder: 0,
    },
    summary: 'first issue',
    description: '',
    resolution: null,
    priority: {
      id: 3,
      name: '中',
    },
    status: {
      id: 1,
      projectId: 1,
      name: '未対応',
      color: '#ed8077',
      displayOrder: 1000,
    },
    assignee: {
      id: 2,
      userId: 'eguchi',
      name: 'eguchi',
      roleType: 2,
      lang: null,
      mailAddress: 'eguchi@nulab.example',
      lastLoginTime: '2022-09-01T06:35:39Z',
    },
    category: [],
    versions: [],
    milestone: [
      {
        id: 30,
        projectId: 1,
        name: 'wait for release',
        description: '',
        startDate: null,
        releaseDueDate: null,
        archived: false,
        displayOrder: 0,
      },
    ],
    startDate: null,
    dueDate: null,
    estimatedHours: null,
    actualHours: null,
    parentIssueId: null,
    createdUser: {
      id: 1,
      userId: 'admin',
      name: 'admin',
      roleType: 1,
      lang: 'ja',
      mailAddress: 'eguchi@nulab.example',
      lastLoginTime: '2022-09-01T06:35:39Z',
    },
    created: '2012-07-23T06:10:15Z',
    updatedUser: {
      id: 1,
      userId: 'admin',
      name: 'admin',
      roleType: 1,
      lang: 'ja',
      mailAddress: 'eguchi@nulab.example',
      lastLoginTime: '2022-09-01T06:35:39Z',
    },
    updated: '2013-02-07T08:09:49Z',
    customFields: [],
    attachments: [
      {
        id: 1,
        name: 'IMGP0088.JPG',
        size: 85079,
      },
    ],
    sharedFiles: [
      {
        id: 454403,
        projectId: 5,
        type: 'file',
        dir: '/ユーザアイコン/',
        name: '01_サラリーマン.png',
        size: 2735,
        createdUser: {
          id: 5686,
          userId: 'takada',
          name: 'takada',
          roleType: 2,
          lang: 'ja',
          mailAddress: 'takada@nulab.example',
          lastLoginTime: '2022-09-01T06:35:39Z',
        },
        created: '2009-02-27T03:26:15Z',
        updatedUser: {
          id: 5686,
          userId: 'takada',
          name: 'takada',
          roleType: 2,
          lang: 'ja',
          mailAddress: 'takada@nulab.example',
          lastLoginTime: '2022-09-01T06:35:39Z',
        },
        updated: '2009-03-03T16:57:47Z',
      },
    ],
    stars: [
      {
        id: 10,
        comment: null,
        url: 'https://xx.backlog.jp/view/BLG-1',
        title: '[BLG-1] first issue | 課題の表示 - Backlog',
        presenter: {
          id: 2,
          userId: 'eguchi',
          name: 'eguchi',
          roleType: 2,
          lang: 'ja',
          mailAddress: 'eguchi@nulab.example',
          lastLoginTime: '2022-09-01T06:35:39Z',
        },
        created: '2013-07-08T10:24:28Z',
      },
    ],
  },
];

type Issue = (typeof BACKLOG_ISSUE_SAMPLE_RESPONSE)[0];

const PROJECT_SAMPLE_RESPONSE = {
  id: 1,
  projectKey: 'TEST',
  name: 'test',
  chartEnabled: false,
  useResolvedForChart: false,
  subtaskingEnabled: false,
  projectLeaderCanEditProjectLeader: false,
  useWiki: true,
  useFileSharing: true,
  useWikiTreeView: true,
  useOriginalImageSizeAtWiki: false,
  useSubversion: true,
  useGit: true,
  textFormattingRule: 'markdown',
  archived: false,
  displayOrder: 2147483646,
  useDevAttributes: true,
};

type Project = typeof PROJECT_SAMPLE_RESPONSE;

class ApiClient {
  private readonly client: AxiosInstance;

  constructor(baseUrl: string, private readonly apiKey: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 1000,
    });
  }

  async get<R, T extends QueryParameter = any>(
    url: string,
    query: T,
  ): Promise<R> {
    const params = object2queryString({ apiKey: this.apiKey, ...query });
    return this.client
      .get(`${url}?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => data);
  }

  async post<R, T extends Record<PropertyKey, any> = any>(
    url: string,
    body: T,
  ): Promise<R> {
    const params = object2queryString({ apiKey: this.apiKey });
    return this.client
      .post(`${url}?${params}`, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded ',
        },
      })
      .then(({ data }) => data);
  }
}

export class BacklogClient {
  private readonly apiClient: ApiClient;

  constructor(
    baseUrl: string,
    private readonly apiKey: string,
    private readonly spaceId?: string,
  ) {
    this.apiClient = new ApiClient(baseUrl, apiKey);
  }

  public getProject(projectIdOrKey: string) {
    return this.apiClient.get<Project>(
      `/api/v2/projects/${projectIdOrKey}`,
      {},
    );
  }

  public getIssues(query: {
    projectId?: number[];
    issueTypeId?: number[];
    categoryId?: number[];
    priorityId?: number[];
    parentChild?: 0 | 1 | 2 | 3 | 4;
    offset?: number;
    count?: number;
    id?: number[];
    parentIssueId?: number[];
    keyword?: string;
  }) {
    return this.apiClient.get<Issue[]>(`/api/v2/issues`, query);
  }

  public getIssue(issueIdOrKey: string) {
    return this.apiClient.get<Issue>(`/api/v2/issues/${issueIdOrKey}`, {});
  }

  public createIssue(body: {
    projectId: number;
    summary: string;
    parentIssueId?: number;
    description?: string;
    startDate?: string;
    dueDate?: string;
    estimatedHours?: string;
    actualHours?: string;
    issueTypeId: number;
    priorityId: number;
  }) {
    return this.apiClient.post<Issue>(`/api/v2/issues`, body);
  }

  public getPriorities() {
    return this.apiClient.get<{ id: number; name: string }[]>(
      `/api/v2/priorities`,
      {},
    );
  }
}
