import ApplicationAdapter from 'potber-client/adapters/application';

export default class SessionAdapter extends ApplicationAdapter {
  urlForQueryRecord(query: any, modelName: any) {
    return this.buildSingularUrl(modelName);
  }

  urlForUpdateRecord(id: string, modelName: any) {
    return this.buildSingularUrl(modelName);
  }

  /**
   * '/account' is a singular resource. As such, we need to manipulate
   * how Ember data builds the URL for this resource a bit.
   */
  buildSingularUrl(modelName: any) {
    const baseUrl = this.buildURL();
    return `${baseUrl}/auth/${modelName as string}`;
  }
}
