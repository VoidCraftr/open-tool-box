import { describe, it, expect } from 'vitest';
import { getCanonicalUrl } from './seo.config';

// The SITE_URL is defined as `process.env.NEXT_PUBLIC_APP_URL || 'https://opentoolbox.online'`
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://opentoolbox.online';

describe('getCanonicalUrl', () => {
    it('should generate canonical URL for the root path', () => {
        const result = getCanonicalUrl('/');
        expect(result).toBe(`${SITE_URL}/`);
    });

    it('should generate canonical URL for a typical path', () => {
        const result = getCanonicalUrl('/tools/json-formatter');
        expect(result).toBe(`${SITE_URL}/tools/json-formatter`);
    });

    it('should generate canonical URL for a path without a leading slash', () => {
        const result = getCanonicalUrl('tools/json-formatter');
        expect(result).toBe(`${SITE_URL}tools/json-formatter`);
    });

    it('should generate canonical URL for an empty path', () => {
        const result = getCanonicalUrl('');
        expect(result).toBe(`${SITE_URL}`);
    });
});
