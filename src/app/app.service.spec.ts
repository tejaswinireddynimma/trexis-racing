import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppService', () => {
  let httpMock: HttpTestingController;
  let appsService: AppService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientModule, HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);
    appsService = TestBed.get(AppService);
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('should call bakend to get memebers', () => {
    const expectedUrl = 'http://localhost:8000/api/members';
    const getMembers = appsService.getMembers();
    const membersResponse = [
      {
        "firstName": "Alex",
        "lastName": "Sainz",
        "jobTitle": "Driver",
        "team": "World Endurance Championship - Car 5",
        "status": "Active",
        "id": 2
      },
      {
        "firstName": "Jeb",
        "lastName": "Jackson",
        "jobTitle": "Reserve Driver",
        "team": "Formula 2 - Car 54",
        "status": "Active",
        "id": 3
      }
    ];
    let response;
    getMembers.subscribe(res => {
      response = res;
    });
    const mockReq = httpMock.expectOne(req => req.method === 'GET' && req.url.includes(expectedUrl),
      'Service should call getMembers() rest endpoint');
    mockReq.flush(membersResponse);
    expect(response.length).toEqual(2);
  });

  it('should call bakend to get teams', () => {
    const expectedUrl = 'http://localhost:8000/api/teams';
    const getTeams = appsService.getTeams();
    const teamsResponse = [
      {
        "id": 1,
        "teamNameName": "Formula 1 - Car 77"
      },
      {
        "id": 2,
        "teamName": "Formula 1 - Car 8"
      },
      {
        "id": 3,
        "teamName": "Formula 2 - Car 54"
      },
      {
        "id": 4,
        "teamName": "Formula 2 - Car 63"
      },
      {
        "id": 5,
        "teamName": "Deutsche Tourenwagen Masters - Car 117"
      }
    ]
    let response;
    getTeams.subscribe(res => {
      response = res;
    });
    const mockReq = httpMock.expectOne(req => req.method === 'GET' && req.url.includes(expectedUrl),
      'Service should call getTeams() rest endpoint');
    mockReq.flush(teamsResponse);
    expect(response.length).toEqual(5);
  });

  it('it should handle an error', () => {
    const expectedUrl = 'http://localhost:8000/api/members';
    const getMembers = appsService.getMembers();

    let errorResponse;
    getMembers.subscribe(() => {
    },
      (error) => { errorResponse = error; });
    const mockErrorResponse = {
      status: 404, statusText: 'Bad Request'
    };
    const mockReq = httpMock.expectOne(req => req.method === 'GET' && req.url.includes(expectedUrl),
      'Service should call getMembers() rest endpoint');
    mockReq.flush(
    {
      status: 404,
      statusText: 'Not Found'
    }, mockErrorResponse);
    expect(errorResponse).not.toBeNull();
  });

  it('should call bakend to delete Member', () => {
    const expectedUrl = 'http://localhost:8000/api/deleteMember/1';
    const deleteMember = appsService.deleteMember(1);
    const teamsResponse = {}
    let response;
    deleteMember.subscribe(res => {
      response = res;
    });
    const mockReq = httpMock.expectOne(req => req.method === 'DELETE' && req.url.includes(expectedUrl),
      'Service should call deleteMember() rest endpoint');
    mockReq.flush(teamsResponse);
    expect(response).toEqual({});
  });

  it('should call bakend to update Member', () => {
    const expectedUrl = 'http://localhost:8000/api/updateMember/1';
    const updateMember = appsService.updateMember(1, {});
    const teamsResponse = {}
    let response;
    updateMember.subscribe(res => {
      response = res;
    });
    const mockReq = httpMock.expectOne(req => req.method === 'PUT' && req.url.includes(expectedUrl),
      'Service should call deleteMember() rest endpoint');
    mockReq.flush(teamsResponse);
    expect(response).toEqual({});
  });

});
