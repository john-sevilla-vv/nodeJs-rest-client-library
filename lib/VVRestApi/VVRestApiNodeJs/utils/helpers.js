var vvAPI = require('../../VVRestApi');
 
module.exports = {
    Layer: function (vvClient) {
        this.vvClient = vvClient;
        this.responseObj = {};
        this.response = ({
            json: (statusCode, outputCollection) => {
                this.responseObj = {
                    meta: { status: statusCode },
                    data: outputCollection
                }
            }
        });
        // Associates a given web service with default field values for debugging
        this.config = new Map([]);
        this.setConfig = function (webServiceName, defaultFormFieldCollection) {
            this.config.set(webServiceName, defaultFormFieldCollection);
        }
 
        // Overwrite the client's `runWebService` method to run the web service locally
        vvClient.scripts.runWebService = (webServiceName, webServiceParams) => {
            let params = this.config.get(webServiceName) || null;
            let layerResponse;
 
            try {
                params = params || webServiceParams;
                const scriptToExecute = require('../' + webServiceName).main;
                const ffcol = new vvAPI.forms.formFieldCollection(params);
                layerResponse = scriptToExecute(ffcol, this.vvClient, this.response);
            }
            catch (error) {
                console.error(new Error(error));
                const errorMessage = `${(error?.code || this.constructor.name + ' Error')} for ${webServiceName}`;
                layerResponse = Promise.resolve(this.response.json(500, ['Error', errorMessage]));
            }
            finally {
                return layerResponse.then(() => this.responseObj);
            }
        }
    }
}