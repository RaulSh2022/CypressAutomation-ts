export interface IDataInfo {
  gentemLoginPage: {
    email: string;
    password: string;
  };
  appointmentBilling: {
    "diagnoseCode": string,
    "cptCode": string,
    "charges": string
  };
  appointmentShceduling: {
    billingProvider: string;
    reasonForVisit: string;
    renderingProvider: string;
    serviceLocation: string;
  };
  serviceLineStatus: {
    "serviceLineStatusNotSubmitted": string,
    "serviceLineStatusSubmitted": string
  }
}
