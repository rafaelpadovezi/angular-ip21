'use strict';

describe("ip21SqlService", function () {
	var ip21Sql, httpBackend;

	beforeEach(angular.mock.module('angular-ip21'));

	beforeEach(angular.mock.inject(function (_ip21SqlService_, $httpBackend) {
		var ip21SqlService = _ip21SqlService_;
		httpBackend = $httpBackend;

		var config = {
			user: "RDX",
			password: "Radix@123",
			domain: ".",
			url: "http://172.21.199.106/ProcessData/AtProcessDataREST.dll/SQL",
			host: "localhost",
			port: 10014,
			batchPort: 10016,
			adsa: "CHARINT=N;CHARFLOAT=N;CHARTIME=N;CONVERTERRORS=N"
		};

		ip21Sql = ip21SqlService.create(config);
	}));

	it("should return an array of rows of data", function () {
		httpBackend.whenPOST('http://172.21.199.106/ProcessData/AtProcessDataREST.dll/SQL').respond({
			data: { "data": [{ "r": "D", "cols": [{ "i": 0, "n": "name" }, { "i": 1, "n": "IP_DESCRIPTION" }], "rows": [{ "fld": [{ "i": 0, "v": "TFA-STATUS_PIMS-03" }, { "i": 1, "v": "[PIMS TFA] Nº Tags Scan Off" }] }, { "fld": [{ "i": 0, "v": "TFA-STATUS_PIMS-02" }, { "i": 1, "v": "[PIMS TFA] Nº Tags Coleta" }] }] }] }
		});

		ip21Sql.executeSelect("").then(function (rows) {			
			expect(rows).toEqual(
				[
					{
						IP_DESCRIPTION: "[PIMS TFA] N&#186; Tags Scan Off",
						name: "TFA-STATUS_PIMS-03"
					},
					{
						IP_DESCRIPTION: "[PIMS TFA] N&#186; Tags Coleta",
						name: "TFA-STATUS_PIMS-02"
					}
				]);
		});
	});
})