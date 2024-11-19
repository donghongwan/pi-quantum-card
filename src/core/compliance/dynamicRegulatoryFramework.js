// src/core/compliance/dynamicRegulatoryFramework.js

const { fetchLatestRegulations } = require('../api/regulatoryApi');

class DynamicRegulatoryFramework {
    constructor() {
        this.regulations = [];
        this.updateRegulations();
    }

    async updateRegulations() {
        this.regulations = await fetchLatestRegulations();
        console.log('Regulations updated:', this.regulations);
    }

    isRegulationActive(regulationId) {
        return this.regulations.some(reg => reg.id === regulationId && reg.isActive);
    }

    getRegulationDetails(regulationId) {
        return this.regulations.find(reg => reg.id === regulationId);
    }
}

module.exports = new DynamicRegulatoryFramework();
