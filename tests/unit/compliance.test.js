// tests/unit/compliance.test.js

const { expect } = require('chai');
const sinon = require('sinon');

// Import compliance modules
const complianceMonitoring = require('../../src/compliance/complianceMonitoring');
const dynamicRegulatoryFramework = require('../../src/compliance/dynamicRegulatoryFramework');
const kycIntegration = require('../../src/compliance/kycIntegration');
const smartContractCompliance = require('../../src/compliance/smartContractCompliance');

// Mock dependencies
const transactionApi = require('../../src/api/transactionApi');
const regulatoryApi = require('../../src/api/regulatoryApi');
const facialRecognition = require('../../src/biometric/facialRecognition');
const logger = require('../../src/utils/logger');

describe('Compliance Modules', () => {
    let sandbox;

    beforeEach(() => {
        // Create a sandbox for isolating stubs and mocks
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        // Restore all stubs and mocks
        sandbox.restore();
    });

    describe('ComplianceMonitoring', () => {
        it('should monitor transactions and check compliance', async () => {
            // Mock transaction data
            const mockTransactions = [
                { id: 'tx1', amount: 1000 },
                { id: 'tx2', amount: 5000 }
            ];

            // Stub transaction data retrieval
            const getTransactionDataStub = sandbox.stub(transactionApi, 'getTransactionData')
                .resolves(mockTransactions);

            // Stub logging
            const logComplianceIssueStub = sandbox.stub(logger, 'logComplianceIssue');

            // Spy on compliance checking method
            const checkComplianceSpy = sandbox.spy(complianceMonitoring, 'checkCompliance');

            // Execute transaction monitoring
            await complianceMonitoring.monitorTransactions();

            // Assertions
            expect(getTransactionDataStub.calledOnce).to.be.true;
            expect(checkComplianceSpy.callCount).to.equal(mockTransactions.length);
        });

        it('should handle non-compliant transactions', () => {
            const mockTransaction = { id: 'tx-non-compliant', amount: 10000 };
            
            // Stub handling of non-compliance
            const handleNonComplianceStub = sandbox.stub(complianceMonitoring, 'handleNonCompliance');
            
            // Trigger non-compliance detection
            complianceMonitoring.checkCompliance(mockTransaction);

            // Verify non-compliance handling was called
            expect(handleNonComplianceStub.calledOnce).to.be.true;
        });
    });

    describe('DynamicRegulatoryFramework', () => {
        it('should fetch and update regulations dynamically', async () => {
            // Mock regulations
            const mockRegulations = [
                { id: 'reg1', name: 'AML Regulation', isActive: true },
                { id: 'reg2', name: 'KYC Regulation', isActive: false }
            ];

            // Stub regulation fetching
            const fetchLatestRegulationsStub = sandbox.stub(regulatoryApi, 'fetchLatestRegulations')
                .resolves(mockRegulations);

            // Update regulations
            await dynamicRegulatoryFramework.updateRegulations();

            // Assertions
            expect(dynamicRegulatoryFramework.regulations).to.deep.equal(mockRegulations);
        });

        it('should correctly check regulation status', () => {
            // Manually set regulations
            dynamicRegulatoryFramework.regulations = [
                { id: 'reg1', name: 'AML Regulation', isActive: true },
                { id: 'reg2', name: 'KYC Regulation', isActive: false }
            ];

            // Check regulation status
            expect(dynamicRegulatoryFramework.isRegulationActive('reg1')).to.be.true;
            expect(dynamicRegulatoryFramework.isRegulationActive('reg2')).to.be.false;
        });
    });

    describe('KYCIntegration', () => {
        it('should successfully perform KYC for a valid user', async () => {
            // Mock user
            const mockUser = { 
                id: 'user123', 
                name: 'John Doe',
                identityDocuments: {} 
            };

            // Stub identity verification
            const verifyIdentityStub = sandbox.stub(facialRecognition, 'verifyIdentity')
                .resolves(true);

            // Spy on KYC recording
            const recordKYCSpy = sandbox.spy(kycIntegration, 'recordKYC');

            // Perform KYC
            const result = await kycIntegration.performKYC(mockUser);

            // Assertions
            expect(result).to.be.true;
            expect(verifyIdentityStub.calledOnce).to.be.true;
            expect(recordKYCSpy.calledOnce).to.be.true;
        });

        it('should handle KYC failure for an invalid user', async () => {
            // Mock user
            const mockUser = { 
                id: 'user-invalid', 
                name: 'Invalid User' 
            };

            // Stub identity verification to fail
            const verifyIdentityStub = sandbox.stub(facialRecognition, 'verifyIdentity')
                .resolves(false);

            // Spy on KYC failure handling
            const handleKYCFailureSpy = sandbox.spy(kycIntegration, 'handleKYCFailure');

            // Perform KYC
            const result = await kycIntegration.performKYC(mockUser);

            // Assertions
            expect(result).to.be.false;
            expect(verifyIdentityStub.calledOnce).to.be.true;
            expect(handleKYCFailureSpy.calledOnce).to.be.true;
        });
    });

    describe('SmartContractCompliance', () => {
        it('should enforce compliance through smart contract', async () => {
            // Mock transaction
            const mockTransaction = { 
                id: 'tx-compliant', 
                amount: 500 
            };

            // Stub smart contract compliance check
            const checkTransactionComplianceStub = sandbox.stub(
                smartContractCompliance.contract.methods, 
                'isTransactionCompliant'
            ).resolves(true);

            // Spy on transaction rejection method
            const rejectTransactionSpy = sandbox.spy(smartContractCompliance, 'rejectTransaction');

            // Enforce compliance
            await smartContractCompliance.enforceCompliance(mockTransaction);

            // Assertions
            expect(checkTransactionComplianceStub.calledOnce).to.be.true;
            expect(rejectTransactionSpy.notCalled).to.be.true;
        });

        it('should reject non-compliant transactions', async () => {
            // Mock non-compliant transaction
            const mockTransaction = { 
                id: 'tx-non-compliant', 
                amount: 10000 
            };

            // Stub smart contract compliance check to return false
            const checkTransactionComplianceStub = sandbox.stub(
                smartContractCompliance.contract.methods, 
                'isTransactionCompliant'
            ).resolves(false);

            // Spy on transaction rejection method
            const rejectTransactionSpy = sandbox.spy(smartContractCompliance, 'rejectTransaction');

            // Enforce compliance
            await smartContractCompliance.enforceCompliance(mockTransaction);

            // Assertions
            expect(checkTransactionComplianceStub.calledOnce).to.be.true;
            expect(rejectTransactionSpy.calledOnce).to.be.true;
        });
    });

    describe('Error Handling', () => ```javascript
        it('should handle errors in compliance monitoring gracefully', async () => {
            // Stub transaction data retrieval to throw an error
            const getTransactionDataStub = sandbox.stub(transactionApi, 'getTransactionData')
                .rejects(new Error('Database error'));

            // Spy on console error logging
            const consoleErrorStub = sandbox.stub(console, 'error');

            // Execute transaction monitoring
            await complianceMonitoring.monitorTransactions();

            // Assertions
            expect(getTransactionDataStub.calledOnce).to.be.true;
            expect(consoleErrorStub.calledWith('Error monitoring transactions:', sinon.match.instanceOf(Error))).to.be.true;
        });

        it('should handle errors in KYC process gracefully', async () => {
            // Mock user
            const mockUser  = { id: 'user-error', name: 'Error User' };

            // Stub identity verification to throw an error
            const verifyIdentityStub = sandbox.stub(facialRecognition, 'verifyIdentity')
                .rejects(new Error('Verification service unavailable'));

            // Spy on console error logging
            const consoleErrorStub = sandbox.stub(console, 'error');

            // Perform KYC
            await kycIntegration.performKYC(mockUser );

            // Assertions
            expect(verifyIdentityStub.calledOnce).to.be.true;
            expect(consoleErrorStub.calledWith('Error during KYC for user:', mockUser .id, sinon.match.instanceOf(Error))).to.be.true;
        });
    });
});
