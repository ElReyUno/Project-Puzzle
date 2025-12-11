// Task 2: CI/CD, lint, depcheck, Docker, security workflows tests
import '@testing-library/jest-dom';
import React from 'react';
import request from 'supertest';
import app from '../../backend/server.js'; // Backend entry point
import { render, waitFor } from '@testing-library/react';
import ProductList from '../../src/components/ProductList.js'; // Component path
import ShoppingCart from '../../src/components/ShoppingCart.js'; // Component path
const fs = require('fs');
const { execSync } = require('child_process');
const yaml = require('js-yaml');

describe('Task 002 — CI/CD & Security workflows', () => {
  test('CI workflow file exists and is valid YAML', () => {
    const p = '.github/workflows/ci.yml';
    expect(fs.existsSync(p)).toBe(true);
    expect(() => yaml.load(fs.readFileSync(p, 'utf8'))).not.toThrow();
  });

  test('CI uses Node 20.x in matrix', () => {
    const cfg = yaml.load(fs.readFileSync('.github/workflows/ci.yml', 'utf8'));
    const matrix = cfg.jobs && cfg.jobs.build && cfg.jobs.build.strategy && cfg.jobs.build.strategy.matrix;
    expect(matrix).toBeDefined();
    expect(JSON.stringify(matrix).includes('20')).toBe(true);
  });

  test('Docker workflow exists and references docker build action', () => {
    const p = '.github/workflows/docker.yml';
    expect(fs.existsSync(p)).toBe(true);
    const text = fs.readFileSync(p, 'utf8');
    expect(text.includes('docker/build-push-action') || text.includes('docker build')).toBe(true);
  });

  test('Lint workflow runs eslint or prettier', () => {
    const p = '.github/workflows/lint.yml';
    expect(fs.existsSync(p)).toBe(true);
    const text = fs.readFileSync(p, 'utf8');
    expect(text.match(/eslint|prettier/)).not.toBeNull();
  });

  test('Depcheck workflow or script present', () => {
    const p = '.github/workflows/depcheck.yml';
    expect(fs.existsSync(p)).toBe(true);
    const text = fs.readFileSync(p, 'utf8');
    expect(text.includes('depcheck') || text.includes('npx depcheck')).toBe(true);
  });

  test('Dependabot config present', () => {
    expect(fs.existsSync('.github/dependabot.yml')).toBe(true);
    expect(() => yaml.load(fs.readFileSync('.github/dependabot.yml', 'utf8'))).not.toThrow();
  });

  test('Project builds successfully (npm run build)', () => {
    // run in CI-friendly non-interactive env; fails will throw
    execSync('npm run build', { stdio: 'inherit' });
    expect(true).toBe(true);
  });
});