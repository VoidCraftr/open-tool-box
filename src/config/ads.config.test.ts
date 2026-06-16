import { describe, it, expect } from 'vitest';
import { shouldShowAds } from './ads.config';

describe('shouldShowAds', () => {
    it('should return false for exactly excluded pages', () => {
        expect(shouldShowAds('/privacy')).toBe(false);
        expect(shouldShowAds('/terms')).toBe(false);
    });

    it('should return false for subpages of excluded pages', () => {
        expect(shouldShowAds('/privacy/data')).toBe(false);
        expect(shouldShowAds('/terms/service')).toBe(false);
    });

    it('should return true for non-excluded pages', () => {
        expect(shouldShowAds('/')).toBe(true);
        expect(shouldShowAds('/tools')).toBe(true);
        expect(shouldShowAds('/about')).toBe(true);
    });
});
