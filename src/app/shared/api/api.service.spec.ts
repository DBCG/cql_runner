import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Configuration } from '../../components/config/config.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request with correct Content-Type header', () => {
    const config = new Configuration();
    config.value = 'define X: 1';

    service.post(config).subscribe();

    const req = httpMock.expectOne(r => r.method === 'POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({});
  });

  it('should post to the configured engineUri', () => {
    const config = new Configuration();
    config.value = 'define X: 1';
    config.engineUri = 'https://example.com/fhir/$cql';

    service.post(config).subscribe();

    const req = httpMock.expectOne('https://example.com/fhir/$cql');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should include all required parameters in the request body', () => {
    const config = new Configuration();
    config.value = 'define X: 1';
    config.patientId = 'P123';
    config.dataSourceUri = 'https://data.example.com/fhir';
    config.terminologyUri = 'https://term.example.com/fhir';
    config.librarySourceUri = 'https://lib.example.com/fhir';

    service.post(config).subscribe();

    const req = httpMock.expectOne(r => r.method === 'POST');
    const body = JSON.parse(req.request.body);

    expect(body.resourceType).toBe('Parameters');

    const names = body.parameter.filter((p: any) => p != null).map((p: any) => p.name);
    expect(names).toContain('content');
    expect(names).toContain('subject');
    expect(names).toContain('dataEndpoint');
    expect(names).toContain('terminologyEndpoint');
    expect(names).toContain('contentEndpoint');

    req.flush({});
  });

  it('should include correct content and subject values', () => {
    const config = new Configuration();
    config.value = 'define Answer: 42';
    config.patientId = 'P99';

    service.post(config).subscribe();

    const req = httpMock.expectOne(r => r.method === 'POST');
    const body = JSON.parse(req.request.body);
    const params = body.parameter.filter((p: any) => p != null);

    const content = params.find((p: any) => p.name === 'content');
    expect(content.valueString).toBe('define Answer: 42');

    const subject = params.find((p: any) => p.name === 'subject');
    expect(subject.valueString).toBe('P99');

    req.flush({});
  });

  it('should have no null or undefined entries in parameter array', () => {
    const config = new Configuration();
    config.value = 'define X: 1';

    service.post(config).subscribe();

    const req = httpMock.expectOne(r => r.method === 'POST');
    const body = JSON.parse(req.request.body);

    for (const param of body.parameter) {
      expect(param).not.toBeNull();
      expect(param).not.toBeUndefined();
    }

    req.flush({});
  });

  it('should include valid Endpoint resources for data, terminology, and content', () => {
    const config = new Configuration();
    config.value = 'define X: 1';
    config.dataSourceUri = 'https://data.example.com/fhir';
    config.terminologyUri = 'https://term.example.com/fhir';
    config.librarySourceUri = 'https://lib.example.com/fhir';

    service.post(config).subscribe();

    const req = httpMock.expectOne(r => r.method === 'POST');
    const body = JSON.parse(req.request.body);
    const params = body.parameter.filter((p: any) => p != null);

    const endpoints = ['dataEndpoint', 'terminologyEndpoint', 'contentEndpoint'];
    for (const name of endpoints) {
      const ep = params.find((p: any) => p.name === name);
      expect(ep).toBeDefined();
      expect(ep.resource.resourceType).toBe('Endpoint');
      expect(ep.resource.status).toBe('active');
      expect(ep.resource.connectionType.code).toBe('hl7-fhir-rest');
    }

    const dataEp = params.find((p: any) => p.name === 'dataEndpoint');
    expect(dataEp.resource.address).toBe('https://data.example.com/fhir');

    req.flush({});
  });
});
