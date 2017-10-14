import { environment } from '../../../environments/environment';

export interface IConfiguration {
    value?: string; // value of user input
    engineUri?: string; // engine endpoint
    // fhirUri?: string; // fhir server endpoint
    // fhirUsername?: string; // fhir server username
    // fhirPassword?: string; // fhir server password
    terminologyUri?: string; // terminology server username
    terminologyUsername?: string; // terminology server username
    terminologyPassword?: string; // terminology server password
    dataSourceUri?: string; // dataSource endpoint
    dataSourceUsername?: string; // dataSource username
    dataSourcePassword?: string; // dataSource password
    patientId?: string; // Id of patient in context
}

export class Configuration implements IConfiguration {
    value: string;
    engineUri = environment.engineUri;
    // fhirUri = environment.fhirUri;
    // fhirUsername: string;
    // fhirPassword: string;
    terminologyUri = environment.terminologyUri;
    terminologyUsername: string;
    terminologyPassword: string;
    dataSourceUri = environment.dataSourceUri;
    dataSourceUsername: string;
    dataSourcePassword: string;
    patientId: string;
}
