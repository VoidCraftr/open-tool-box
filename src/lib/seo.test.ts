import { describe, it, expect } from "vitest";
import { constructMetadata } from "./seo";

describe("constructMetadata", () => {
    it("should generate basic metadata with required props", () => {
        const title = "My Tool";
        const description = "A very useful tool for doing things.";
        const metadata = constructMetadata({ title, description });

        expect(metadata.title?.default).toBe("My Tool - Free & Secure Tools | OpenToolbox");
        expect(metadata.description).toBe(description);

        // Check default keywords
        expect(metadata.keywords).toContain("developer tools");
        expect(metadata.keywords?.length).toBeGreaterThan(0);

        // Check openGraph defaults
        expect(metadata.openGraph?.title).toBe("My Tool - OpenToolbox");
        expect(metadata.openGraph?.description).toBe(description);
        expect(metadata.openGraph?.images).toEqual([
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: title,
            },
        ]);

        // Check twitter defaults
        expect(metadata.twitter?.title).toBe("My Tool - OpenToolbox");
        expect(metadata.twitter?.description).toBe(description);
        expect(metadata.twitter?.images).toEqual(["/og-image.png"]);

        // Check alternates
        expect(metadata.alternates?.canonical).toBeUndefined();
    });

    it("should include custom keywords along with defaults", () => {
        const metadata = constructMetadata({
            title: "Test",
            description: "Test description",
            keywords: ["custom keyword 1", "custom keyword 2"],
        });

        expect(metadata.keywords).toContain("developer tools");
        expect(metadata.keywords).toContain("custom keyword 1");
        expect(metadata.keywords).toContain("custom keyword 2");
    });

    it("should set custom canonical URL if provided", () => {
        const canonical = "https://example.com/canonical-url";
        const metadata = constructMetadata({
            title: "Test",
            description: "Test description",
            canonical,
        });

        expect(metadata.alternates?.canonical).toBe(canonical);
    });

    it("should use custom image for openGraph and twitter if provided", () => {
        const customImage = "/custom-og-image.jpg";
        const title = "Test Image Tool";
        const metadata = constructMetadata({
            title,
            description: "Test description",
            image: customImage,
        });

        expect(metadata.openGraph?.images).toEqual([
            {
                url: customImage,
                width: 1200,
                height: 630,
                alt: title,
            },
        ]);
        expect(metadata.twitter?.images).toEqual([customImage]);
    });
});
