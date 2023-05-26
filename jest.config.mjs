import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const config = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default createJestConfig(config);