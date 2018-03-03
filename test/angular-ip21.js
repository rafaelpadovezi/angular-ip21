import { expect } from 'chai';
import angularIp21 from '../src/';

describe('ip21SqlService', function () {
    let ip21Sql,
        httpBackend,
        ip21SqlService;

    beforeEach(angular.mock.module(angularIp21));

    beforeEach(angular.mock.inject(function (_ip21SqlService_, $httpBackend) {
        ip21SqlService = _ip21SqlService_;
        httpBackend = $httpBackend;

        ip21Sql = ip21SqlService.create('http://hostname/ProcessData/AtProcessDataREST.dll/SQL', 10014);
    }));

    it('should return an array of rows of data', function (done) {
        httpBackend.whenPOST('http://hostname/ProcessData/AtProcessDataREST.dll/SQL').respond({
            data: { 'data': [{ 'r': 'D', 'cols': [{ 'i': 0, 'n': 'name' }, { 'i': 1, 'n': 'IP_DESCRIPTION' }], 'rows': [{ 'fld': [{ 'i': 0, 'v': 'TFA-STATUS_PIMS-03' }, { 'i': 1, 'v': '[PIMS TFA] Nº Tags Scan Off' }] }, { 'fld': [{ 'i': 0, 'v': 'TFA-STATUS_PIMS-02' }, { 'i': 1, 'v': '[PIMS TFA] Nº Tags Coleta' }] }] }] }
        });

        ip21Sql.executeSelect('').then(function (rows) {
            expect(rows).to.equal(
                [
                    {
                        IP_DESCRIPTION: '[PIMS TFA] N&#186; Tags Scan Off',
                        name: 'TFA-STATUS_PIMS-03'
                    },
                    {
                        IP_DESCRIPTION: '[PIMS TFA] N&#186; Tags Coleta',
                        name: 'TFA-STATUS_PIMS-02'
                    }
                ]);
            done();
        });

        httpBackend.flush();
    });

    it('should return a TypeError', () => {
        try {
            ip21SqlService.create();
        }
        catch(err) {
            expect(err.message).to.equal('create expects a valid URL string as first parameter');
        }
    });
});
